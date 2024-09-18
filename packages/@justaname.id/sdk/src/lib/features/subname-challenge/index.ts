import { restCall } from '../../api/rest';
import {
  RequestChallengeResponse, RequestChallengeParams,
  VerifyChallengeRequest,
  VerifyChallengeResponse
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
export class SubnameChallenge {

  siweConfig: SiweConfig;

  constructor(config: SiweConfig) {
    this.siweConfig = config;
  }

  /**
   * Sends a request to initiate a challenge.
   *
   * @param {RequestChallengeRequest} params - The request parameters.
   * @returns {Promise<RequestChallengeResponse>} - A promise that resolves with the response.
   * @public
   */
  requestChallenge  (params: RequestChallengeParams): Promise<RequestChallengeResponse> {
    return restCall('SIWE_REQUEST_CHALLENGE_ROUTE','POST', {
      ...this.siweConfig,
      ...params
    })
  }


  /**
   * Sends a request to verify a specific address using SIWE.
   * @param {VerifyChallengeRequest} params - The request parameters.
   * @returns {Promise<VerifyChallengeResponse>} - A promise that resolves with the response.
   * @public
   */
  verifyMessage (
    params: VerifyChallengeRequest
  ) : Promise<VerifyChallengeResponse> {
    return restCall('SIWE_VERIFY_MESSAGE_ROUTE','POST', params)
  }
}