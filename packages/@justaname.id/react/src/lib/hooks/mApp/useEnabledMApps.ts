import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useRecords } from '../records';
import { useEffect } from 'react';


export const buildEnabledMAppsKey = (
  ens: string,
  chainId: ChainId,
  providerUrl: string
) => [
  'ENABLED_MAPPS',
  ens,
  chainId,
  providerUrl
]

export interface UseEnabledMAppsParams {
  ens: string;
  chainId?: ChainId;
  providerUrl?: string;
}

export interface UseEnabledMAppsResult {
  enabledMApps: string[] | undefined;
  refetchEnabledMApps: () => void;
  isMAppEnabledPending: boolean;
}

export const useEnabledMApps = (params: UseEnabledMAppsParams): UseEnabledMAppsResult => {
  const { justaname, chainId, providerUrl} = useJustaName();
  const currentChainId = params.chainId || chainId;
  const currentProviderUrl = params.providerUrl || providerUrl;
  const { records } = useRecords({
    fullName: params.ens,
    chainId: currentChainId,
    providerUrl: currentProviderUrl
  })

  const query = useQuery({
    queryKey: buildEnabledMAppsKey(params.ens, currentChainId,currentProviderUrl),
    queryFn: async () => {
      if (!records) {
        return false;
      }
      if (!records.isJAN) {
        return false;
      }
      const mAppField = records.texts.find((text)=>text.key === 'mApps')
      return mAppField ? JSON.parse(mAppField.value).mApps : [];
    },
    enabled: Boolean(params.ens) && Boolean(justaname) && params.ens.length > 0 && Boolean(currentChainId) && Boolean(records),
  })

  useEffect(() => {
    query.refetch()
  }, [records])

  return {
    enabledMApps: query.data,
    refetchEnabledMApps: query.refetch,
    isMAppEnabledPending: query.isLoading,
  }
}