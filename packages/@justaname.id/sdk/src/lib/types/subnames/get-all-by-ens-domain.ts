import { ChainId, IRequest, IResponse, IRoute } from '../common';

interface AddressResponse {
  id: string;

  coinType: number;

  address: string;

  dataId: string;
}

interface TextRecordResponse {
  id: string;

  key: string;

  value: string;

  dataId: string;
}

interface MetadataResponse {
  id: string;

  contentHash: string;

  subdomainId: string;

  addresses: AddressResponse[];

  textRecords: TextRecordResponse[];
}

interface SubnameResponse {
    id: string;

    username: string;
  
    ensId: string;
  
    subname: string;
  
    isClaimed: boolean;
  
    claimedAt?: Date | null;
  
    data: MetadataResponse;
}

interface PaginationResponse {

    totalCount: number;

    page: number;

    limit: number;

    totalPages: number;

    nextPage: number | null;

    prevPage: number | null;

    hasNextPage: boolean;

    hasPrevPage: boolean;
}

export interface SubnameGetAllByDomainChainIdRequest extends IRequest {
  ensDomain: string;

  chainId: ChainId;

  coinType?: number;

  page?: number;

  limit?: number;

  isClaimed?: boolean;
}

export interface SubnameGetAllByDomainChainIdResponse extends IResponse {

  subnames: SubnameResponse[];

  pagination: PaginationResponse
}

export interface SubnameGetAllByDomainChainIdRoute extends IRoute {
    request: SubnameGetAllByDomainChainIdRequest;
    response: SubnameGetAllByDomainChainIdResponse;
    headers: NonNullable<unknown>;
}