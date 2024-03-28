import { restCall } from '../../api/rest';
import {
  RequestChallengeRequest,
  RequestChallengeResponse,
  VerifyChallengeRequest,
  VerifyChallengeResponse
} from '../../types';

/**
 * Represents the Sign-In with Ethereum (SIWE) functionality, providing methods
 * to initiate and verify challenges.
 * @public
 * @class
 * @example
 * ```typescript
 * import { JustaName } from 'justaname-sdk';
 *
 * const configuration = {
 *  apiKey: 'your-api-key'
 *  };
 *
 *  const justaName = await JustaName.init(configuration);
 *
 *  const challenge = await justaName.siwe.requestChallenge({
 *    address: "0x1234567890123456789012345678901234567890",
 *  });
 *
 *  ```
 */
export class Siwe {

  /**
   * Sends a request to initiate a challenge.
   *
   * @param {RequestChallengeRequest} params - The request parameters.
   * @returns {Promise<RequestChallengeResponse>} - A promise that resolves with the response.
   * @public
   */
  requestChallenge  (
    params: RequestChallengeRequest
  ) : Promise<RequestChallengeResponse> {
    return restCall('SIWE_REQUEST_CHALLENGE_ROUTE','POST', params)
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