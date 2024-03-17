import { ApiKeyHeaders } from '../headers';
import { IRequest, IResponse, IRoute } from '../common';

export interface SubnameReserveRequest extends IRequest {

    username: string;

    ensDomain: string;

    chainId: number;
    
    ethAddress: string;
}

export interface SubnameReserveResponse extends IResponse {
    id: string;
}

export interface SubnameReserveRoute extends IRoute {
    request: SubnameReserveRequest;
    response: SubnameReserveResponse;
    headers: ApiKeyHeaders;
}