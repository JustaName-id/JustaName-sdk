// Ethers v6 compatibility layer

import { ethers } from 'ethers';

export type Provider = ethers.Provider;
export type JsonRpcProvider = ethers.JsonRpcProvider;

export const getJsonRpcProvider = (
  providerUrl?: string,
  chainId?: number
): JsonRpcProvider => {
  return new ethers.JsonRpcProvider(providerUrl, chainId);
};

export const namehash = (name: string): string => ethers.namehash(name);

export const getAddress = (address: string): string => ethers.getAddress(address);