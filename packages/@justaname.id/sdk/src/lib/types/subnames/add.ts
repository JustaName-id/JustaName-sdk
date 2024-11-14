import { ApiKeyHeaders, SIWEHeaders } from '../headers';
import {
  AddressWithTypedCoins,
  ChainId,
  IRequest,
  IRoute,
  PartialAddressJson,
  SubnameResponse,
} from '../common';

interface AddressAddRequest {
  address: string;

  coinType: number;
}

interface TextRecordAddRequest {
  key: string;

  value: string;
}

export interface SubnameAddRequest extends IRequest {
  username: string;

  ensDomain: string;

  chainId: ChainId;

  addresses?: AddressAddRequest[];

  text?: TextRecordAddRequest[];

  contentHash?: string;

  signature?: string;
}

export interface SubnameAddRoute
  extends IRoute<
    SubnameAddRequest,
    SubnameResponse,
    ApiKeyHeaders & SIWEHeaders,
    'ensDomain' | 'chainId',
    'addresses' | 'text',
    {
      addresses?: PartialAddressJson | AddressWithTypedCoins[];
      text?: Record<string, string> | TextRecordAddRequest[];
      apiKey?: string;
    }
  > {}
