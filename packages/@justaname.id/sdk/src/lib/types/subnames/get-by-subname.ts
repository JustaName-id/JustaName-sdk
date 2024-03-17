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

export interface SubnameGetBySubnameRequest extends IRequest {

  subname: string;

  chainId: ChainId;
}

export interface SubnameGetBySubnameResponse extends IResponse {
  id: string;

  username: string;

  ensId: string;

  subname: string;

  isClaimed: boolean;

  claimedAt?: Date | null;

  data: MetadataResponse;
}

export interface SubnameGetBySubnameRoute extends IRoute {
    request: SubnameGetBySubnameRequest;
    response: SubnameGetBySubnameResponse;
    headers: NonNullable<unknown>;
}