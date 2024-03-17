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

export interface SubnameAddRequest extends IRequest{

  username: string;

  ensDomain: string;

  chainId: number;

  addresses?: Address[];

  text?: TextRecord[];

  contentHash?: string;
}


export interface SubnameAddResponse extends IResponse{
  id: string;
}

export interface SubnameAddRoute extends IRoute {
  request: SubnameAddRequest;
  response: SubnameAddResponse;
  headers: ApiKeyHeaders & SIWEHeaders;
}