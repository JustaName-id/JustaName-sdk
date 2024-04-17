"use client";

import { useJustaName } from '../providers';
import { useQuery } from '@tanstack/react-query';
import { IsSubnameAvailableResponse } from '@justaname.id/sdk';

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
  ensDomain: string;
}

export interface UseIsSubnameAvailableResult {
  isAvailable: IsSubnameAvailableResponse | undefined;
  isLoading: boolean;
}

/**
 * Custom hook to check if a subname is available for registration under a given ENS domain. 
 *
 * @param {UseIsSubnameAvailableOptions} props - The options including the username and ENS domain to check.
 * @returns {UseIsSubnameAvailableResult} An object containing the availability status of the subname (`isAvailable`)
 * and the loading state of the query (`isLoading`).
 */
export const useIsSubnameAvailable = (props: UseIsSubnameAvailableOptions): UseIsSubnameAvailableResult => {
  const { justaname, chainId } = useJustaName();
  const { username, ensDomain } = props;

  const query = useQuery({
    queryKey: ['IS_SUBNAME_AVAILABLE', username],
    queryFn: () => justaname?.subnames.checkSubnameAvailable({
        subname: username + '.' + ensDomain,
        chainId
      }),
    enabled: Boolean(username) && Boolean(justaname) && Boolean(chainId),
  })

  return {
    isAvailable: query.data,
    isLoading: query.isLoading,
  }
}