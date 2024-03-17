import { IRequest, IResponse, IRoute } from '../common';

/**
 * Represents the request to verify a specific address using SIWE.
 * @interface VerifyChallengeRequest
 * @public
 */
export interface VerifyChallengeRequest extends IRequest {
  /**
   * Represents the ethereum address to be verified.
   * @type {string}
   */
  address: string;

  /**
   * Represents the signature of the challenge.
   * @type {string}
   */
  signature: string;

  /**
   * Represents the challenge signed by the address.
   *
   * @type {string}
   */
  message: string;
}



/**
 * Represents the response to a request to verify a specific address using SIWE.
 * @interface VerifyChallengeResponse
 * @public
 */
export interface VerifyChallengeResponse extends IResponse {
  /**
   * Represents the result of the verification.
   * @type {boolean}
   */
  verified: boolean;
}


export interface SIWEVerifyMessageRoute extends IRoute {
  request: VerifyChallengeRequest;
  response: VerifyChallengeResponse;
  headers: NonNullable<unknown>;
}