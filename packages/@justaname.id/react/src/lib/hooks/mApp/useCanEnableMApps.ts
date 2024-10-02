import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useRecords } from '../records';


export const buildCanEnableMAppsKey = (
  ens: string,
  chainId: ChainId,
  providerUrl: string
) => [
  'CAN_ENABLE_MAPPS',
  ens,
  chainId,
  providerUrl
]

export interface UseCanEnableMAppsParams {
  ens: string;
  chainId?: ChainId;
  providerUrl?: string;
}

export interface UseCanEnableMAppsResult {
  canEnableMApps: boolean | undefined;
  isCanEnableMAppsPending: boolean;
  refetchCanEnableMApps: () => void;
}

export const useCanEnableMApps = (params: UseCanEnableMAppsParams): UseCanEnableMAppsResult => {
  const { justaname, chainId, providerUrl} = useJustaName();
  const currentChainId = params.chainId || chainId;
  const currentProviderUrl = params.providerUrl || providerUrl;
  const { records } = useRecords({
    fullName: params.ens,
    chainId: currentChainId,
    providerUrl: currentProviderUrl
  })
  const query = useQuery({
    queryKey: buildCanEnableMAppsKey(params.ens, currentChainId, currentProviderUrl),
    queryFn: () => {
      return records?.isJAN;
    },
    enabled: Boolean(params.ens) && Boolean(justaname) && Boolean(currentChainId) && Boolean(records),
  })

  return {
    canEnableMApps: query.data,
    refetchCanEnableMApps: query.refetch,
    isCanEnableMAppsPending: query.isPending
  }
}