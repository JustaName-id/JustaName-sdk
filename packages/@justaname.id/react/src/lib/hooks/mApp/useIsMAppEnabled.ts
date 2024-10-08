import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useRecords } from '../records';
import { useEffect, useMemo } from 'react';


export const buildIsMAppEnabledKey = (
  ens: string,
  mApp: string,
  chainId: ChainId,
) => [
  'IS_MAPP_ENABLED',
  ens,
  mApp,
  chainId,
]

export interface UseIsMAppEnabledParams {
  ens: string;
  mApp: string;
  chainId?: ChainId;
}

export interface UseIsMAppEnabledResult {
  isMAppEnabled: boolean | undefined;
  isMAppEnabledPending: boolean;
  refetchIsMAppEnabled: () => void;
}

export const useIsMAppEnabled = (params: UseIsMAppEnabledParams): UseIsMAppEnabledResult => {
  const { justaname, chainId} = useJustaName();
  const _chainId = useMemo(() => params.chainId || chainId, [params.chainId, chainId])
  const { records } = useRecords({
    ens: params.ens,
    chainId: _chainId,
  })

  const query = useQuery({
    queryKey: buildIsMAppEnabledKey(params.ens, params.mApp,_chainId),
    queryFn: async () => {
      if (!records) {
        return false;
      }
      if (!records.isJAN) {
        return false;
      }
      const mAppField = records.records.texts.find((text)=>text.key === 'mApps');
      if (!mAppField) {
        return false;
      }
      const mAppFieldValue = JSON.parse(mAppField.value);
      if (!mAppFieldValue) {
        return false;
      }
      return mAppFieldValue.mApps.includes(params.mApp);
    },
    enabled: Boolean(params.ens) && Boolean(justaname) && params.ens.length > 0 && params.mApp.length > 0 && Boolean(_chainId) && Boolean(records),
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