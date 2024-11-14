import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId, Pagination, sanitizeRecords } from '@justaname.id/sdk';
import { Records } from '../../types';
import { defaultOptions } from '../../query';

export const buildAllEnsKey = (
  chainId: ChainId | undefined,
  orderBy: string,
  orderDirection: string
) => ['ALL_ENS', chainId, orderBy, orderDirection];

export interface UseAllEnsParams {
  orderBy?: 'subnameCount' | 'createdAt';
  orderDirection?: 'asc' | 'desc';
  chainId?: ChainId;
  enabled?: boolean;
}

export const useAllEns = (
  params: UseAllEnsParams
): UseInfiniteQueryResult<
  InfiniteData<
    {
      data: {
        ensDomain: string;
        subnameCount: number;
        ensSubname: Records;
      }[];
      pagination: Pagination;
    },
    unknown
  >,
  Error
> => {
  const orderDirection = params.orderDirection || 'desc';
  const _enabled = params?.enabled !== undefined ? params.enabled : true;
  const orderBy = params.orderBy || 'subnameCount';
  const { justaname, chainId: justChainId } = useJustaName();
  const chainId = params.chainId || justChainId;

  return useInfiniteQuery({
    ...defaultOptions,
    queryKey: buildAllEnsKey(chainId, orderBy, orderDirection),
    queryFn: async ({ pageParam: { page, limit } }) => {
      const response =
        await justaname?.subnames.getSubnamesByEnsDomainWithCount({
          chainId,
          page,
          limit,
          orderBy,
          orderDirection,
        });

      return {
        data: response.data.map((subname) => ({
          ...subname,
          ensSubname: {
            ...subname.ensSubname,
            sanitizedRecords: sanitizeRecords(subname.ensSubname),
          },
        })),
        pagination: response.pagination,
      };
    },
    initialPageParam: {
      page: 1,
      limit: 20,
    },
    getNextPageParam: (p) => {
      if (p.pagination.hasNextPage) {
        return {
          page: p.pagination.nextPage ?? 1,
          limit: 20,
        };
      }

      return undefined;
    },
    getPreviousPageParam: (p) => {
      if (p.pagination.hasPrevPage) {
        return {
          page: p.pagination.prevPage ?? 1,
          limit: 20,
        };
      }
      return undefined;
    },
    enabled: Boolean(justaname) && Boolean(_enabled),
  });
};
