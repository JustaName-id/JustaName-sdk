import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useRecords } from '../records';
import { useMemo } from 'react';


export const buildCanEnableMAppsKey = (
  ens: string,
  chainId: ChainId,
) => [
  'CAN_ENABLE_MAPPS',
  ens,
  chainId,
]

export interface UseCanEnableMAppsParams {
  ens: string;
  chainId?: ChainId;
}

export interface UseCanEnableMAppsResult {
  canEnableMApps: boolean | undefined;
  isCanEnableMAppsPending: boolean;
  refetchCanEnableMApps: () => void;
}

export const useCanEnableMApps = (params: UseCanEnableMAppsParams): UseCanEnableMAppsResult => {
  const { chainId} = useJustaName();
  const _chainId = useMemo(() => params.chainId || chainId, [params.chainId, chainId])
  const { records } = useRecords({
    ens: params.ens,
    chainId: _chainId,
  })
  const query = useQuery({
    queryKey: buildCanEnableMAppsKey(params.ens, _chainId),
    queryFn: () => {
      return records?.isJAN;
    },
    enabled: Boolean(params.ens)  && Boolean(_chainId) && Boolean(records),
  })

  return {
    canEnableMApps: query.data,
    refetchCanEnableMApps: query.refetch,
    isCanEnableMAppsPending: query.isPending,
  }
}