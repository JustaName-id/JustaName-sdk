import { IRequest, IRoute, SubnameResponse } from '../common';
import { SIWEHeaders } from '../headers';

export interface SubnameRejectRequest extends IRequest {
  ensDomain: string;

  username: string;

  chainId: number;

  signature?: string;
}

export interface SubnameRejectRoute
  extends IRoute<
    SubnameRejectRequest,
    SubnameResponse,
    SIWEHeaders,
    'ensDomain' | 'chainId'
  > {}
