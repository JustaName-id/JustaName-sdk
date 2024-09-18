"use client";

import { useJustaName } from '../../providers';
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
export const buildAddressSubnamesKey = (
  address: string | undefined,
  chainId: ChainId,
): Array<any> => [
  'WALLET_SUBNAMES_BY_ADDRESS', address, chainId]

/**
 * Options for the `useAddressSubnames` hook, allowing customization of the query.
 *
 * @typedef UseAddressSubnamesOptions
 * @type {object}
 * @property {string} address - The Ethereum address to query for subnames.
 * @property {ChainId} [chainId] - The chain ID to query for subnames on.
 */
export interface UseAddressSubnamesOptions {
  address: string;
  chainId?: ChainId;
}

/**
 * Type definition for the list of subnames returned by the JustaName service.
 *
 * @typedef SubnameType
 * @type {SubnameGetAllByAddressResponse[]}
 */
type SubnameType = SubnameGetAllByAddressResponse[];

/**
 * The shape of the object returned by the `useAddressSubnames` hook.
 *
 * @typedef UseAddressSubnamesResult
 * @type {object}
 * @property {SubnameType} subnames - The list of subnames associated with the account.
 * @property {boolean} isLoading - Indicates if the query is currently loading.
 * @property {function} refetchSubnames - Function to manually refetch the subnames data.
 */
interface UseAddressSubnamesResult {
  subnames: SubnameType;
  isAddressSubnamesPending: boolean;
  refetchSubnames: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SubnameType | undefined, unknown>>;
}

/**
 * Custom hook to fetch subnames associated with a wallet's address.
 *
 * @param {UseAddressSubnamesOptions} props - Optional configurations for subname retrieval.
 * @returns {UseAddressSubnamesResult} The result object containing subnames data, loading state, and a refetch function.
 */
export const useAddressSubnames = (
  props: UseAddressSubnamesOptions
): UseAddressSubnamesResult => {
  const queryClient = useQueryClient();
  const { justaname, chainId } = useJustaName();

  const query = useQuery({
    queryKey: buildAddressSubnamesKey(props.address, props?.chainId ? props?.chainId : chainId),
    queryFn: async () => {
      const subnames = await justaname?.subnames.getAllByAddress({
        address: props.address as string,
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

      return subnames;
    },
    enabled: Boolean(justaname) && Boolean(props.address),
  });

  return {
    subnames: query.data ?? [],
    isAddressSubnamesPending: query.isPending,
    refetchSubnames: query.refetch,
  };
};
