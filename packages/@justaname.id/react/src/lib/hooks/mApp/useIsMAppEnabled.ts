import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';


export const buildIsMAppEnabledKey = (
  ens: string,
  mApp: string,
  chainId: ChainId
) => [
  'IS_MAPP_ENABLED',
  ens,
  mApp,
  chainId
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
  const currentChainId = params.chainId || chainId;
  const query = useQuery({
    queryKey: buildIsMAppEnabledKey(params.ens, params.mApp,currentChainId),
    queryFn: async () => {
      return await justaname?.mApps.checkIfMAppIsEnabled({
        ens: params.ens,
        mApp: params.mApp,
        chainId: currentChainId
      })
    },
    enabled: Boolean(params.ens) && Boolean(justaname) && params.ens.length > 0 && params.mApp.length > 0
  })

  return {
    isMAppEnabled: query.data,
    refetchIsMAppEnabled: query.refetch,
    isMAppEnabledPending: query.isPending
  }
}