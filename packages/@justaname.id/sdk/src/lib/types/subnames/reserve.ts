import { ApiKeyHeaders } from '../headers';
import { IRequest, IResponse, IRoute } from '../common';

/**
 * Specifies the request parameters for reserving a subname under a given ENS domain.
 *
 * @interface SubnameReserveRequest
 * @extends IRequest
 * @public
 * @property {string} username - The desired subname to reserve.
 * @property {string} ensDomain - The parent ENS domain under which the subname will be reserved.
 * @property {number} chainId - The blockchain network identifier, indicating which network the ENS domain resides on.
 * @property {string} ethAddress - The Ethereum address associated with the reservation. This is usually the address that will claim the subname.
 */
export interface SubnameReserveRequest extends IRequest {

    username: string;

    ensDomain: string;

    chainId: number;
    
    ethAddress: string;
}

/**
 * Outlines the structure of the response after a successful subname reservation.
 * 
 * @interface SubnameReserveResponse
 * @extends IResponse
 * @public
 * @property {string} id - The unique identifier of the reserved subname. This ID can be used to claim the subname.
 */
export interface SubnameReserveResponse extends IResponse {
    id: string;
}

/**
 * Configures the route for the subname reservation process.
 * 
 * @interface SubnameReserveRoute
 * @extends IRoute
 * @public
 * @property {SubnameReserveRequest} request - The data structure required for a subname reservation request.
 * @property {SubnameReserveResponse} response - The expected format of the response upon a successful reservation.
 * @property {ApiKeyHeaders} headers - Specifies the API key headers required for authentication to perform the reservation.
 */
export interface SubnameReserveRoute extends IRoute {
    request: SubnameReserveRequest;
    response: SubnameReserveResponse;
    headers: ApiKeyHeaders;
}