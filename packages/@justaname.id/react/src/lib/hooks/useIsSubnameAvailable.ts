"use client";

import { useJustaName } from '../providers';
import { useQuery } from '@tanstack/react-query';
import { ChainId, IsSubnameAvailableResponse } from '@justaname.id/sdk';

export const buildIsSubnameAvailableKey = (
  username: string,
  ensDomain: string,
  chainId: ChainId
) => ['IS_SUBNAME_AVAILABLE', username, ensDomain, chainId]

/**
 * Interface defining the parameters required to check the availability of a subname.
 *
 * @typedef UseIsSubnameAvailableOptions
 * @type {object}
 * @property {string} username - The desired username to check within the ENS domain.
 * @property {string} ensDomain - The ENS domain under which the subname will be checked.
 */
export interface UseIsSubnameAvailableOptions {
  username: string;
  ensDomain?: string;
  chainId?: ChainId;
}

export interface UseIsSubnameAvailableResult {
  isSubnameAvailable: IsSubnameAvailableResponse | undefined;
  isSubnameAvailablePending: boolean;
}

/**
 * Custom hook to check if a subname is available for registration under a given ENS domain. 
 *
 * @param {UseIsSubnameAvailableOptions} props - The options including the username and ENS domain to check.
 * @returns {UseIsSubnameAvailableResult} An object containing the availability status of the subname (`isAvailable`)
 * and the loading state of the query (`isPending`).
 */
export const useIsSubnameAvailable = (props: UseIsSubnameAvailableOptions): UseIsSubnameAvailableResult => {
  const { justaname, chainId, ensDomain: defaultEnsDomain } = useJustaName();
  const { username, ensDomain } = props;
  const ensDomainToUse = ensDomain ? ensDomain : defaultEnsDomain;
  const chainIdToUse = props?.chainId ? props?.chainId : chainId;

  const query = useQuery({
    queryKey: buildIsSubnameAvailableKey(username, ensDomainToUse, chainIdToUse),
    queryFn: () => justaname?.subnames.checkSubnameAvailable({
        subname: username + '.' + ensDomainToUse,
        chainId: chainIdToUse,
      }),
    enabled: Boolean(username) && Boolean(justaname) && Boolean(chainId),
  })

  return {
    isSubnameAvailable: query.data,
    isSubnameAvailablePending: query.isPending,
  }
}