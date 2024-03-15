import { useJustaName } from '../providers/JustaNameProvider';
import { useAccount } from 'wagmi';
import { useMounted } from './useMounted';
import { useQuery } from 'wagmi/dist/types/utils/query';


export interface WalletSubnamesContextProps {
  address: string;
}



export const useConnectedWalletSubnames = () => {
  const mounted = useMounted()
  const { address} = useAccount()
  const { justaname } = useJustaName()

  const query = useQuery({
    queryKey: ['getSubnames', address],
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