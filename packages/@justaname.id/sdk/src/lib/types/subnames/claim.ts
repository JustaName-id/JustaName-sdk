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

export interface SubnameClaimRequest extends IRequest {
  username: string;

  ensDomain: string;

  chainId: number;

  addresses?: Address[];

  text?: TextRecord[];

  contentHash?: string;
}

export interface SubnameClaimResponse extends IResponse {
  id: string;

  data: Metadata;
}

export interface SubnameClaimRoute extends IRoute {
  request: SubnameClaimRequest;
  response: SubnameClaimResponse;
  headers: ApiKeyHeaders & SIWEHeaders;
}
