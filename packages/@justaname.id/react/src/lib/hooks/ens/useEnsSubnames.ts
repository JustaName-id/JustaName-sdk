import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId, Pagination, sanitizeRecords } from '@justaname.id/sdk';
import { Records } from '../../types';
import { defaultOptions } from '../../query';

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
}

export const useEnsSubnames = (
  props: UseEnsSubnamesParams
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

  return useInfiniteQuery({
    ...defaultOptions,
    queryKey: buildEnsSubnamesKey(
      props.ensDomain,
      props.isClaimed,
      props.chainId || chainId,
      props.page ?? 1,
      props.limit ?? 20
    ),
    queryFn: async ({ pageParam: { page, limit } }) => {
      const subnames = await justaname?.subnames.getSubnamesByEnsDomain({
        ensDomain: props.ensDomain,
        isClaimed: props.isClaimed,
        chainId: props?.chainId ? props?.chainId : chainId,
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
      page: props.page ?? 1,
      limit: props.limit ?? 20,
    },
    getNextPageParam: (p) => {
      if (p.pagination.hasNextPage) {
        return {
          page: p.pagination.nextPage ?? props.page ?? 1,
          limit: props.limit ?? 20,
        };
      }

      return undefined;
    },
    getPreviousPageParam: (p) => {
      if (p.pagination.hasPrevPage) {
        return {
          page: p.pagination.prevPage ?? props.page ?? 1,
          limit: props.limit ?? 20,
        };
      }
      return undefined;
    },
    enabled: Boolean(props.ensDomain) && Boolean(justaname),
  });
};
