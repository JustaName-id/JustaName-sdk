import { assertRestCall } from '../../api/rest';
import {
  RequestChallengeRoute,
  VerifyMessageRoute,
  ChainId
} from '../../types';
import { SiweConfig } from '../../types/siwe/siwe-config';

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

export interface SubnameChallengeSiweConfig extends Omit<SiweConfig, 'chainId' | "ttl"> {}

export interface SubnameChallengeParams {
  siweConfig?: SubnameChallengeSiweConfig;
  chainId: ChainId;
  subnameChallengeTtl?: number;
}

export class SubnameChallenge {

  siweConfig?: SubnameChallengeSiweConfig;
  chainId: ChainId;
  subnameChallengeTtl?: number;
  constructor(config: SubnameChallengeParams) {
    this.siweConfig = config.siweConfig;
    this.chainId = config.chainId;
    this.subnameChallengeTtl = config.subnameChallengeTtl;
  }

  /**
   * Sends a request to initiate a challenge.
   *
   * @param {RequestChallengeRequest} params - The request parameters.
   * @returns {Promise<RequestChallengeResponse>} - A promise that resolves with the response.
   * @public
   */
  requestChallenge (params: RequestChallengeRoute['params']): Promise<RequestChallengeRoute['response']> {
    const { chainId, ttl, origin, domain, ...rest } = params;
    const _ttl = this.subnameChallengeTtl || ttl || 120000;
    const _chainId = this.chainId || chainId;
    const _origin = this.siweConfig?.origin || origin;
    const _domain = this.siweConfig?.domain || domain;

    return assertRestCall('SIWE_REQUEST_CHALLENGE_ROUTE', 'POST', {
      ttl: _ttl,
      chainId: _chainId,
      origin: _origin,
      domain: _domain,
      ...rest,
    })(['origin','domain','chainId'])
  }


  /**
   * Sends a request to verify a specific address using SIWE.
   * @param {VerifyChallengeRequest} params - The request parameters.
   * @returns {Promise<VerifyChallengeResponse>} - A promise that resolves with the response.
   * @public
   */
  verifyMessage (
    params: VerifyMessageRoute['params']
  ) : Promise<VerifyMessageRoute['response']> {
    return assertRestCall('SIWE_VERIFY_MESSAGE_ROUTE', 'POST', params)(['address', 'signature', 'message'])
  }
}