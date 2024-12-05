// inspired by spruceid siwe: https://github.com/spruceid/siwe/blob/main/packages/siwe/lib/ethersCompat.ts

import { ethers } from 'ethers';

// @ts-expect-error -- compatibility hack
type ProviderV5 = ethers.providers.Provider;
type ProviderV6 = ethers.Provider;
// @ts-expect-error -- compatibility hack
type JsonRpcProviderV5 = ethers.providers.JsonRpcProvider;
type JsonRpcProviderV6 = ethers.JsonRpcProvider;

export type Provider = ProviderV6 extends undefined ? ProviderV5 : ProviderV6;
export type JsonRpcProvider = JsonRpcProviderV6 extends undefined
  ? JsonRpcProviderV5
  : JsonRpcProviderV6;

interface EthersCompat {
  namehash?: (name: string) => string;
  getAddress?: (address: string) => string;
  JsonRpcProvider?: new (...args: any[]) => JsonRpcProvider;
  utils: {
    namehash: (name: string) => string;
    getAddress: (address: string) => string;
  };
  providers: {
    JsonRpcProvider: new (...args: any[]) => JsonRpcProvider;
  };
}

const ethersCompat = ethers as unknown as EthersCompat;

export const getJsonRpcProvider = (
  providerUrl?: string,
  chainId?: number
): JsonRpcProvider => {
  if ('JsonRpcProvider' in ethersCompat) {
    return new ethersCompat.JsonRpcProvider!(providerUrl, chainId);
  } else {
    return new ethersCompat.providers.JsonRpcProvider(providerUrl, chainId);
  }
};

export const namehash: (name: string) => string =
  'namehash' in ethersCompat
    ? ethersCompat.namehash!
    : ethersCompat.utils.namehash;

export const getAddress: (address: string) => string =
  'getAddress' in ethersCompat
    ? ethersCompat.getAddress!
    : ethersCompat.utils.getAddress;
