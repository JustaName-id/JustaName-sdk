import { ChainId, IRequest, IResponse, IRoute } from '../common';

/**
 * Represents a request to challenge to add EBDC permission.
 * @interface RequestAddMAppPermissionChallengeRequest
 * @public
 */

export interface RequestAddMAppPermissionChallengeRequest extends IRequest {

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

  /**
   * Subname requesting the ABDC Permission
   * @type {string}
   */
  subname: string

  /**
   * Subname requesting the MApps Permission
   * @type {string}
   */
  mApp: string
}

/**
 * Represents the response to a request to challenge a specific address using SIWE.
 * @interface RequestAddMAppPermissionChallengeResponse
 * @public
 */
export interface RequestAddMAppPermissionChallengeResponse extends IResponse{
  /**
   * Represents the challenge to be signed by the user.
   * @type {string}
   */
  challenge: string;
}

export interface RequestAddMAppPermissionChallengeRoute extends IRoute {
  request: RequestAddMAppPermissionChallengeRequest;
  response: RequestAddMAppPermissionChallengeResponse;
  headers: NonNullable<unknown>;
}

export interface RequestAddMAppPermissionChallengeParams extends Omit<RequestAddMAppPermissionChallengeRequest, 'origin' | 'domain' | 'chainId' | 'ttl' > {
  origin?: string,
  domain?: string,
  chainId?: ChainId,
  ttl?: number
}