import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useRecords } from '../records';
import { useMemo } from 'react';
import { defaultOptions } from '../../query';

export const buildCanEnableMAppsKey = (
  ens: string,
  chainId: ChainId | undefined
) => ['CAN_ENABLE_MAPPS', ens, chainId];

export interface UseCanEnableMAppsParams {
  ens: string;
  chainId?: ChainId;
}

export interface UseCanEnableMAppsResult {
  canEnableMApps: boolean | undefined;
  isCanEnableMAppsPending: boolean;
  refetchCanEnableMApps: () => void;
}

export const useCanEnableMApps = (
  params: UseCanEnableMAppsParams
): UseCanEnableMAppsResult => {
  const { chainId } = useJustaName();
  const _chainId = useMemo(
    () => params.chainId || chainId,
    [params.chainId, chainId]
  );
  const { records } = useRecords({
    ens: params.ens,
    chainId: _chainId,
  });
  const query = useQuery({
    ...defaultOptions,
    queryKey: buildCanEnableMAppsKey(params.ens, _chainId),
    queryFn: () => {
      return records?.isJAN;
    },
    enabled: Boolean(params.ens) && Boolean(_chainId) && Boolean(records),
  });

  return {
    canEnableMApps: query.data,
    refetchCanEnableMApps: query.refetch,
    isCanEnableMAppsPending: query.isPending,
  };
};
