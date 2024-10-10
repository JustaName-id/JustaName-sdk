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
const coinTypeMap : CoinTypeMap = Object.keys(coinTypeToNameMap).reduce((acc, key) => {
  const coin = key as keyof typeof coinTypeToNameMap;
  const symbol = coinTypeToNameMap[coin];
  acc[key] = {
    coin: symbol[1],
    symbol: symbol[0],
    coinType: coin,
  };
  return acc;
}, {} as CoinTypeMap);

function main() {
  const missingChains = Object.keys(coinTypeMap).filter((chain) => {
    return !Object.keys(chains).includes(coinTypeMap[chain].symbol);
  })
  const missing = missingChains.map((chain) => coinTypeMap[chain].symbol)

  console.log('Missing chains:', JSON.stringify(missing, null, 2));
}

main()
