import { coinTypeToNameMap } from '@ensdomains/address-encoder';

export type SupportedCoins = keyof typeof coinTypeToNameMap;
export interface CoinType {
  coin: string;
  symbol: string;
  coinType: SupportedCoins | '-1';
}

export type CoinTypeMap = {
  [key in SupportedCoins]: CoinType;
};

export const coinTypeMap: CoinTypeMap = Object.keys(coinTypeToNameMap).reduce(
  (acc, key) => {
    const coin = key as SupportedCoins;
    const symbol = coinTypeToNameMap[coin];
    acc[coin] = {
      coin: symbol[1],
      symbol: symbol[0],
      coinType: coin,
    };
    return acc;
  },
  {} as CoinTypeMap
);

export type CoinTypeKeys = keyof typeof coinTypeMap;

export const getCoinTypeDetails = (cointype: SupportedCoins): CoinType => {
  const coinTypeDetails = coinTypeMap[cointype];
  if (coinTypeDetails) {
    return {
      ...coinTypeDetails,
    };
  }
  return {
    coin: 'NON',
    symbol: 'NON',
    coinType: '-1',
  };
};
