import { ChainId, IRequest, IRoute, PaginatedResponse, SubnameResponse } from '../common';
import { EmptyHeaders } from '../common/iroute';

export interface SubnameGetAllByDomainChainIdRequest extends IRequest {
  ensDomain: string;
  chainId: ChainId;
  coinType?: number;
  page?: number;
  limit?: number;
  isClaimed?: boolean;
}

export interface SubnameGetAllByDomainChainIdResponse extends PaginatedResponse<SubnameResponse> {}

export interface SubnameGetAllByDomainChainIdRoute extends IRoute<SubnameGetAllByDomainChainIdRequest, SubnameGetAllByDomainChainIdResponse, EmptyHeaders,  'chainId' | 'ensDomain'> {}
