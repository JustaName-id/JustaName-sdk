import { ChainId, IRequest, IResponse, IRoute } from '../common';

export interface AddressResponse {
  id: string;

  coinType: number;

  address: string;

  dataId: string;
}

export interface TextRecordResponse {
  id: string;

  key: string;

  value: string;

  dataId: string;
}

export interface MetadataResponse {
  id: string;

  contentHash: string;

  subdomainId: string;

  addresses: AddressResponse[];

  textRecords: TextRecordResponse[];
}

export interface SubnameGetByDomainNameChainIdRequest extends IRequest {
  ensDomain: string;

  username: string;

  chainId: ChainId;
}

export interface SubnameGetByDomainNameChainIdResponse extends IResponse {
  id: string;

  username: string;

  ensId: string;

  subname: string;

  isClaimed: boolean;

  claimedAt?: Date | null;

  data: MetadataResponse;
}

export interface SubnameGetByDomainNameChainIdRoute extends IRoute {
    request: SubnameGetByDomainNameChainIdRequest;
    response: SubnameGetByDomainNameChainIdResponse;
    headers: NonNullable<unknown>;
}