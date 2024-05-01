import { SubnameGetAllByDomainChainIdResponse } from '@justaname.id/sdk';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import { useJustaName } from '../providers';

export const buildCommunitySubnamesKey = (domainName: string | undefined) => [
  'COMMUNITY_SUBNAMES_BY_ADDRESS',
  domainName,
];
export interface UseCommunitySubnamesOptions {
  ensDomain: string;
  page?: number;
  limit?: number;
  isClaimed?: boolean;
}

interface UseCommunitySubnamesResult {
  communitySubnamesResponse: SubnameGetAllByDomainChainIdResponse;
  isLoading: boolean;
  refetchCommunitySubnames: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<
      SubnameGetAllByDomainChainIdResponse | undefined,
      unknown
    >
  >;
}
export const useCommunitySubnames = (
  props: UseCommunitySubnamesOptions
): UseCommunitySubnamesResult => {
  const { justaname, chainId } = useJustaName();

  const query = useQuery({
    queryKey: buildCommunitySubnamesKey(props.ensDomain),
    queryFn: async () =>
      await justaname?.subnames.getCommunitySubnamesByDomain({
        ensDomain: props.ensDomain,
        isClaimed: true,
        coinType: 60,
        chainId: chainId,
      }),
    enabled: Boolean(props.ensDomain) && Boolean(justaname),
  });

  return {
    communitySubnamesResponse: query.data ?? {
      subnames: [],
      pagination: {
        totalCount: 0,
        page: 0,
        limit: 0,
        totalPages: 0,
        nextPage: 0,
        prevPage: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    },
    isLoading: query.isLoading,
    refetchCommunitySubnames: query.refetch,
  };
};
