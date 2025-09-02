import { coinTypeToNameMap } from '@ensdomains/address-encoder';

const SLIP44_MSB = 2147483648;

export type NativelySupportedCoins = keyof typeof coinTypeToNameMap

export type SupportedCoins =  NativelySupportedCoins | string;
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
    const coin = key as NativelySupportedCoins;
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

export const getCoinTypeDetails = (cointype: SupportedCoins | string): CoinType => {


  const coinTypeDetails = coinTypeMap[cointype as SupportedCoins] as CoinType;
  if (coinTypeDetails) {
    return {
      ...coinTypeDetails,
    };
  }

  if (Number(cointype) >= SLIP44_MSB ) {
    return {
      coin: "NON",
      symbol: "NON",
      coinType: cointype as SupportedCoins,
    }
  }
  return {
    coin: 'NON',
    symbol: 'NON',
    coinType: '-1',
  };
};
