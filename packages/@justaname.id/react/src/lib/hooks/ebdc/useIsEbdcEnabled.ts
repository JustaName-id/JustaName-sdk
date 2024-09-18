import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';


export const buildIsEbdcEnabledKey = (
  subname: string,
  ebdc: string,
  chainId: ChainId
) => [
  'IS_EBDC_ENABLED',
  subname,
  ebdc,
  chainId
]

export interface UseIsEbdcEnabledParams {
  subname: string;
  ebdc: string;
  chainId?: ChainId;
}

export const useIsEbdcEnabled = (params: UseIsEbdcEnabledParams) => {
  const { justaname, chainId} = useJustaName();
  const currentChainId = params.chainId || chainId;
  const query = useQuery({
    queryKey: buildIsEbdcEnabledKey(params.subname, params.ebdc,currentChainId),
    queryFn: async () => {
      return await justaname?.ebdc.checkIfEbdcIsEnabled({
        subname: params.subname,
        ebdc: params.ebdc,
        chainId: currentChainId
      })
    }
  })

  return {
    isEbdcEnabled: query.data,
    isEbdcEnabledPending: query.isPending
  }
}