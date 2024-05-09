import { SubnameSearchResponse } from '@justaname.id/sdk';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import { useJustaName } from '../providers';

export const buildSearchSubnamesKey = (subname: string | undefined) => [
  'SEARCH_SUBNAME',
  subname,
];
export interface UseSearchSubnamesOptions {
  subname: string;
  skip?: number;
  take?: number;
  data?: boolean;
  ensRegistered?: boolean;
  isClaimed?: boolean;
}

interface UseSearchSubnamesResult {
  subnames: SubnameSearchResponse;
  isLoading: boolean;
  refetchSearchSubnames: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SubnameSearchResponse | undefined, unknown>>;
}
export const useSearchSubnames = (
  props: UseSearchSubnamesOptions = {
    subname: '',
    skip: 0,
    take: 10,
    data: true,
    ensRegistered: false,
    isClaimed: true,
  }
): UseSearchSubnamesResult => {
  const { justaname, chainId } = useJustaName();

  const query = useQuery({
    queryKey: buildSearchSubnamesKey(props.subname),
    queryFn: async () =>
      await justaname?.subnames.searchSubnames({
        subname: props.subname,
        skip: props.skip ?? 0,
        chainId: chainId,
        take: props.take ?? 10,
        data: props.data ?? true,
        ensRegistered: props.ensRegistered ?? false,
        isClaimed: props.isClaimed ?? true,
      }),
    enabled: Boolean(props.subname) && Boolean(justaname),
  });

  return {
    subnames: query.data ?? { domains: [] },
    isLoading: query.isLoading,
    refetchSearchSubnames: query.refetch,
  };
};
