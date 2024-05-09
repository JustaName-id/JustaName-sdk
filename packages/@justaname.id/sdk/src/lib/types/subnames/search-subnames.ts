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

export interface SubnameSearchRequest extends IRequest {
  subname: string;

  skip: number;

  take: number;

  chainId: ChainId;

  data: boolean;

  ensRegistered: boolean;

  isClaimed: boolean;
}

export interface SubnameSearchResponse extends IResponse {
  domains: SubnameSearchDomainResponse[] | string[];
  registered?: boolean;
}

export interface SubnameSearchDomainResponse {
  id: string;

  username: string;

  ensId: string;

  subname: string;

  isClaimed: boolean;

  claimedAt?: Date | null;

  data: MetadataResponse;
}

export interface SubnameSearchRoute extends IRoute {
  request: SubnameSearchRequest;
  response: SubnameSearchResponse;
  headers: NonNullable<unknown>;
}
