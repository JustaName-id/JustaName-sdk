'use client';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { useMemo } from 'react';
import type { Account, Chain, Client, Transport } from 'viem';
import { useWalletClient } from 'wagmi';

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  if (!account || !chain || !transport) return undefined;
  const network = {
    chainId: chain?.id,
    name: chain?.name,
    ensAddress: chain?.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export const useEthersSigner = ({ chainId }: { chainId?: number } = {}):
  | JsonRpcSigner
  | undefined => {
  const { data: client } = useWalletClient({ chainId });
  const signer = useMemo(
    () => (client ? clientToSigner(client) : undefined),
    [client]
  );
  return signer;
};
