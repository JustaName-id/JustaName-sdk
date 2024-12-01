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

export const getJsonRpcProvider = (
  providerUrl?: string | undefined,
  chainId?: number
): JsonRpcProvider => {
  try {
    return new ethers.JsonRpcProvider(providerUrl, chainId);
  } catch {
    // @ts-expect-error -- compatibility hack
    return new ethers.providers.JsonRpcProvider(providerUrl, chainId);
  }
};

let ethersNamehash = null;
let ethersGetAddress = null;

try {
  // @ts-expect-error -- compatibility hack
  ethersNamehash = ethers.utils.namehash;
  // @ts-expect-error -- compatibility hack
  ethersGetAddress = ethers.utils.getAddress;
} catch {
  ethersNamehash = ethers.namehash as (message: Uint8Array | string) => string;

  ethersGetAddress = ethers.getAddress as (address: string) => string;
}
export const namehash = ethersNamehash as (name: string) => string;
export const getAddress = ethersGetAddress as (address: string) => string;
