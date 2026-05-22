'use client';
import type { Signer } from '@xmtp/browser-sdk';
import { useMemo } from 'react';
import { hexToBytes } from 'viem';
import { useWalletClient } from 'wagmi';

/**
 * Returns an XMTP-compatible `Signer` backed by the wagmi/viem `WalletClient`.
 *
 * Renamed from `useEthersSigner` once the SDK dropped ethers in favor of viem.
 * Old name kept as alias for backwards compatibility within this plugin.
 */
export const useXmtpSigner = ({
  chainId,
}: { chainId?: number } = {}): Signer | undefined => {
  const { data: walletClient } = useWalletClient({ chainId });

  return useMemo<Signer | undefined>(() => {
    if (!walletClient?.account) return undefined;
    const account = walletClient.account;
    return {
      type: 'EOA',
      getIdentifier: async () => ({
        identifier: account.address,
        identifierKind: 'Ethereum',
      }),
      signMessage: async (message: string) => {
        const signature = await walletClient.signMessage({
          account,
          message,
        });
        return hexToBytes(signature);
      },
    };
  }, [walletClient]);
};

/**
 * @deprecated Renamed to `useXmtpSigner`. This alias will be removed in the next major version.
 */
export const useEthersSigner = useXmtpSigner;
