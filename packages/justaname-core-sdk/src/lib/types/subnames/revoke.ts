import { ApiKeyHeaders, SIWEHeaders } from '../headers';
import { IRequest, IResponse, IRoute } from '../common';

export interface SubnameRevokeRequest extends IRequest{

    ensDomain: string;

    username: string;

    chainId: number;
}

export interface SubnameRevokeResponse extends IResponse{
  response: string;
}

export interface SubnameRevokeRoute extends IRoute {
  request: SubnameRevokeRequest;
  response: SubnameRevokeResponse;
  headers: ApiKeyHeaders & SIWEHeaders;
}