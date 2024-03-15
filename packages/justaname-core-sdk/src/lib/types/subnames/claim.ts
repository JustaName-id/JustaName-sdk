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

export interface SubnameClaimRequest extends IRequest{

  username: string;

  ensName: string;

  chainId: number;

  addresses: Address[]

  text: TextRecord[];

  contentHash: string;
}


export interface SubnameClaimResponse extends IResponse{
  id: string;
}

export interface SubnameClaimRoute extends IRoute {
  request: SubnameClaimRequest;
  response: SubnameClaimResponse;
  headers: ApiKeyHeaders & SIWEHeaders;
}