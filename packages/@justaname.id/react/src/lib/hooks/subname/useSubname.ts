'use client';

import { useJustaName } from '../../providers';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import {
  ChainId,
  sanitizeRecords,
  SubnameGetBySubnameRoute,
} from '@justaname.id/sdk';
import { Records } from '../../types';
import { defaultOptions } from '../../query';

export const buildSubnameBySubnameKey = (
  subname: string,
  chainId: ChainId | undefined
) => ['SUBNAME_BY_SUBNAME', subname, chainId];

export interface UseSubnameParams
  extends Omit<SubnameGetBySubnameRoute['params'], 'subname'> {
  enabled?: boolean;
  subname?: string;
}

interface UseSubnameResult {
  subname: Records | undefined;
  isSubnamePending: boolean;
  isSubnameFetching: boolean;
  isSubnameLoading: boolean;
  refetchSubname: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Records | undefined, unknown>>;
}

export const useSubname = (params: UseSubnameParams): UseSubnameResult => {
  const { justaname, chainId } = useJustaName();
  const _chainId = params?.chainId || chainId;
  const _enabled = params?.enabled !== undefined ? params.enabled : true;

  const query = useQuery({
    ...defaultOptions,
    queryKey: buildSubnameBySubnameKey(params?.subname || '', _chainId),
    queryFn: async () => {
      const subname = await justaname.subnames.getSubname({
        subname: params.subname || '',
        chainId: _chainId,
      });

      return {
        ...subname,
        sanitizedRecords: sanitizeRecords(subname),
      };
    },
    enabled: Boolean(justaname) && Boolean(params.subname) && _enabled,
  });

  return {
    subname: query.data,
    isSubnamePending: query.isPending,
    isSubnameFetching: query.isFetching,
    isSubnameLoading: query.isPending || query.isFetching,
    refetchSubname: query.refetch,
  };
};
