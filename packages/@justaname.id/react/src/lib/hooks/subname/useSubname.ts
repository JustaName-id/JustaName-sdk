"use client";

import { useJustaName } from '../../providers';
import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import { ChainId, SubnameGetBySubnameResponse } from '@justaname.id/sdk';

/**
 * Generates a unique cache key for storing and retrieving subname details.
 *
 * @param {string} subname - The subname to generate a cache key for.
 * @returns {Array} A unique cache key array for react-query.
 */
export const buildSubnameBySubnameKey = (
  subname: string,
  chainId: ChainId
) => ['SUBNAME_BY_SUBNAME', subname, chainId]

/**
 * Interface defining the options required by the useSubname hook.
 *
 * @typedef UseSubnameOptions
 * @type {object}
 * @property {string} subname - The subname to query.
 */
export interface UseSubnameOptions {
  subname: string;
  chainId?: ChainId;
}

/**
 * The structure of the object returned by the useSubname hook.
 *
 * @typedef UseSubnameResult
 * @type {object}
 * @property {SubnameGetBySubnameResponse | undefined} subname - The fetched subname details.
 * @property {boolean} isSubnamePending - Indicates if the query is currently loading.
 * @property {function} refetchSubname - Function to manually refetch the subname data.
 */
interface UseSubnameResult {
  subname: SubnameGetBySubnameResponse | undefined;
  isSubnamePending: boolean;
  refetchSubname: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<SubnameGetBySubnameResponse | undefined, unknown>>;
}

/**
 * Custom hook to query for details about a specific subname using the JustaName service.
 *
 * @param {UseSubnameOptions} props - The options for fetching the subname.
 * @returns {UseSubnameResult} An object containing the subname data, loading state, and a refetch function.
 */

export const useSubname = (props: UseSubnameOptions) : UseSubnameResult => {
  const { justaname, chainId } = useJustaName()

  const query = useQuery({
    queryKey: buildSubnameBySubnameKey(props.subname, props?.chainId ? props?.chainId : chainId),
    queryFn: () => justaname?.subnames.getBySubname({
       subname: props.subname,
        chainId: chainId}),
    enabled:  Boolean(justaname) && Boolean(props.subname),
  })

  return {
    subname: query.data,
    isSubnamePending: query.isPending,
    refetchSubname: query.refetch,
  }
}