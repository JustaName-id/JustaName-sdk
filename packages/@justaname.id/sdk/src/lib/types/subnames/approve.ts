import { ApiKeyHeaders, SIWEHeaders } from '../headers';
import { IRequest, IResponse, IRoute } from '../common';

export interface Address {
  address: string;

  coinType: number;
}

export interface TextRecord {
  key: string;

  value: string;
}

export interface Metadata {
  id: string;

  contentHash: string;

  addresses: Address[];

  textRecords: TextRecord[];

  subdomainId: string;
}

export interface SubnameApproveRequest extends IRequest {
  username: string;

  ensDomain: string;

  chainId: number;

  addresses?: Address[];

  text?: TextRecord[];

  contentHash?: string;
}

export interface SubnameApproveResponse extends IResponse {
  id: string;

  data: Metadata;
}

export interface SubnameApproveRoute extends IRoute {
  request: SubnameApproveRequest;
  response: SubnameApproveResponse;
  headers: ApiKeyHeaders & SIWEHeaders;
}
