import { assertRestCall } from '../../api/rest';
import {
  ChainId,
  RequestChallengeRoute,
  VerifyMessageRoute,
} from '../../types';
import { SiweConfig } from '../../types/siwe/siwe-config';
import { ChallengeRequestException } from '../../errors/ChallengeRequest.expection';
import { SiweMessage } from 'siwe';

/**
 * Represents the Sign-In with Ethereum (SIWE) functionality, providing methods
 * to initiate and verify challenges.
 * @public
 * @class
 * @example
 * ```typescript
 * import { JustaName } from '@justaname.id/sdk';
 *
 * const configuration = {
 *  apiKey: 'your-api-key'
 *  };
 *
 *  const justaName = JustaName.init(configuration);
 *
 * const requestChallengeResponse = await justaName.siwe.requestChallenge({
 *  chainId: 1,
 *  origin: 'http://localhost:3333',
 *  address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
 *  domain: 'localhost',
 *  ttl?: 120000,
 * });
 *
 *  ```
 */

export interface SubnameChallengeSiweConfig
  extends Omit<SiweConfig, 'chainId' | 'ttl'> {}

export interface SubnameChallengeParams {
  siweConfig?: SubnameChallengeSiweConfig;
  chainId: ChainId;
  subnameChallengeTtl?: number;
  dev: boolean;
}

export class SubnameChallenge {
  private readonly siweConfig?: SubnameChallengeSiweConfig;
  private readonly chainId: ChainId;
  private readonly subnameChallengeTtl?: number;
  private readonly dev: boolean;
  constructor(params: SubnameChallengeParams) {
    this.siweConfig = params.siweConfig;
    this.chainId = params.chainId;
    this.subnameChallengeTtl = params.subnameChallengeTtl;
    this.dev = params.dev;
  }

  /**
   * Sends a request to initiate a challenge.
   *
   * @param {RequestChallengeRequest} params - The request parameters.
   * @returns {Promise<RequestChallengeResponse>} - A promise that resolves with the response.
   * @public
   */
  requestChallenge(
    params: RequestChallengeRoute['params']
  ): RequestChallengeRoute['response'] {
    const { chainId, ttl, origin, domain, address } = params;
    const _ttl = ttl || this.subnameChallengeTtl || 120000;
    const _chainId = chainId || this.chainId;
    const _origin = this.siweConfig?.origin || origin;
    const _domain = this.siweConfig?.domain || domain;
    const _address = address;

    if (!_origin) {
      throw ChallengeRequestException.originRequired();
    }

    if (!_domain) {
      throw ChallengeRequestException.domainRequired();
    }

    if (_chainId !== 1 && _chainId !== 11155111) {
      throw ChallengeRequestException.invalidChainId(_chainId);
    }

    if (_ttl <= 0 || _ttl + Date.now() >= Number.MAX_SAFE_INTEGER) {
      throw ChallengeRequestException.invalidTimeValue();
    }

    const urlRegex = new RegExp('^(http|https)://', 'i');
    if (!urlRegex.test(_origin)) {
      throw ChallengeRequestException.invalidOrigin(_origin);
    }

    const ethAddressRegex = new RegExp('^0x[a-fA-F0-9]{40}$');
    if (!ethAddressRegex.test(_address)) {
      throw ChallengeRequestException.invalidAddress(_address);
    }

    const statement = `Please sign this message to verify that you want to add/update your subdomain provided by ${_domain} to your account ${_address} using JustAName`;

    const { expirationTime, issuedAt } =
      this.generateIssuedAndExpirationTime(_ttl);

    const siweMessage = new SiweMessage({
      domain: _domain,
      uri: _origin,
      address: _address,
      statement: statement,
      chainId: _chainId,
      version: '1',
      issuedAt,
      expirationTime,
    });

    return {
      challenge: siweMessage.prepareMessage(),
    };
  }

  /**
   * Sends a request to verify a specific address using SIWE.
   * @param {VerifyChallengeRequest} params - The request parameters.
   * @returns {Promise<VerifyChallengeResponse>} - A promise that resolves with the response.
   * @public
   */
  verifyMessage(
    params: VerifyMessageRoute['params']
  ): Promise<VerifyMessageRoute['response']> {
    return assertRestCall(
      'SIWE_VERIFY_MESSAGE_ROUTE',
      'POST',
      params,
      undefined,
      this.dev
    )(['address', 'signature', 'message']);
  }

  private generateIssuedAndExpirationTime(ttl: number) {
    const date = new Date();
    const issuedAt = date.toISOString();
    const expirationTime = new Date(date.getTime() + ttl).toISOString();
    return {
      issuedAt,
      expirationTime,
    };
  }
}
