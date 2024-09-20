import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';


export const buildIsMAppEnabledKey = (
  subname: string,
  mApp: string,
  chainId: ChainId
) => [
  'IS_EBDC_ENABLED',
  subname,
  mApp,
  chainId
]

export interface UseIsMAppEnabledParams {
  subname: string;
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
    queryKey: buildIsMAppEnabledKey(params.subname, params.mApp,currentChainId),
    queryFn: async () => {
      return await justaname?.mApps.checkIfMAppIsEnabled({
        subname: params.subname,
        mApp: params.mApp,
        chainId: currentChainId
      })
    },
    enabled: Boolean(params.subname) && Boolean(justaname) && params.subname.length > 0 && params.mApp.length > 0
  })

  return {
    isMAppEnabled: query.data,
    refetchIsMAppEnabled: query.refetch,
    isMAppEnabledPending: query.isPending
  }
}