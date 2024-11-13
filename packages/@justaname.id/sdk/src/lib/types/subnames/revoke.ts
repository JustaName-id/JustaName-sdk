import { ApiKeyHeaders, SIWEHeaders } from '../headers';
import { ChainId, IRequest, IRoute, SubnameResponse } from '../common';

export interface SubnameRevokeRequest extends IRequest {
  ensDomain: string;

  username: string;

  chainId: ChainId;

  signature?: string;
}

export interface SubnameRevokeRoute
  extends IRoute<
    SubnameRevokeRequest,
    SubnameResponse,
    ApiKeyHeaders & SIWEHeaders,
    'ensDomain' | 'chainId',
    never,
    {
      apiKey?: string;
    }
  > {}
