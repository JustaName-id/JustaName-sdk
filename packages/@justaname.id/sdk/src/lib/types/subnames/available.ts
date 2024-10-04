import { ChainId, IRequest, IResponse, IRoute } from '../common';

/**
 * Defines the request structure for checking the availability of a subname.
 *
 * @interface IsSubnameAvailableRequest
 * @extends IRequest
 * @public
 * @property {string} subname - The subname to check for availability.
 * @property {ChainId} chainId - The blockchain network identifier where the subname exists. 
 *                               This helps in ensuring that the check is performed within
 *                               the context of the correct blockchain network.
 */
export interface IsSubnameAvailableRequest extends IRequest {
  subname: string;
  chainId: ChainId;
}

/**
 * Represents the response to a query about the availability of a subname.
 *
 * @interface IsSubnameAvailableResponse
 * @extends IResponse
 * @public
 * @property {boolean} available - Indicates the availability of the subname. 
 *                                 `true` if the subname is available for registration, 
 *                                 `false` if it's already taken.
 */
export interface IsSubnameAvailableResponse extends IResponse {
  available: boolean;
}


/**
 * Configures the route for checking the availability of a subname on a specific blockchain network.
 * This interface extends `IRoute`, linking together the request and response structures specifically
 * designed for the subname availability check.
 * 
 * @interface IsSubnameAvailableRoute
 * @extends IRoute
 * @public
 * @property {IsSubnameAvailableRequest} request - The request structure for the subname availability check.
 * @property {IsSubnameAvailableResponse} response - The response indicating the availability of the subname.
 * @property {NonNullable<unknown>} headers - The headers required for the request, deliberately unspecified
 *                                            to allow for flexibility in requirements.
 */
export interface  IsSubnameAvailableRoute extends IRoute {
  request: IsSubnameAvailableRequest;
  response: IsSubnameAvailableResponse;
  headers: NonNullable<unknown>;
}

export interface IsSubnameAvailableParams extends Omit<IsSubnameAvailableRequest, 'chainId'> {
  chainId?: ChainId;
}