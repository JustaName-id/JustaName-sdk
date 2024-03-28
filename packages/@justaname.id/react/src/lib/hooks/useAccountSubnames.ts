import { useJustaName } from '../providers';
import { useAccount } from 'wagmi';
import { useMounted } from './useMounted';
import { QueryObserverResult, RefetchOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubnameGetAllByAddressResponse } from '@justaname.id/sdk'

/**
 * Constructs a unique cache key for storing and retrieving subnames data associated with a wallet address.
 *
 * @param {string | undefined} address - The Ethereum address of the connected wallet.
 * @returns {Array} A unique cache key array for react-query.
 */
export const buildAccountSubnamesKey = (address: string | undefined) => ['WALLET_SUBNAMES_BY_ADDRESS', address]


/**
 * Options for the `useAccountSubnames` hook, allowing customization of the query.
 *
 * @typedef UseConnectedWalletSubnamesOptions
 * @type {object}
 * @property {string} [ensDomain] - An optional ENS domain to filter the subnames by.
 */
export interface UseConnectedWalletSubnamesOptions {
  ensDomain?: string
}

/**
 * Type definition for the list of subnames returned by the JustaName service.
 *
 * @typedef SubnameType
 * @type {SubnameGetAllByAddressResponse[]}
 */
type SubnameType = SubnameGetAllByAddressResponse[];

/**
 * The shape of the object returned by the `useAccountSubnames` hook.
 *
 * @typedef UseAccountSubnamesResult
 * @type {object}
 * @property {SubnameType} subnames - The list of subnames associated with the account.
 * @property {boolean} isLoading - Indicates if the query is currently loading.
 * @property {function} refetchSubnames - Function to manually refetch the subnames data.
 */
interface UseAccountSubnamesResult {
  subnames: SubnameType;
  isLoading: boolean;
  refetchSubnames: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<SubnameType | undefined, unknown>>;
}

/**
 * Custom hook to fetch subnames associated with the connected wallet's address.
 * 
 * @param {UseConnectedWalletSubnamesOptions} props - Optional configurations for subname retrieval.
 * @returns {UseAccountSubnamesResult} The result object containing subnames data, loading state, and a refetch function.
 */
export const useAccountSubnames = (props:UseConnectedWalletSubnamesOptions = {}): UseAccountSubnamesResult => {
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

      subnames?.forEach((subname: SubnameGetAllByAddressResponse) => {
        queryClient.setQueryData(buildAccountSubnamesKey(subname.subname), subname)
      })

      if(props.ensDomain){
        return subnames?.filter((subname: SubnameGetAllByAddressResponse) => subname.subname.endsWith(`.${props.ensDomain}`))
      }

      return subnames
    },
    enabled: Boolean(mounted) && Boolean(address) && Boolean(justaname),
  })

  return {
    subnames: query.data ?? [],
    isLoading: query.isLoading,
    refetchSubnames: query.refetch
  }
}