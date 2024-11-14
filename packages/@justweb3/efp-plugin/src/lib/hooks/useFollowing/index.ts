import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';

export const buildFollowingQueryKey = (addressOrEns: string | undefined) => {
  return ['EFP_FOLLOWING', addressOrEns];
};

export interface Following {
  following: {
    version: number;
    record_type: string;
    data: string;
    tags: string[];
  }[];
}

export const getFollowing = async (
  addressOrEns: string | undefined,
  limit: number,
  offset: number
) => {
  const following = await axios.get<Following>(
    `https://api.ethfollow.xyz/api/v1/users/${addressOrEns}/following?limit=${limit}&offset=${offset}`
  );

  return following.data;
};

export interface UseFollowingParams {
  addressOrEns?: string;
}

export interface UseFollowingResult {
  following: InfiniteData<Following, unknown> | undefined;
  fetchMoreFollowing: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<Following, unknown>, Error>
  >;
  hasMoreFollowing: boolean;
  isFollowingPending: boolean;
  isFollowingFetching: boolean;
  isFollowingLoading: boolean;
}

export const useFollowing = ({
  addressOrEns,
}: UseFollowingParams): UseFollowingResult => {
  const query = useInfiniteQuery({
    queryKey: buildFollowingQueryKey(addressOrEns),
    queryFn: async ({ pageParam: { offset, limit } }) => {
      return getFollowing(addressOrEns, limit, offset);
    },
    initialPageParam: { offset: 0, limit: 100 },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.following.length < 20) {
        return undefined;
      }

      return {
        offset: allPages.flatMap((page) => page.following).length,
        limit: 20,
      };
    },
    enabled: Boolean(addressOrEns),
  });

  return {
    following: query.data,
    fetchMoreFollowing: query.fetchNextPage,
    hasMoreFollowing: query.hasNextPage,
    isFollowingPending: query.isPending,
    isFollowingFetching: query.isFetching,
    isFollowingLoading: query.isPending || query.isFetching,
  };
};
