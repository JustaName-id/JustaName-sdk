import { chains } from '../lib/icons/components/chains';
import { coinTypeToNameMap } from '@ensdomains/address-encoder';

const getSymbols = () => {
  const symbols = Object.keys(coinTypeToNameMap).map((key) => {
    const coin = key as keyof typeof coinTypeToNameMap;
    const symbol = coinTypeToNameMap[coin];
    return symbol[0];
  });

  return symbols
}

export const getExtraChains = () => {
  const symbols = getSymbols();
  const extraChains = Object.keys(chains).filter((chain) => {
    return !symbols.includes(chain as typeof symbols[number]);
  })

  console.log('Extra chains:', JSON.stringify(extraChains, null, 2));

  return extraChains
}

getExtraChains()
