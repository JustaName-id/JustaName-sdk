import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { ChainId, SubnameGetAllByDomainChainIdResponse } from '@justaname.id/sdk';

export const buildCommunitySubnamesKey = (
  domainName: string | undefined,
  isClaimed: boolean,
  chainId: ChainId
) => [
  'COMMUNITY_SUBNAMES_BY_ADDRESS',
  domainName,
  isClaimed,
  chainId,
];
export interface UseCommunitySubnamesOptions {
  ensDomain: string;
  isClaimed: boolean;
  chainId?: ChainId;
}

export const useCommunitySubnames = (
  props: UseCommunitySubnamesOptions
): UseInfiniteQueryResult<InfiniteData<SubnameGetAllByDomainChainIdResponse, unknown>, Error> => {
  const { justaname, chainId } = useJustaName();

  return useInfiniteQuery({
    queryKey: buildCommunitySubnamesKey(props.ensDomain, props.isClaimed, props.chainId || chainId),
    queryFn: ({
                pageParam: { page, limit },
              }) => {
      return justaname?.subnames.getCommunitySubnamesByDomain({
        ensDomain: props.ensDomain,
        isClaimed: props.isClaimed,
        chainId: props?.chainId ? props?.chainId : chainId,
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
