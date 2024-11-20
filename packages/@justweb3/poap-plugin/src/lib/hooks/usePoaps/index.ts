import { useQuery } from '@tanstack/react-query';
import { getPoaps } from '../../query/getPoaps';
import { POAP } from '../../types';

export const buildPoapsQueryKey = (address: string | undefined) => {
  return ['POAPS_BY_ADDRESS', address];
};

export interface UsePoapsParams {
  address: string;
  apiKey?: string;
  backendUrl?: string;
}

export interface UsePoapsResult {
  poaps: POAP[] | undefined;
  isPoapsPending: boolean;
  isPoapsFetching: boolean;
  isPoapsLoading: boolean;
}

export const usePoaps = ({
  address,
  apiKey,
  backendUrl,
}: UsePoapsParams): UsePoapsResult => {
  const query = useQuery({
    queryKey: [...buildPoapsQueryKey(address), apiKey, backendUrl],
    queryFn: () => getPoaps(address, apiKey, backendUrl),
    enabled: Boolean(address),
  });

  return {
    poaps: query.data,
    isPoapsPending: query.isPending,
    isPoapsFetching: query.isFetching,
    isPoapsLoading: query.isPending || query.isFetching,
  };
};
