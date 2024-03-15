import { restCall } from '../../api/rest';
import {
  RequestChallengeRequest,
  RequestChallengeResponse,
  VerifyChallengeRequest,
  VerifyChallengeResponse
} from '../../types';

export class Siwe {



  /**
   * Sends a request to initiate a challenge.
   *
   * @param {RequestChallengeRequest} params - The request parameters.
   * @returns {Promise<RequestChallengeResponse>} - A promise that resolves with the response.
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