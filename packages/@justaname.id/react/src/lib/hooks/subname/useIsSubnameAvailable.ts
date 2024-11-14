'use client';

import { useJustaName } from '../../providers';
import { useQuery } from '@tanstack/react-query';
import { ChainId, IsSubnameAvailableRoute } from '@justaname.id/sdk';
import { defaultOptions } from '../../query';

export const buildIsSubnameAvailableKey = (
  username: string,
  ensDomain: string | undefined,
  chainId: ChainId | undefined
) => ['IS_SUBNAME_AVAILABLE', username, ensDomain, chainId];

export interface UseIsSubnameAvailableParams {
  username: string;
  ensDomain?: string;
  chainId?: ChainId;
  enabled?: boolean;
}

export interface UseIsSubnameAvailableResult {
  isSubnameAvailable: IsSubnameAvailableRoute['response'] | undefined;
  isSubnameAvailablePending: boolean;
  isSubnameAvailableFetching: boolean;
  isSubnameAvailableLoading: boolean;
}

export const useIsSubnameAvailable = (
  params: UseIsSubnameAvailableParams
): UseIsSubnameAvailableResult => {
  const { justaname, chainId, ensDomains } = useJustaName();
  const _enabled = params?.enabled !== undefined ? params.enabled : true;

  const _username = params.username;
  const _ensDomain =
    params.ensDomain ||
    ensDomains.find((ensDomain) => ensDomain.chainId === chainId)?.ensDomain;
  const _chainId = params.chainId ? params.chainId : chainId;

  const query = useQuery({
    ...defaultOptions,
    queryKey: buildIsSubnameAvailableKey(_username, _ensDomain, _chainId),
    queryFn: () =>
      justaname?.subnames.isSubnameAvailable({
        subname: _username + '.' + _ensDomain,
        chainId: _chainId,
      }),
    enabled:
      Boolean(_username) &&
      Boolean(_chainId) &&
      Boolean(_ensDomain) &&
      Boolean(_enabled),
  });

  return {
    isSubnameAvailable: query.data,
    isSubnameAvailablePending: query.isPending,
    isSubnameAvailableFetching: query.isFetching,
    isSubnameAvailableLoading: query.isPending || query.isFetching,
  };
};
