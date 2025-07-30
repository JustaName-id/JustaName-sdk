import { TextRecord, Address, PartialAddressJson, AddressWithTypedCoins } from '../../types';

export const sanitizeTexts = (texts: Record<string, string> | TextRecord[] | undefined): TextRecord[] | undefined => {
  if (!texts) return undefined;

  if (Array.isArray(texts)) {
    return texts;
  }

  return Object.entries(texts).map(([key, value]) => ({ key, value }));
}

export const sanitizeAddresses = (addresses: PartialAddressJson | AddressWithTypedCoins[] | undefined): Address[] | undefined => {
  if (!addresses) return undefined;

  if (Array.isArray(addresses)) {
    return addresses.map(({ address, coinType }) => ({
      address,
      coinType: parseInt(coinType)
    }));
  }

  return Object.entries(addresses).map(([coinType, address]) => ({ coinType: parseInt(coinType), address }))
    .filter(({ address }) => !!address ) as Address[] | undefined;;
}
