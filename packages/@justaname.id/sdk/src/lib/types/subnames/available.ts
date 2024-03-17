import { ChainId, IRequest, IResponse, IRoute } from '../common';

export interface IsSubnameAvailableRequest extends IRequest {
  subname: string;
  chainId: ChainId;
}

export interface IsSubnameAvailableResponse extends IResponse {
  available: boolean;
}

export interface  IsSubnameAvailableRoute extends IRoute {
  request: IsSubnameAvailableRequest;
  response: IsSubnameAvailableResponse;
  headers: NonNullable<unknown>;
}