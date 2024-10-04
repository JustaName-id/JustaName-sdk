import { SubnameSearchParams, SubnameSearchResponse } from '@justaname.id/sdk';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import { useJustaName } from '../../providers';

export const buildSearchSubnamesKey = (params: SubnameSearchParams) => [
  'SEARCH_SUBNAME',
  ...Object.values(params),
];

export interface UseSearchSubnamesParams extends Omit<SubnameSearchParams, 'isClaimed' | 'skip' | 'take' | 'data' | 'ensRegistered'> {
  skip?: number;
  take?: number;
  data?: boolean;
  ensRegistered?: boolean;
  isClaimed?: boolean;
}

interface UseSearchSubnamesResult {
  subnames: SubnameSearchResponse;
  isSubnamesPending: boolean;
  isSubnamesFetching: boolean;
  isSubnamesLoading: boolean;
  refetchSearchSubnames: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SubnameSearchResponse | undefined, unknown>>;
}

export const useSearchSubnames = (params: UseSearchSubnamesParams): UseSearchSubnamesResult => {
  const { justaname, chainId: defaultChainId } = useJustaName();
  const { subname, chainId,  ...rest } = params;
  const _chainId = chainId || defaultChainId;

  const currentParams : SubnameSearchParams = {
    subname: subname,
    skip: 0,
    take: 10,
    data: true,
    ensRegistered: false,
    isClaimed: true,
    chainId: _chainId,
    ...rest
  };

  const query = useQuery({
    queryKey: buildSearchSubnamesKey(currentParams),
    queryFn: async () => await justaname?.subnames.searchSubnames(currentParams),
    enabled: Boolean(subname) && Boolean(justaname),
    initialData: { domains: [] }
  });

  return {
    subnames: query.data,
    refetchSearchSubnames: query.refetch,
    isSubnamesPending: query.isPending,
    isSubnamesFetching: query.isFetching,
    isSubnamesLoading: query.isPending || query.isFetching,
  };
};
