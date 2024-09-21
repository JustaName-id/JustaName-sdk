import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';


export const buildCanEnableMAppsKey = (
  ens: string,
  chainId: ChainId
) => [
  'CAN_ENABLE_MAPPS',
  ens,
  chainId
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
  const { justaname, chainId} = useJustaName();
  const currentChainId = params.chainId || chainId;
  const query = useQuery({
    queryKey: buildCanEnableMAppsKey(params.ens, currentChainId),
    queryFn: async () => {
      return await justaname?.mApps.canEnableMApps({
        ens: params.ens,
        chainId: currentChainId
      })
    },
    enabled: Boolean(params.ens) && Boolean(justaname) && Boolean(currentChainId)
  })

  return {
    canEnableMApps: query.data,
    refetchCanEnableMApps: query.refetch,
    isCanEnableMAppsPending: query.isPending
  }
}