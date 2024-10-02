import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useRecords } from '../records';
import { useEffect } from 'react';


export const buildIsMAppEnabledKey = (
  ens: string,
  mApp: string,
  chainId: ChainId,
  providerUrl: string
) => [
  'IS_MAPP_ENABLED',
  ens,
  mApp,
  chainId,
  providerUrl
]

export interface UseIsMAppEnabledParams {
  ens: string;
  mApp: string;
  chainId?: ChainId;
  providerUrl?: string;
}

export interface UseIsMAppEnabledResult {
  isMAppEnabled: boolean | undefined;
  isMAppEnabledPending: boolean;
  refetchIsMAppEnabled: () => void;
}

export const useIsMAppEnabled = (params: UseIsMAppEnabledParams): UseIsMAppEnabledResult => {
  const { justaname, chainId, providerUrl} = useJustaName();
  const currentChainId = params.chainId || chainId;
  const currentProviderUrl = params.providerUrl || providerUrl;
  const { records } = useRecords({
    fullName: params.ens,
    chainId: currentChainId,
    providerUrl: currentProviderUrl
  })

  const query = useQuery({
    queryKey: buildIsMAppEnabledKey(params.ens, params.mApp,currentChainId,currentProviderUrl),
    queryFn: async () => {
      if (!records) {
        return false;
      }
      if (!records.isJAN) {
        return false;
      }
      const mAppField = records.texts.find((text)=>text.key === 'mApps');
      if (!mAppField) {
        return false;
      }
      const mAppFieldValue = JSON.parse(mAppField.value);
      if (!mAppFieldValue) {
        return false;
      }
      return mAppFieldValue.mApps.includes(params.mApp);
    },
    enabled: Boolean(params.ens) && Boolean(justaname) && params.ens.length > 0 && params.mApp.length > 0 && Boolean(currentChainId) && Boolean(records),
  })

  useEffect(() => {
    query.refetch()
  }, [records])

  return {
    isMAppEnabled: query.data,
    refetchIsMAppEnabled: query.refetch,
    isMAppEnabledPending: query.isPending
  }
}