import { IRequest, IResponse, IRoute } from '../common';
import { SIWEHeaders } from '../headers';

/**
 * Defines the request structure for rejecting a subname under a specific ENS domain.
 *
 * @interface SubnameRejectRequest
 * @extends IRequest
 * @public
 * @property {string} ensDomain - The parent ENS domain under which the subname is registered.
 * @property {string} username - The subname to be rejected.
 * @property {number} chainId - The blockchain network identifier, specifying the network of the ENS domain.
 */
export interface SubnameRejectRequest extends IRequest {
  ensDomain: string;

  username: string;

  chainId: number;
}

/**
 * Represents the response received after successfully rejecting a subname.
 *
 * @interface SubnameRejectResponse
 * @extends IResponse
 * @public
 * @property {string} response - A message or status indicating the outcome of the subname revocation.
 */
export interface SubnameRejectResponse extends IResponse {
  response: string;
}

/**
 * Configures the route for rejecting a subname, detailing the required request format, the expected response,
 * and any necessary headers for authentication and authorization.
 *
 * @interface SubnameRejectRoute
 * @extends IRoute
 * @public
 * @property {SubnameRejectRequest} request - The structure required for a subname revocation request.
 * @property {SubnameRejectResponse} response - The expected format of the response upon successful revocation.
 * @property {SIWEHeaders} headers - SIWE authentication headers required for the operation.
 */
export interface SubnameRejectRoute extends IRoute {
  request: SubnameRejectRequest;
  response: SubnameRejectResponse;
  headers: SIWEHeaders;
}


export interface SubnameRejectParams extends Omit<SubnameRejectRequest, 'chainId' | 'ensDomain'> {
  chainId?: number;
  ensDomain?: string;
}