import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId } from '@justaname.id/sdk';
import { createPublicClient, http } from 'viem';
import { addEnsContracts } from '@ensdomains/ensjs';
import { mainnet, sepolia } from 'viem/chains';
import { useMemo } from 'react';
import { defaultOptions } from '../../query';

export const getEnsPublicClient = (
  providerUrl: string,
  chainId: ChainId | undefined
) => {
  if (!chainId) {
    throw new Error('Chain ID is required');
  }

  return createPublicClient({
    chain: addEnsContracts(chainId === 1 ? mainnet : sepolia),
    transport: http(providerUrl),
  });
};

export const buildEnsPublicClientKey = (chainId: ChainId | undefined) => [
  'ENS_PUBLIC_CLIENT',
  chainId,
];

export interface UseEnsPublicClientResult {
  ensClient: ReturnType<typeof getEnsPublicClient> | undefined;
  isEnsPublicClientPending: boolean;
}

export interface UseEnsPublicClientParams {
  chainId?: ChainId;
  enabled?: boolean;
}

export const useEnsPublicClient = (
  params?: UseEnsPublicClientParams
): UseEnsPublicClientResult => {
  const { networks, chainId } = useJustaName();
  const _enabled = params?.enabled !== undefined ? params.enabled : true;
  const _chainId = useMemo(
    () => params?.chainId || chainId,
    [params?.chainId, chainId]
  );
  const _network = useMemo(
    () => networks.find((network) => network.chainId === _chainId),
    [networks, _chainId]
  );

  const _providerUrl = useMemo(() => _network?.providerUrl || '', [_network]);

  const query = useQuery({
    ...defaultOptions,
    queryKey: buildEnsPublicClientKey(_chainId),
    queryFn: () => getEnsPublicClient(_providerUrl, _chainId),
    enabled: Boolean(_enabled),
  });

  return {
    ensClient: query.data,
    isEnsPublicClientPending: query.isPending,
  };
};
