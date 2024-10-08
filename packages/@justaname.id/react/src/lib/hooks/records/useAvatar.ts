import { ChainId } from '@justaname.id/sdk';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useEnsPublicClient } from '../client/useEnsPublicClient';
import { useMemo } from 'react';

export const buildEnsAvatarKey = (
  ens: string | undefined,
  chainId: ChainId
) => [
  'ENS_AVATAR',
  ens,
  chainId
]

export interface UseEnsAvatarParams {
  ens: string | undefined;
  chainId?: ChainId
}

export interface UseEnsAvatarResult {
  avatar?: string;
  getEnsAvatar: (name: string, forceUpdate?: boolean) => Promise<string | undefined>;
  isLoading: boolean;
}

export const useEnsAvatar = (params?: UseEnsAvatarParams ): UseEnsAvatarResult => {
  const { chainId} = useJustaName();
  const _chainId = useMemo(() => params?.chainId || chainId, [params?.chainId, chainId])

  const queryClient = useQueryClient();
  const { ensClient } = useEnsPublicClient({
    chainId: _chainId
  })

  const getEnsAvatar = async (name: string | undefined, forceUpdate = false): Promise<string> => {
    if (!name) {
      return ''
    }
    const key = buildEnsAvatarKey(name, _chainId)
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
    queryKey: buildEnsAvatarKey(params?.ens, _chainId),
    queryFn: () => getEnsAvatar(params?.ens),
    enabled: Boolean(params?.ens),
  })

  return {
    avatar: query.data === null ? undefined : query.data,
    getEnsAvatar,
    isLoading: query.isLoading,
  }
}
