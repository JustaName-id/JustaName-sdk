import { ApiKeyHeaders } from '../headers';
import { ChainId, IRequest, IRoute, SubnameResponse } from '../common';

export interface SubnameReserveRequest extends IRequest {
  username: string;

  ensDomain: string;

  chainId: ChainId;

  ethAddress: string;
}

export interface SubnameReserveRoute
  extends IRoute<
    SubnameReserveRequest,
    SubnameResponse,
    ApiKeyHeaders,
    'ensDomain' | 'chainId',
    never,
    {
      apiKey?: string;
    }
  > {}
