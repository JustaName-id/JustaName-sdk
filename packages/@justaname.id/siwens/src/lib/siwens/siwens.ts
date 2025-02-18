import {
  generateNonce,
  SiweMessage,
  SiweResponse,
  VerifyOpts,
  VerifyParams,
} from 'siwe';
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
} from '../utils';
import { toASCII, toUnicode } from 'punycode';
import { getJsonRpcProvider, JsonRpcProvider } from '../utils/ethersCompat';

export interface SiwensResponse extends SiweResponse {
  ens: string;
}

export interface SiwensParams
  extends Partial<
    Omit<SiweMessage, 'toMessage' | 'prepareMessage' | 'verify' | 'validate'>
  > {
  ens: string;
  ttl?: number;
  expirationTime?: string;
  issuedAt?: string;
}

export interface SiwensConfig {
  params: string | SiwensParams;
  providerUrl?: string;
}

export class SIWENS extends SiweMessage {
  readonly provider: JsonRpcProvider;
  readonly providerUrl: string | undefined;

  constructor(signInConfig: SiwensConfig) {
    const { params, providerUrl } = signInConfig;
    if (typeof params === 'string') {
      super(params);
      if (!providerUrl) {
        throw InvalidConfigurationException.providerUrlRequired();
      }
      this.provider = getJsonRpcProvider(providerUrl);
      this.providerUrl = providerUrl;
      return;
    }

    if (!params.ttl) {
      throw InvalidTimeException.requiredTTL();
    }

    if (!params.domain) {
      throw InvalidConfigurationException.domainRequired();
    }

    let issuedAt = params.issuedAt;
    let expirationTime = params.expirationTime;

    if (params.ttl) {
      checkTTL(params.ttl);
      const {
        issuedAt: issuedAtGenerated,
        expirationTime: expirationTimeGenerated,
      } = SIWENS.generateIssuedAndExpirationTime(params.ttl);
      issuedAt = issuedAt || issuedAtGenerated;
      expirationTime = expirationTime || expirationTimeGenerated;
    }

    checkDomainValid(params.ens);

    const statement = constructSignInStatement(
      toASCII(params.ens),
      params?.statement || ''
    );

    super({
      ...params,
      statement,
      version: params.version || '1',
      issuedAt,
      expirationTime,
    });
    this.providerUrl = providerUrl;
    this.provider = getJsonRpcProvider(providerUrl);
  }

  override async verify(
    params: VerifyParams,
    opts?: VerifyOpts
  ): Promise<SiwensResponse> {
    let verification: SiweResponse;

    try {
      const { signature, ...rest } = params;
      const _tempParams = {
        signature,
        ...rest,
      };
      const lastByte = parseInt(signature.slice(-2), 16);
      if (lastByte < 27) {
        const adjustedV = (27 + (lastByte % 2)).toString(16).padStart(2, '0');
        _tempParams['signature'] = signature.slice(0, -2) + adjustedV;
      }

      verification = await super.verify(_tempParams, opts);
    } catch (e) {
      const statement = e.data.statement;
      const { ens } = extractDataFromStatement(statement);
      throw {
        ...e,
        ens: toUnicode(ens),
      };
    }

    const statement = verification.data.statement;
    if (!statement) {
      throw InvalidStatementException.invalidStatement();
    }
    const { ens: asciiEns } = extractDataFromStatement(statement);
    const ens = toUnicode(asciiEns);
    await this.verifyEnsAddress(ens, this.address);

    return {
      ...verification,
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

  static generateNonce() {
    return generateNonce();
  }

  private async verifyEnsAddress(ens: string, address: string) {
    const resolvedAddress = await this.provider.resolveName(ens);
    if (!resolvedAddress) {
      throw InvalidENSException.notRegisteredENS(ens);
    }

    if (resolvedAddress !== address) {
      throw InvalidENSException.invalidENSOwner(ens, address);
    }
    return true;
  }
}
