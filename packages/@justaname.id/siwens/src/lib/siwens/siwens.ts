import {
  InvalidConfigurationException,
  InvalidENSException,
  InvalidStatementException,
  InvalidTimeException,
} from '../errors';
import {
  checkDomainValid,
  checkTTL,
  constructSignInStatement,
  extractDataFromStatement,
  generateNonce,
} from '../utils';
import {
  SiweError,
  SiweErrorType,
  SiweMessageFields,
  SiweResponse,
  VerifyOpts,
  VerifyParams,
} from '../types';
import { toASCII, toUnicode } from 'punycode';
import {
  createPublicClient,
  http,
  PublicClient,
  isAddressEqual,
  getAddress as viemGetAddress,
} from 'viem';
import { mainnet, sepolia } from 'viem/chains';
import type { Chain } from 'viem';
import { normalize } from 'viem/ens';
import {
  createSiweMessage,
  parseSiweMessage,
  verifySiweMessage,
} from 'viem/siwe';

const SUPPORTED_CHAINS: Record<number, Chain> = {
  1: mainnet,
  11155111: sepolia,
};

const buildPublicClient = (
  providerUrl?: string,
  chainId?: number
): PublicClient =>
  createPublicClient({
    chain: SUPPORTED_CHAINS[chainId ?? 1] ?? mainnet,
    transport: http(providerUrl),
  });

const toISOStringOrUndefined = (value?: string | Date): string | undefined => {
  if (!value) {
    return undefined;
  }
  return value instanceof Date ? value.toISOString() : value;
};

export interface SiwensResponse extends SiweResponse {
  ens: string;
}

export interface SiwensParams extends Partial<SiweMessageFields> {
  ens: string;
  ttl?: number;
  expirationTime?: string;
  issuedAt?: string;
}

export interface SiwensConfig {
  params: string | SiwensParams;
  providerUrl?: string;
}

/**
 * Sign-In with ENS message. Previously this extended `siwe`'s `SiweMessage`;
 * it is now a standalone, ethers-free implementation backed by viem's native
 * SIWE module (`viem/siwe`). The public surface (fields, `prepareMessage`,
 * `verify`, `generateNonce`) is preserved.
 */
export class SIWENS {
  readonly scheme?: string;
  readonly domain: string;
  readonly address: string;
  readonly statement?: string;
  readonly uri: string;
  readonly version: string;
  readonly chainId: number;
  readonly nonce: string;
  readonly issuedAt?: string;
  readonly expirationTime?: string;
  readonly notBefore?: string;
  readonly requestId?: string;
  readonly resources?: string[];
  readonly provider: PublicClient;
  readonly providerUrl: string | undefined;
  /** The raw EIP-4361 message string (parsed input, or the built message). */
  private readonly message: string;

  constructor(signInConfig: SiwensConfig) {
    const { params, providerUrl } = signInConfig;

    if (typeof params === 'string') {
      if (!providerUrl) {
        throw InvalidConfigurationException.providerUrlRequired();
      }
      const parsed = parseSiweMessage(params);
      this.scheme = parsed.scheme;
      this.domain = parsed.domain as string;
      // Normalize to EIP-55 checksum so `data.address` matches the casing that
      // `siwe` always returned (it rejected non-checksummed addresses).
      this.address = viemGetAddress(parsed.address as string);
      this.statement = parsed.statement;
      this.uri = parsed.uri as string;
      this.version = (parsed.version as string) || '1';
      this.chainId = (parsed.chainId as number) ?? 1;
      this.nonce = parsed.nonce as string;
      this.issuedAt = toISOStringOrUndefined(parsed.issuedAt);
      this.expirationTime = toISOStringOrUndefined(parsed.expirationTime);
      this.notBefore = toISOStringOrUndefined(parsed.notBefore);
      this.requestId = parsed.requestId;
      this.resources = parsed.resources;
      this.message = params;
      this.providerUrl = providerUrl;
      this.provider = buildPublicClient(providerUrl, this.chainId);
      return;
    }

    if (!params.ttl) {
      throw InvalidTimeException.requiredTTL();
    }

    if (!params.domain) {
      throw InvalidConfigurationException.domainRequired();
    }

    checkTTL(params.ttl);
    const {
      issuedAt: issuedAtGenerated,
      expirationTime: expirationTimeGenerated,
    } = SIWENS.generateIssuedAndExpirationTime(params.ttl);

    checkDomainValid(params.ens);

    const statement = constructSignInStatement(
      toASCII(params.ens),
      params?.statement || ''
    );

    this.scheme = params.scheme;
    this.domain = params.domain;
    this.address = viemGetAddress(params.address as string);
    this.statement = statement;
    this.uri = params.uri as string;
    this.version = params.version || '1';
    this.chainId = (params.chainId as number) ?? 1;
    this.nonce = params.nonce || generateNonce();
    this.issuedAt = params.issuedAt || issuedAtGenerated;
    this.expirationTime = params.expirationTime || expirationTimeGenerated;
    this.notBefore = params.notBefore;
    this.requestId = params.requestId;
    this.resources = params.resources;
    this.providerUrl = providerUrl;
    this.provider = buildPublicClient(providerUrl, this.chainId);
    this.message = this.buildMessage();
  }

  toMessage(): string {
    return this.message;
  }

  prepareMessage(): string {
    return this.message;
  }

