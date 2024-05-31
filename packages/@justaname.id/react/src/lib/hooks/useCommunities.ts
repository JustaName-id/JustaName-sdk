import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { ChainId, SubnameGetAllCommunitiesChainIdResponse } from '@justaname.id/sdk';

export const buildCommunitiesKey = (
  chainId: ChainId,
  orderBy: string,
  orderDirection: string,
) => [
  'COMMUNITIES',
  chainId,
  orderBy,
  orderDirection,
];
export interface UseCommunitiesOptions {
  orderBy?: "subnameCount" | "createdAt";
  orderDirection?: "asc" | "desc";
  chainId?: ChainId;
}

export const useCommunities = (
  props: UseCommunitiesOptions
): UseInfiniteQueryResult<InfiniteData<SubnameGetAllCommunitiesChainIdResponse, unknown>, Error> => {
  const orderDirection = props.orderDirection || "desc";
  const orderBy = props.orderBy || "subnameCount";
  const { justaname, chainId: justChainId } = useJustaName();
  const chainId = props.chainId || justChainId;

  return useInfiniteQuery({
    queryKey: buildCommunitiesKey(chainId, orderBy, orderDirection),
    queryFn: ({
                pageParam: { page, limit },
              }) => {
      return justaname?.subnames.getAllCommunities({
        chainId,
        page,
        limit,
        orderBy,
        orderDirection,
      })
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
    enabled: Boolean(justaname),
  });
};
