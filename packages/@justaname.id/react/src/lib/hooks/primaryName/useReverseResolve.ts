import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Address } from 'viem';
import { useJustaName } from '../../providers';
import { defaultOptions } from '../../query';

export const buildReverseResolveKey = (
  address: string,
  chainId: number | undefined
) => ['REVERSE_RESOLVE', address, chainId];

export interface UseReverseResolveParams {
  /**
   * The Ethereum address to reverse resolve
   */
  address?: string;
  /**
   * The chain ID for multichain resolution (ENSIP-19)
   */
  chainId?: number;
  /**
   * Whether the query is enabled
   */
  enabled?: boolean;
}

export interface UseReverseResolveResult {
  /**
   * The resolved ENS name, or null if not found
   */
  ensName: string | null | undefined;
  /**
   * Whether the query is pending
   */
  isReverseResolvePending: boolean;
  /**
   * Whether the query is fetching
   */
  isReverseResolveFetching: boolean;
  /**
   * Whether the query is loading
   */
  isReverseResolveLoading: boolean;
  /**
   * Manually trigger reverse resolution
   */
  reverseResolve: (
    params: ReverseResolveParams,
    force?: boolean
  ) => Promise<string | null>;
  /**
   * Refetch the reverse resolution
   */
  refetchReverseResolve: () => void;
}

export interface ReverseResolveParams {
  address: Address | undefined;
  chainId?: number;
}

/**
 * Hook to reverse resolve an Ethereum address to an ENS name using ENSIP-19 multichain resolution
 *
 * This hook provides a three-level fallback strategy:
 * 1. Try with coinType 0 (default Ethereum)
 * 2. Try with coinType based on chainId (multichain)
 * 3. Fallback to JustaName offchain records
 *
 * @param params - The reverse resolve parameters
 * @returns The reverse resolve result with ENS name and loading states
 *
 * @example
 * ```tsx
 * const { ensName, isReverseResolveLoading } = useReverseResolve({
 *   address: '0x1234567890123456789012345678901234567890',
 *   chainId: 8453, // Base chain
 * });
 * ```
 */
export const useReverseResolve = (
  params?: UseReverseResolveParams
): UseReverseResolveResult => {
  const { chainId: defaultChainId, justaname } = useJustaName();
  const _enabled = params?.enabled !== undefined ? params.enabled : true;
  const _chainId = params?.chainId ?? defaultChainId ?? 1; // Default to mainnet if no chainId provided
  const queryClient = useQueryClient();

  const reverseResolveInternal = async (
    _params: ReverseResolveParams
  ): Promise<string | null> => {
    if (!_params.address) {
      throw new Error('Address is required for reverse resolution');
    }

    const resolveChainId = _params.chainId ?? _chainId;

    const ensName = await justaname.subnames.reverseResolve({
      address: _params.address,
      chainId: resolveChainId,
    });

    return ensName;
  };

  const query = useQuery({
    ...defaultOptions,
    queryKey: buildReverseResolveKey(params?.address || '', _chainId),
    queryFn: () =>
      reverseResolveInternal({
        address: params?.address as Address,
        chainId: _chainId,
      }),
    enabled: Boolean(params?.address) && Boolean(_enabled),
  });

  const reverseResolve = async (
    params: ReverseResolveParams,
    force = false
  ): Promise<string | null> => {
    const _address = params.address;
    if (!_address) {
      throw new Error('Address is required for reverse resolution');
    }

    const _resolveChainId = params.chainId || _chainId;

    if (!force) {
      const cachedName = queryClient.getQueryData(
        buildReverseResolveKey(_address, _resolveChainId)
      ) as string | null;
      if (cachedName !== undefined) {
        return cachedName;
      }
    }

    const ensName = await reverseResolveInternal({
      address: _address,
      chainId: _resolveChainId,
    });

    queryClient.setQueryData(
      buildReverseResolveKey(_address, _resolveChainId),
      ensName
    );

    return ensName;
  };

  return {
    ensName: query.data,
    reverseResolve,
    isReverseResolvePending: query.isPending,
    isReverseResolveFetching: query.isFetching,
    isReverseResolveLoading: query.isLoading,
    refetchReverseResolve: query.refetch,
  };
};