  async verify(
    params: VerifyParams,
    opts?: VerifyOpts
  ): Promise<SiwensResponse> {
    const suppress = opts?.suppressExceptions ?? false;
    const data = this.toFields();

    const computeEns = (): string | undefined => {
      try {
        return this.statement
          ? toUnicode(extractDataFromStatement(this.statement).ens)
          : undefined;
      } catch {
        return undefined;
      }
    };

    const fail = (error: SiweError): SiwensResponse => {
      const result: SiwensResponse = {
        success: false,
        data,
        error,
        ens: computeEns() as string,
      };
      if (suppress) {
        return result;
      }
      throw result;
    };

    // Normalize legacy `v` values (< 27) to canonical 27/28 before verifying.
    let signature = params.signature;
    const lastByte = parseInt(signature.slice(-2), 16);
    if (lastByte < 27) {
      const adjustedV = (27 + (lastByte % 2)).toString(16).padStart(2, '0');
      signature = signature.slice(0, -2) + adjustedV;
    }

    // Field validation — mirrors `siwe`'s order and error types so the thrown
    // shape is unchanged for consumers.
    if (params.scheme && params.scheme !== this.scheme) {
      return fail(
        new SiweError(SiweErrorType.SCHEME_MISMATCH, params.scheme, this.scheme)
      );
    }
    if (params.domain && params.domain !== this.domain) {
      return fail(
        new SiweError(SiweErrorType.DOMAIN_MISMATCH, params.domain, this.domain)
      );
    }
    if (params.nonce && params.nonce !== this.nonce) {
      return fail(
        new SiweError(SiweErrorType.NONCE_MISMATCH, params.nonce, this.nonce)
      );
    }

    const checkTime = new Date(params.time || new Date());
    if (this.expirationTime) {
      const expirationDate = new Date(this.expirationTime);
      if (checkTime.getTime() >= expirationDate.getTime()) {
        return fail(
          new SiweError(
            SiweErrorType.EXPIRED_MESSAGE,
            `${checkTime.toISOString()} < ${expirationDate.toISOString()}`,
            `${checkTime.toISOString()} >= ${expirationDate.toISOString()}`
          )
        );
      }
    }
    if (this.notBefore) {
      const notBefore = new Date(this.notBefore);
      if (checkTime.getTime() < notBefore.getTime()) {
        return fail(
          new SiweError(
            SiweErrorType.NOT_YET_VALID_MESSAGE,
            `${checkTime.toISOString()} >= ${notBefore.toISOString()}`,
            `${checkTime.toISOString()} < ${notBefore.toISOString()}`
          )
        );
      }
    }

    // Signature verification — EOA recovery + EIP-1271 + ERC-6492 in a single
    // viem call against the configured public client. A genuine signature
    // mismatch resolves to `false`; operational errors (RPC/transport failures)
    // are intentionally left to propagate rather than be masked as an invalid
    // signature, so contract-wallet checks on a flaky RPC surface a real error.
    const valid = await verifySiweMessage(this.provider, {
      message: this.message,
      signature: signature as `0x${string}`,
      address: this.address as `0x${string}`,
      ...(params.domain ? { domain: params.domain } : {}),
      ...(params.nonce ? { nonce: params.nonce } : {}),
      ...(params.scheme ? { scheme: params.scheme } : {}),
      time: checkTime,
    });

    if (!valid) {
      return fail(
        new SiweError(
          SiweErrorType.INVALID_SIGNATURE,
          undefined,
          `Resolved address to be ${this.address}`
        )
      );
    }

    const statement = this.statement;
    if (!statement) {
      throw InvalidStatementException.invalidStatement();
    }
    const { ens: asciiEns } = extractDataFromStatement(statement);
    const ens = toUnicode(asciiEns);
    await this.verifyEnsAddress(ens, this.address);

    return {
      success: true,
      data,
      ens,
    };
  }

  static generateIssuedAndExpirationTime(ttl: number) {
    const date = new Date();
    const issuedAt = date.toISOString();
    const expirationTime = new Date(date.getTime() + ttl).toISOString();
    return {
      issuedAt,
      expirationTime,
    };
  }

  static generateNonce(): string {
    return generateNonce();
  }

  private toFields(): SiweMessageFields {
    return {
      scheme: this.scheme,
      domain: this.domain,
      address: this.address,
      statement: this.statement,
      uri: this.uri,
      version: this.version,
      chainId: this.chainId,
      nonce: this.nonce,
      issuedAt: this.issuedAt,
      expirationTime: this.expirationTime,
      notBefore: this.notBefore,
      requestId: this.requestId,
      resources: this.resources,
    };
  }

  private buildMessage(): string {
    return createSiweMessage({
      ...(this.scheme ? { scheme: this.scheme } : {}),
      domain: this.domain,
      address: viemGetAddress(this.address),
      ...(this.statement ? { statement: this.statement } : {}),
      uri: this.uri,
      version: this.version as '1',
      chainId: this.chainId,
      nonce: this.nonce,
      ...(this.issuedAt ? { issuedAt: new Date(this.issuedAt) } : {}),
      ...(this.expirationTime
        ? { expirationTime: new Date(this.expirationTime) }
        : {}),
      ...(this.notBefore ? { notBefore: new Date(this.notBefore) } : {}),
      ...(this.requestId ? { requestId: this.requestId } : {}),
      ...(this.resources ? { resources: this.resources } : {}),
    });
  }

  private async verifyEnsAddress(ens: string, address: string) {
    const resolvedAddress = await this.provider.getEnsAddress({
      name: normalize(ens),
    });
    if (!resolvedAddress) {
      throw InvalidENSException.notRegisteredENS(ens);
    }

    if (!isAddressEqual(resolvedAddress, viemGetAddress(address))) {
      throw InvalidENSException.invalidENSOwner(ens, address);
    }
    return true;
  }
}
