"use client";

import { useJustaName } from '../providers';
import { useAccount } from 'wagmi';
import { useMounted } from './useMounted';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ChainId, SubnameGetAllByAddressResponse } from '@justaname.id/sdk';
import { buildSubnameBySubnameKey } from './useSubname';

/**
 * Constructs a unique cache key for storing and retrieving subnames data associated with a wallet address.
 *
 * @param {string | undefined} address - The Ethereum address of the connected wallet.
 * @param chainId
 * @param ensDomain
 * @returns {Array} A unique cache key array for react-query.
 */
export const buildAccountSubnamesKey = (
  address: string | undefined,
  chainId: ChainId,
  ensDomain?: string
): Array<any> => [
  'WALLET_SUBNAMES_BY_ADDRESS', address, chainId, ensDomain]

/**
 * Options for the `useAccountSubnames` hook, allowing customization of the query.
 *
 * @typedef UseConnectedWalletSubnamesOptions
 * @type {object}
 * @property {string} [ensDomain] - An optional ENS domain to filter the subnames by.
 */
export interface UseConnectedWalletSubnamesOptions {
  ensDomain?: string;
  chainId?: ChainId;
}

/**
 * Type definition for the list of subnames returned by the JustaName service.
 *
 * @typedef SubnamesType
 * @type {SubnameGetAllByAddressResponse[]}
 */
export type SubnamesType = SubnameGetAllByAddressResponse[];

/**
 * The shape of the object returned by the `useAccountSubnames` hook.
 *
 * @typedef UseAccountSubnamesResult
 * @type {object}
 * @property {SubnamesType} accountSubnames - The list of subnames associated with the account.
 * @property {boolean} isAccountSubnamesPending - Indicates if the query is currently loading.
 * @property {function} refetchAccountSubnames - Function to manually refetch the subnames data.
 */
interface UseAccountSubnamesResult {
  accountSubnames: SubnamesType;
  isAccountSubnamesPending: boolean;
  refetchAccountSubnames: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SubnamesType | undefined, unknown>>;
}

/**
 * Custom hook to fetch subnames associated with the connected wallet's address.
 *
 * @param {UseConnectedWalletSubnamesOptions} props - Optional configurations for subname retrieval.
 * @returns {UseAccountSubnamesResult} The result object containing subnames data, loading state, and a refetch function.
 */
export const useAccountSubnames = (
  props: UseConnectedWalletSubnamesOptions = {}
): UseAccountSubnamesResult => {
  const mounted = useMounted();
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { justaname, chainId } = useJustaName();

  const query = useQuery({
    queryKey: buildAccountSubnamesKey(address, props?.chainId ? props?.chainId : chainId, props.ensDomain),
    queryFn: async () => {
      const subnames = await justaname?.subnames.getAllByAddress({
        address: address as string,
        isClaimed: true,
        coinType: 60,
        chainId: props?.chainId ? props?.chainId : chainId,
      });

      subnames?.forEach((subname: SubnameGetAllByAddressResponse) => {
        queryClient.setQueryData(
          buildSubnameBySubnameKey(subname.subname, props?.chainId ? props?.chainId : chainId),
          subname
        );
      });

      if (props.ensDomain) {
        return subnames?.filter((subname: SubnameGetAllByAddressResponse) =>
          subname.subname.endsWith(`.${props.ensDomain}`)
        );
      }

      return subnames;
    },
    enabled: Boolean(mounted) && Boolean(address) && Boolean(justaname),
  });

  return {
    accountSubnames: query.data ?? [],
    isAccountSubnamesPending: query.isPending,
    refetchAccountSubnames: query.refetch,
  };
};
