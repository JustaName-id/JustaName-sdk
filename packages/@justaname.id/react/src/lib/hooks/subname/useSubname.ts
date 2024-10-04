"use client";

import { useJustaName } from '../../providers';
import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import { ChainId, SubnameGetBySubnameParams, SubnameGetBySubnameResponse } from '@justaname.id/sdk';


export const buildSubnameBySubnameKey = (
  subname: string,
  chainId: ChainId
) => ['SUBNAME_BY_SUBNAME', subname, chainId]

export type UseSubnameParams = SubnameGetBySubnameParams

interface UseSubnameResult {
  subname: SubnameGetBySubnameResponse | undefined;
  isSubnamePending: boolean;
  isSubnameFetching: boolean;
  isSubnameLoading: boolean;
  refetchSubname: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<SubnameGetBySubnameResponse | undefined, unknown>>;
}

export const useSubname = (params: UseSubnameParams) : UseSubnameResult => {
  const { justaname, chainId } = useJustaName()
  const _chainId = params?.chainId || chainId

  const query = useQuery({
    queryKey: buildSubnameBySubnameKey(params.subname, _chainId),
    queryFn: () => justaname?.subnames.getBySubname({
      subname: params.subname,
      chainId: _chainId
    }),
    enabled:  Boolean(justaname) && Boolean(params.subname),
  })

  return {
    subname: query.data,
    isSubnamePending: query.isPending,
    isSubnameFetching: query.isFetching,
    isSubnameLoading: query.isPending || query.isFetching,
    refetchSubname: query.refetch,
  }
}