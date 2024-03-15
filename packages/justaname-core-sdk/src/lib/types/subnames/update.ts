import { ApiKeyHeaders, SIWEHeaders } from '../headers';
import { IRequest, IResponse, IRoute } from '../common';

interface Address {

  address: string;

  coinType: number;
}

interface TextRecord {

  key: string;


  value: string;
}

interface Metadata {
  id: string;

  contentHash: string;

  addresses: Address[];

  textRecords: TextRecord[];

  subdomainId: string;
}

export interface SubnameUpdateRequest extends IRequest{

  username: string;

  ensDomain: string;

  chainId: number;

  addresses: Address[]

  text: TextRecord[];

  contentHash: string;
}


export interface SubnameUpdateResponse extends IResponse{
  
  id: string;

  data: Metadata;
}

export interface SubnameUpdateRoute extends IRoute {
  request: SubnameUpdateRequest;
  response: SubnameUpdateResponse;
  headers: ApiKeyHeaders & SIWEHeaders;
}