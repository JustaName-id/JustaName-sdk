import {
  createPublicClient,
  http,
  getAddress as viemGetAddress,
  PublicClient,
  Chain,
  Transport,
} from 'viem';
import { namehash as viemNamehash } from 'viem/ens';
import { mainnet, sepolia } from 'viem/chains';

export type ViemPublicClient = PublicClient<Transport, Chain>;

const chainIdToChain: Record<number, Chain> = {
  1: mainnet,
  11155111: sepolia,
};

export const getPublicClient = (
  providerUrl?: string,
  chainId?: number
): ViemPublicClient => {
  const chain = chainId ? chainIdToChain[chainId] : mainnet;
  return createPublicClient({
    chain,
    transport: http(providerUrl),
  });
};

export const namehash = viemNamehash;

export const getAddress = viemGetAddress;
