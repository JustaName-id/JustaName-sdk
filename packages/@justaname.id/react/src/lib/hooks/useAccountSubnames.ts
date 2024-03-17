import { useJustaName } from '../providers';
import { useAccount } from 'wagmi';
import { useMounted } from './useMounted';
import { useQuery, useQueryClient } from '@tanstack/react-query';


export const buildAccountSubnamesKey = (address: string | undefined) => ['WALLET_SUBNAMES_BY_ADDRESS', address]
export interface UseConnectedWalletSubnamesOptions {
  ensDomain?: string
}

export const useAccountSubnames = (props:UseConnectedWalletSubnamesOptions = {}) => {
  const mounted = useMounted()
  const queryClient = useQueryClient()
  const { address} = useAccount()
  const { justaname, chainId } = useJustaName()

  const query = useQuery({
    queryKey: buildAccountSubnamesKey(address),
    queryFn: async () => {
      const subnames =  await justaname?.subnames.getAllByAddress({
        address: address as string,
        isClaimed: true,
        coinType: 60,
        chainId: chainId
      })

      subnames?.forEach(subname => {
        queryClient.setQueryData(buildAccountSubnamesKey(subname.subname), subname)
      })

      if(props.ensDomain){
        return subnames?.filter(subname => subname.subname.endsWith(`.${props.ensDomain}`))
      }

      return subnames
    },
    enabled: Boolean(mounted) && Boolean(address) && Boolean(justaname),
  })

  return {
    subnames: query.data ?? [],
    isLoading: query.isLoading,
    refetchSubnames: query.refetch,
  }
}