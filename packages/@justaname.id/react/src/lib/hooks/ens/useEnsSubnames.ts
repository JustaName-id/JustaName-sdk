import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId, Pagination, sanitizeRecords } from '@justaname.id/sdk';
import { Records } from '../../types';
import { defaultOptions } from '../../query';
import { useRecords } from '../records';
import { useOffchainResolvers } from '../offchainResolver';
import { useMemo } from 'react';

export const buildEnsSubnamesKey = (
  domainName: string | undefined,
  isClaimed: boolean,
  chainId: ChainId | undefined,
  page: number,
  limit: number
) => ['ENS_SUBNAMES', domainName, isClaimed, chainId, page, limit];

export interface UseEnsSubnamesParams {
  ensDomain: string;
  isClaimed: boolean;
  chainId?: ChainId;
  page?: number;
  limit?: number;
  initialLimit?: number;
  enabled?: boolean;
}

export const useEnsSubnames = (
  params: UseEnsSubnamesParams
): UseInfiniteQueryResult<
  InfiniteData<
    {
      data: Records[];
      pagination: Pagination;
    },
    unknown
  >,
  Error
> => {
  const { justaname, chainId } = useJustaName();
  const _enabled = params.enabled !== undefined ? params.enabled : true;
  const _chainId = params.chainId || chainId;
  const { records } = useRecords({
    ens: params.ensDomain,
    chainId: _chainId,
  });
  const { offchainResolvers } = useOffchainResolvers();
  const isJustaNameResolver = useMemo(() => {
    if (!offchainResolvers) return false;
    if (!records) return false;
    const offchainResolver = offchainResolvers.offchainResolvers.find(
      (resolver) => resolver.chainId === _chainId
    );
    if (!offchainResolver) return false;

    return records.records.resolverAddress === offchainResolver.resolverAddress;
  }, [offchainResolvers, records, _chainId]);

  return useInfiniteQuery({
    ...defaultOptions,
    queryKey: buildEnsSubnamesKey(
      params.ensDomain,
      params.isClaimed,
      params.chainId || chainId,
      params.page ?? 1,
      params.limit ?? 20
    ),
    queryFn: async ({ pageParam: { page, limit } }) => {
      const subnames = await justaname?.subnames.getSubnamesByEnsDomain({
        ensDomain: params.ensDomain,
        isClaimed: params.isClaimed,
        chainId: params?.chainId ? params?.chainId : chainId,
        page,
        limit,
      });

      return {
        data: subnames.data.map((subname) => ({
          ...subname,
          sanitizedRecords: sanitizeRecords(subname),
        })),
        pagination: subnames.pagination,
      };
    },
    initialPageParam: {
      page: params.page ?? 1,
      limit: params.initialLimit || params.limit || 20,
    },
    getNextPageParam: (p) => {
      if (p.pagination.hasNextPage) {
        return {
          page: p.pagination.nextPage ?? params.page ?? 1,
          limit: params.limit ?? 20,
        };
      }

      return undefined;
    },
    getPreviousPageParam: (p) => {
      if (p.pagination.hasPrevPage) {
        return {
          page: p.pagination.prevPage ?? params.page ?? 1,
          limit: params.limit ?? 20,
        };
      }
      return undefined;
    },
    enabled:
      Boolean(params.ensDomain) &&
      Boolean(justaname) &&
      Boolean(_enabled) &&
      Boolean(records) &&
      Boolean(offchainResolvers) &&
      Boolean(isJustaNameResolver),
  });
};
