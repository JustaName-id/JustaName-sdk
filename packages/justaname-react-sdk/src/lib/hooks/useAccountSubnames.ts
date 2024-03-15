import { useJustaName } from '../providers';
import { useAccount } from 'wagmi';
import { useMounted } from './useMounted';
import { useQuery } from '@tanstack/react-query';


export interface UseConnectedWalletSubnamesOptions {
  ensDomain?: string
}

export const useAccountSubnames = (props?: UseConnectedWalletSubnamesOptions) => {
  const mounted = useMounted()
  const { address} = useAccount()
  const { justaname } = useJustaName()

  const query = useQuery({
    queryKey: ['WALLET_SUBNAMES_BY_ADDRESS', address],
    queryFn: async () => {
      // return await justaname?.subnames.checkSubnameAvailable(address)
    },
    enabled: Boolean(mounted) && Boolean(address) && Boolean(justaname),
  })

  return {
    subnames: query.data,
    isLoading: query.isLoading,
  }
}