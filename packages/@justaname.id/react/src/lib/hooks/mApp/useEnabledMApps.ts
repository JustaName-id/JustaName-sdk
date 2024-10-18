import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useRecords } from '../records';
import { useEffect, useMemo } from 'react';

export const buildEnabledMAppsKey = (
  ens: string,
  chainId: ChainId | undefined
) => ['ENABLED_MAPPS', ens, chainId];

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

export const useEnabledMApps = (
  params: UseEnabledMAppsParams
): UseEnabledMAppsResult => {
  const { justaname, chainId } = useJustaName();
  const _chainId = useMemo(
    () => params.chainId || chainId,
    [params.chainId, chainId]
  );
  const { records } = useRecords({
    ens: params.ens,
    chainId: _chainId,
  });

  const query = useQuery({
    queryKey: buildEnabledMAppsKey(params.ens, _chainId),
    queryFn: async () => {
      if (!records) {
        return;
      }
      if (!records.isJAN) {
        return false;
      }
      const mAppField = records.records.texts.find(
        (text) => text.key === 'mApps'
      );
      return mAppField ? JSON.parse(mAppField.value).mApps : [];
    },
    enabled:
      Boolean(params.ens) &&
      Boolean(justaname) &&
      Boolean(params.ens.length > 0) &&
      Boolean(_chainId) &&
      Boolean(records),
  });

  useEffect(() => {
    if (records) query.refetch();
  }, [records]);

  return {
    enabledMApps: query.data,
    refetchEnabledMApps: query.refetch,
    isMAppEnabledPending: query.isPending,
  };
};
