import {
  AddressWithTypedCoins,
  IRequest,
  IRoute,
  PartialAddressJson,
  SubnameResponse
} from '../common';
import { ApiKeyHeaders, SIWEHeaders } from '../headers';

interface AddressAcceptRequest {

  address: string;

  coinType: number;
}

interface TextRecordAcceptRequest {

  key: string;

  value: string;
}

export interface SubnameAcceptRequest extends IRequest {
  username: string;

  ensDomain: string;

  chainId: number;

  addresses?: AddressAcceptRequest[];

  text?: TextRecordAcceptRequest[];

  contentHash?: string;
}


export interface SubnameAcceptRoute extends IRoute<
  SubnameAcceptRequest,
  SubnameResponse,
  ApiKeyHeaders & SIWEHeaders,
  'ensDomain' | 'chainId',
  'addresses' | 'text',
  { addresses?: PartialAddressJson | AddressWithTypedCoins[]; text?: Record<string, string> | TextRecordAcceptRequest[] }
> {}