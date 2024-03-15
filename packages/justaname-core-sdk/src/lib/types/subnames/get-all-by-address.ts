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

export interface SubnameGetAllByAddressRequest extends IRequest {
  address: string;

  chainId: ChainId;

  coinType: number;

  isClaimed: boolean;
}

export interface SubnameGetAllByAddressResponse extends IResponse {
  id: string;

  username: string;

  ensId: string;

  subname: string;

  isClaimed: boolean;

  claimedAt?: Date | null;

  data: MetadataResponse;
}

export interface SubnameGetAllByAddressRoute extends IRoute {
    request: SubnameGetAllByAddressRequest;
    response: SubnameGetAllByAddressResponse;
    headers: NonNullable<unknown>;
}