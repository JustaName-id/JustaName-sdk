import { ChainId, EmptyHeaders, IRequest, IResponse, IRoute } from '../common';

export interface IsSubnameAvailableRequest extends IRequest {
  subname: string;
  chainId: ChainId;
}

export interface IsSubnameAvailableResponse extends IResponse {
  isAvailable: boolean;
}

export interface IsSubnameAvailableRoute extends IRoute<IsSubnameAvailableRequest, IsSubnameAvailableResponse, EmptyHeaders, 'chainId'> {}