import {
  ChainId,
  EmptyHeaders,
  IRequest,
  IRoute,
  PaginatedResponse,
  SubnameResponse
} from '../common';


export interface SubnameGetAllByEnsDomainWithCountApiResponse {
  ensDomain: string;

  subnameCount: number;

  ensSubname: SubnameResponse
}


export interface SubnameGetAllByEnsDomainWithCountResponse extends PaginatedResponse<SubnameGetAllByEnsDomainWithCountApiResponse> {}

export interface SubnameGetAllByEnsDomainWithCountRequest extends IRequest {

  chainId: ChainId;

  page?: number;

  limit?: number;

  orderBy?: 'subnameCount' | 'createdAt'

  orderDirection?: 'asc' | 'desc'
}


export interface SubnameGetAllByEnsDomainWithCountRoute extends IRoute<SubnameGetAllByEnsDomainWithCountRequest, SubnameGetAllByEnsDomainWithCountResponse, EmptyHeaders, 'chainId'> {}