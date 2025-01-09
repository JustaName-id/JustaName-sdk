import { addEnsContracts } from '@ensdomains/ensjs';
import { primaryName } from '@justaname.id/hybrid-primary-name';
import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { Address, createPublicClient, http } from 'viem';
import { mainnet, sepolia } from 'viem/chains';
import { JustWeb3Context } from '../../providers';

export const buildHybridPrimaryName = (
  address: string,
  chainId: ChainId | undefined
) => ['HYBRID_PRIMARY_NAME', address, chainId];

export interface UseHybridPrimaryNameParams {
  address?: Address;
  chainId?: ChainId;
  enabled?: boolean;
}

export interface UseHybridPrimaryNameResult {
    hybridPrimaryName: string | null | undefined;
  isHybridPrimaryNameLoading: boolean;
  refetchHybridPrimaryName: () => void;
}

export interface GetHybridPrimaryNameParams {
    address: Address | undefined;
    chainId: ChainId;
}

export const useHybridPrimaryName = (
  params?: UseHybridPrimaryNameParams
): UseHybridPrimaryNameResult => {

  const context = useContext(JustWeb3Context);

  const _enabled = params?.enabled !== undefined ? params.enabled : true;

  const getHybridPrimaryNameForAddress = async (
    _params: GetHybridPrimaryNameParams
  ): Promise<string | null> => {

    const chainProviderUrl = context?.config?.networks?.find((network) => network.chainId === _params.chainId)?.providerUrl;

    const client = createPublicClient({
        chain: addEnsContracts( _params.chainId === 1 ? mainnet : sepolia),
        transport: http(chainProviderUrl),
    }).extend(primaryName())

    if (!client) {
      throw new Error('Public client not found');
    }

    if(_params.address) {
    const primaryName = await client.getEnsFromAddress(_params.address);
    return primaryName
    }
    return null
  };

  const query = useQuery({
    queryKey: buildHybridPrimaryName(params?.address || '', params?.chainId),
    queryFn: () =>
      getHybridPrimaryNameForAddress({
        address: params?.address,
        chainId: params?.chainId || 1,
      }),
    enabled:
      Boolean(params?.address) &&
      Boolean(params?.chainId) &&
      _enabled,
  });

  return {
    hybridPrimaryName: query.data,
    isHybridPrimaryNameLoading: query.isLoading,
    refetchHybridPrimaryName: query.refetch,
  };
};
