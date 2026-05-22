import { ChainId } from '@justaname.id/sdk';

/**
 * Resolves the wagmi-provided chainId to a supported JustaName ChainId.
 *
 * - Returns `undefined` when no chain is available (wallet not connected yet);
 *   callers should defer SDK initialization until a chain resolves.
 * - Returns `1` (mainnet) for any chainId that is not one of the two
 *   officially supported networks (1, 11155111).
 * - Otherwise passes the chainId through unchanged.
 */
export const resolveDefaultChain = (
  chainId: number | undefined
): ChainId | undefined => {
  if (chainId === undefined) return undefined;
  if (chainId !== 1 && chainId !== 11155111) return 1;
  return chainId;
};
