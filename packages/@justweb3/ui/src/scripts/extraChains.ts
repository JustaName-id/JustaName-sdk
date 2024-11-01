import { chains } from '../lib/icons/components/chains';
import { coinTypeToNameMap } from '@ensdomains/address-encoder';

interface CoinType {
  coin: string;
  symbol: string;
  coinType: string;
}

interface CoinTypeMap {
  [key: string]: CoinType;
}
const coinTypeMap: CoinTypeMap = Object.keys(coinTypeToNameMap).reduce(
  (acc, key) => {
    const coin = key as keyof typeof coinTypeToNameMap;
    const symbol = coinTypeToNameMap[coin];
    acc[key] = {
      coin: symbol[1],
      symbol: symbol[0],
      coinType: coin,
    };
    return acc;
  },
  {} as CoinTypeMap
);

export const getExtraChains = () => {
  const symbolMap = Object.keys(coinTypeMap).map(
    (chain) => coinTypeMap[chain].symbol
  );
  const extraChains = Object.keys(chains).filter((chain) => {
    return !symbolMap.includes(chain);
  });

  console.log('Extra chains:', JSON.stringify(extraChains, null, 2));

  return extraChains;
};

getExtraChains();
