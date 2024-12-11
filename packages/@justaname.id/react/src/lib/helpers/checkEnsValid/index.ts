import { SubnameResponse } from '@justaname.id/sdk';

export const checkEnsValid = (ens: SubnameResponse): void => {
  if (
    ens.records.resolverAddress === '0x0000000000000000000000000000000000000000'
  ) {
    throw new Error('Resolver address not found');
  }

  let ethAddress = null;
  if (ens) {
    ethAddress = ens?.records.coins?.find((coin) => coin.id === 60)?.value;

    if (!ethAddress) {
      throw new Error('ETH address not found');
    }
  }
};
