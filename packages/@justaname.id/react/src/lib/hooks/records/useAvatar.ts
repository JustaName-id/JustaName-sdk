import { ChainId } from '@justaname.id/sdk';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useEnsPublicClient } from '../client/useEnsPublicClient';

export const buildEnsAvatarKey = (
  ens: string,
  chainId: ChainId
) => [
  'ENS_AVATAR',
  ens,
  chainId
]

export interface UseEnsAvatarParams {
  ens?: string;
  chainId?: ChainId
  providerUrl?: string
}

export interface UseEnsAvatarResult {
  avatar?: string;
  getEnsAvatar: (name: string, forceUpdate?: boolean) => Promise<string | undefined>;
  isLoading: boolean;
}

export const useEnsAvatar = (params: UseEnsAvatarParams = {}): UseEnsAvatarResult => {
  const { chainId , providerUrl} = useJustaName();
  const currentChainId = params.chainId || chainId;
  const currentProviderUrl = params.providerUrl || providerUrl;
  const queryClient = useQueryClient();
  const { ensClient } = useEnsPublicClient({
    providerUrl: currentProviderUrl,
    chainId: currentChainId
  })

  const getEnsAvatar = async (name: string, forceUpdate = false): Promise<string> => {
    const key = buildEnsAvatarKey(name, currentChainId)
    const cachedData = queryClient.getQueryData(key)
    if (!forceUpdate && cachedData) {
      return cachedData as string
    }
    const avatar = await ensClient?.getEnsAvatar({
      name,
    });
    queryClient.setQueryData(key, avatar)
    return avatar ? avatar : ''
  }

  const query = useQuery({
    queryKey: buildEnsAvatarKey(params.ens || '', currentChainId),
    queryFn: () => getEnsAvatar(params.ens || ''),
    enabled: Boolean(params.ens),
  })

  return {
    avatar: query.data === null ? undefined : query.data,
    getEnsAvatar,
    isLoading: query.isLoading,
  }
}
