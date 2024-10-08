import { ChainId, EmptyHeaders, IRequest, IResponse, IRoute, SubnameResponse } from '../common';

export interface SubnameSearchResponse extends IResponse {
  domains: SubnameResponse[] | string[];
  registered?: boolean;
}

export interface SubnameSearchRequest extends IRequest {
  subname: string;

  skip: number;

  take: number;

  chainId: ChainId;

  data: boolean;

  ensRegistered: boolean;

  isClaimed: boolean;
}

export interface SubnameSearchRoute extends IRoute<SubnameSearchRequest, SubnameSearchResponse, EmptyHeaders, 'chainId'> {}