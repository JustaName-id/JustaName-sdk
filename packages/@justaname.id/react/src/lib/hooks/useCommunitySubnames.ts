import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { SubnameGetAllByDomainChainIdResponse } from '@justaname.id/sdk';

export const buildCommunitySubnamesKey = (domainName: string | undefined) => [
  'COMMUNITY_SUBNAMES_BY_ADDRESS',
  domainName,
];
export interface UseCommunitySubnamesOptions {
  ensDomain: string;
  isClaimed: boolean;
}

export const useCommunitySubnames = (
  props: UseCommunitySubnamesOptions
): UseInfiniteQueryResult<InfiniteData<SubnameGetAllByDomainChainIdResponse, unknown>, Error> => {
  const { justaname, chainId } = useJustaName();

  return useInfiniteQuery({
    queryKey: buildCommunitySubnamesKey(props.ensDomain),
    queryFn: ({
                pageParam: { page, limit },
              }) => {
      return justaname?.subnames.getCommunitySubnamesByDomain({
        ensDomain: props.ensDomain,
        isClaimed: props.isClaimed,
        chainId: chainId,
        page,
        limit,
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
    enabled: Boolean(props.ensDomain) && Boolean(justaname),
  });
};
