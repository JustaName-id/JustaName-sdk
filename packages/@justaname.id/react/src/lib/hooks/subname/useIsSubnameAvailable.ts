"use client";

import { useJustaName } from '../../providers';
import { useQuery } from '@tanstack/react-query';
import { ChainId, IsSubnameAvailableResponse } from '@justaname.id/sdk';

export const buildIsSubnameAvailableKey = (
  username: string,
  ensDomain: string | undefined,
  chainId: ChainId
) => ['IS_SUBNAME_AVAILABLE', username, ensDomain, chainId]

export interface UseIsSubnameAvailableParams {
  username: string;
  ensDomain?: string;
  chainId?: ChainId;
}

export interface UseIsSubnameAvailableResult {
  isSubnameAvailable: IsSubnameAvailableResponse | undefined;
  isSubnameAvailablePending: boolean;
  isSubnameAvailableFetching: boolean;
  isSubnameAvailableLoading: boolean;
}

export const useIsSubnameAvailable = (params: UseIsSubnameAvailableParams): UseIsSubnameAvailableResult => {
  const { justaname, chainId, ensDomains } = useJustaName();

  const _username = params.username;
  const _ensDomain = params.ensDomain || ensDomains.find((ensDomain) => ensDomain.chainId === chainId)?.ensDomain;
  const _chainId = params.chainId ? params.chainId : chainId;

  const query = useQuery({
    queryKey: buildIsSubnameAvailableKey(_username, _ensDomain, _chainId),
    queryFn: () => justaname?.subnames.checkSubnameAvailable({
        subname: _username + '.' + _ensDomain,
        chainId: _chainId,
      }),
    enabled: Boolean(_username) && Boolean(_chainId) && Boolean(_ensDomain),
  })

  return {
    isSubnameAvailable: query.data,
    isSubnameAvailablePending: query.isPending,
    isSubnameAvailableFetching: query.isFetching,
    isSubnameAvailableLoading: query.isPending || query.isFetching,
  }
}