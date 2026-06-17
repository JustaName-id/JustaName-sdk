export const NETWORK_CHANGED = 'NETWORK_CHANGED';

export type NetworkName = 'mainnet' | 'sepolia';

export interface NetworkChangedPayload {
  chainId: number;
  /** Human-readable network the user switched to. */
  network: NetworkName;
}
