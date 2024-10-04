import { ApiKeyHeaders, SIWEHeaders } from '../headers';
import { ChainId, IRequest, IResponse, IRoute } from '../common';

/**
 * Defines the request structure for revoking a subname under a specific ENS domain.
 * 
 * @interface SubnameRevokeRequest
 * @extends IRequest
 * @public
 * @property {string} ensDomain - The parent ENS domain under which the subname is registered.
 * @property {string} username - The subname to be revoked.
 * @property {number} chainId - The blockchain network identifier, specifying the network of the ENS domain.
 */
export interface SubnameRevokeRequest extends IRequest{

    ensDomain: string;

    username: string;

    chainId: ChainId;
}

/**
 * Represents the response received after successfully revoking a subname.
 *
 * @interface SubnameRevokeResponse
 * @extends IResponse
 * @public
 * @property {string} response - A message or status indicating the outcome of the subname revocation.
 */
export interface SubnameRevokeResponse extends IResponse{
  response: string;
}

/**
 * Configures the route for revoking a subname, detailing the required request format, the expected response,
 * and any necessary headers for authentication and authorization.
 *
 * @interface SubnameRevokeRoute
 * @extends IRoute
 * @public
 * @property {SubnameRevokeRequest} request - The structure required for a subname revocation request.
 * @property {SubnameRevokeResponse} response - The expected format of the response upon successful revocation.
 * @property {ApiKeyHeaders & SIWEHeaders} headers - Combined API key and SIWE authentication headers required for the operation.
 *                                                  This ensures both the identity and authorization of the requester are verified.
 */
export interface SubnameRevokeRoute extends IRoute {
  request: SubnameRevokeRequest;
  response: SubnameRevokeResponse;
  headers: ApiKeyHeaders & SIWEHeaders;
}

export interface SubnameRevokeParams extends Omit<SubnameRevokeRequest, 'chainId' | 'ensDomain'> {
    chainId?: ChainId;
    ensDomain?: string;
}