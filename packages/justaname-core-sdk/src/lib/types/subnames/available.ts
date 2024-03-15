import { ChainId, IRequest, IRoute } from '../common';

export interface IsSubnameAvailableRequest extends IRequest {
  subname: string;
  chainId: ChainId;
}

export interface  IsSubnameAvailableRoute extends IRoute {
  request: IsSubnameAvailableRequest;
  response: boolean;
  headers: NonNullable<unknown>;
}