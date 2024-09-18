import { ChainId, IRequest, IResponse, IRoute } from '../common';

/**
 * Represents a request to challenge a specific address using .
 * @interface RequestChallengeRequest
 * @public
 */
export interface RequestChallengeRequest extends IRequest {

  /**
   *  Represents the ENS domain
   *  @type {string}
   */
  domain: string;

  /**
   * Represents the ethereum address to be challenged.
   * @type {string}
   */
  address: string;
  /**
   * Represents the origin of the request (e.g. the domain of the website).
   * @type {string}
   */
  origin: string;
  /**
   * Represents the chainId of the blockchain to be used.
   * @type {1 | 11155111}
   */
  chainId: ChainId;
  /**
   * Specifies the time-to-live (TTL) for a variable.
   * default: 120000 ms, 2 minutes ( 2 * 60 * 1000 )
   * @type {number}
   * @default 120000
   * @optional
   */
  ttl?: number;
}

/**
 * Represents the response to a request to challenge a specific address using .
 * @interface RequestChallengeResponse
 * @public
 */
export interface RequestChallengeResponse extends IResponse{
  /**
   * Represents the challenge to be signed by the user.
   * @type {string}
   */
  challenge: string;
}

/**
 * Specifies the route configuration for initiating a  (Sign-In with Ethereum) challenge request.
 * This interface extends the generic `IRoute` interface, setting concrete types for the request
 * and response associated with the  challenge process. It defines how a client should structure
 * their challenge request and what response they can expect to receive.
 * 
 * @interface RequestChallengeRoute
 * @extends IRoute
 * @public
 * @property {RequestChallengeRequest} request - The request structure for the siwe challenge.
 * @property {RequestChallengeResponse} response - The expected response structure.
 * @property {NonNullable<unknown>} headers - The headers required for the request, left intentionally
 *                                            generic to accommodate various possible requirements.
 */
export interface RequestChallengeRoute extends IRoute {
  request: RequestChallengeRequest;
  response: RequestChallengeResponse;
  headers: NonNullable<unknown>;
}


export interface RequestChallengeParams extends Omit<RequestChallengeRequest, 'origin' | 'domain' | 'chainId' | 'ttl'> {
  origin?: string,
  domain?: string,
  chainId?: ChainId,
  ttl?: number
}
