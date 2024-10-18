import { SupportedCoins } from '../../utils';

export type ChainId = 1 | 11155111;

export type PartialAddressJson = Partial<{
  [key in SupportedCoins]: string;
}>;

export interface AddressWithTypedCoins {
  address: string;
  coinType: SupportedCoins;
}

export type AddressType = `0x${string}`;
