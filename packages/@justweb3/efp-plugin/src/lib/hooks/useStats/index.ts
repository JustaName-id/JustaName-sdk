import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const buildStatsQueryKey = (addressOrEns: string | undefined) => {
  return ['EFP_STATS', addressOrEns];
};

export interface Stats {
  followers_count: string;
  following_count: string;
}

export const getStats = async (addressOrEns: string | undefined) => {
  const stats = await axios.get<Stats>(
    `https://api.ethfollow.xyz/api/v1/users/${addressOrEns}/stats`
  );

  return stats.data;
};

export interface UseStatsParams {
  addressOrEns?: string;
}

export interface UseStatsResult {
  stats: Stats | undefined;
  isStatsPending: boolean;
  isStatsFetching: boolean;
  isStatsLoading: boolean;
}

export const useStats = ({ addressOrEns }: UseStatsParams): UseStatsResult => {
  const query = useQuery({
    queryKey: buildStatsQueryKey(addressOrEns),
    queryFn: () => getStats(addressOrEns),
    enabled: Boolean(addressOrEns),
  });

  return {
    stats: query.data,
    isStatsPending: query.isPending,
    isStatsFetching: query.isFetching,
    isStatsLoading: query.isPending || query.isFetching,
  };
};
