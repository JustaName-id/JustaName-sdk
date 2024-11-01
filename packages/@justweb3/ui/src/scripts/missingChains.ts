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

function main() {
  const symbolMap = Object.keys(coinTypeMap).map(
    (chain) => coinTypeMap[chain].symbol
  );
  const missingChains = symbolMap.filter(
    (chain) => !Object.keys(chains).includes(chain)
  );

  console.log('Missing chains:', JSON.stringify(missingChains, null, 2));
}

main();
