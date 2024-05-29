import { coinTypeToNameMap} from '@ensdomains/address-encoder';

export interface CoinType {
  coin: string;
  symbol: string;
  coinType: string;
}

export interface CoinTypeMap {
  [key: string]: CoinType;
}
export const coinTypeMap : CoinTypeMap = Object.keys(coinTypeToNameMap).reduce((acc, key) => {
  const coin = key as keyof typeof coinTypeToNameMap;
  const symbol = coinTypeToNameMap[coin];
  acc[key] = {
    coin: symbol[1],
    symbol: symbol[0],
    coinType: coin,
  };
  return acc;
}, {} as CoinTypeMap);

export type CoinTypeKeys = keyof typeof coinTypeMap;


export const getCoinTypeDetails =  (cointype: CoinTypeKeys):  CoinType  => {
  const coinTypeDetails = coinTypeMap[cointype];
  if (coinTypeDetails) {
    return {
      ...coinTypeDetails,
    }
  }
  return {
    coin: "NON",
    symbol: "NON",
    coinType: "-1",
  };
}
