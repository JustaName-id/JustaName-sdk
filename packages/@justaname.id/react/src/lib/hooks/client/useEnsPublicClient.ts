import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId } from '@justaname.id/sdk';
import { createPublicClient, http } from 'viem';
import { addEnsContracts } from '@ensdomains/ensjs';
import { mainnet, sepolia } from 'viem/chains';

export const getEnsPublicClient = (providerUrl: string, chainId: ChainId) => {
  return createPublicClient({
    chain: addEnsContracts(chainId === 1 ? mainnet : sepolia),
    transport: http(providerUrl)
  });

}
export const buildEnsPublicClientKey = (
  providerUrl: string,
  chainId: ChainId
) => [
  'CLIENT',
  providerUrl,
  chainId
]

export interface UseEnsPublicClientResult {
  ensClient: ReturnType<typeof getEnsPublicClient> | undefined
  isEnsPublicClientPending: boolean
}

export interface UseEnsPublicClientParams {
  providerUrl?: string
  chainId?: ChainId
}

export const useEnsPublicClient = (props?: UseEnsPublicClientParams): UseEnsPublicClientResult => {
  const { providerUrl, chainId} = useJustaName()
  const currentChainId = props?.chainId || chainId
  const currentProviderUrl = props?.providerUrl || providerUrl

  const query = useQuery({
    queryKey: buildEnsPublicClientKey(currentProviderUrl, currentChainId),
    queryFn: () => getEnsPublicClient(currentProviderUrl, currentChainId)
  })

  return {
    ensClient: query.data,
    isEnsPublicClientPending: query.isPending
  }
}