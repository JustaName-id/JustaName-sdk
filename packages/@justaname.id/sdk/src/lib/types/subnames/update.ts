import { ApiKeyHeaders, SIWEHeaders } from '../headers';
import {
  AddressWithTypedCoins,
  ChainId,
  IRequest,
  IRoute, PartialAddressJson,
  SubnameResponse
} from '../common';

interface AddressUpdateRequest {

  address: string;

  coinType: number;
}

interface TextRecordUpdateRequest {

  key: string;

  value: string;
}

export interface SubnameUpdateRequest extends IRequest{

  username: string;

  ensDomain: string;

  chainId: ChainId;

  addresses?: AddressUpdateRequest[];

  text?: TextRecordUpdateRequest[];

  contentHash?: string;
}


export interface SubnameUpdateRoute extends IRoute<
  SubnameUpdateRequest,
  SubnameResponse,
  ApiKeyHeaders & SIWEHeaders,
  'ensDomain' | 'chainId' ,
  'addresses' | 'text',
  { addresses?: PartialAddressJson | AddressWithTypedCoins[]; text?: Record<string, string> | TextRecordUpdateRequest[] }
> {}