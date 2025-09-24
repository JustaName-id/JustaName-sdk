import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { defaultOptions } from '@justaname.id/react';

export const buildFollowersQueryKey = (addressOrEns: string | undefined) => {
  return ['EFP_FOLLOWERS', addressOrEns];
};

export interface Followers {
  followers: {
    efp_list_nft_token_id: string;
    address: string;
    tags: string[];
    is_following: boolean;
    is_blocked: boolean;
    is_muted: boolean;
    updated_at: string;
  }[];
}

export const getFollowers = async (
  addressOrEns: string | undefined,
  limit: number,
  offset: number
) => {
  const followers = await axios.get<Followers>(
    `https://api.ethfollow.xyz/api/v1/users/${addressOrEns}/followers?limit=${limit}&offset=${offset}`
  );

  return followers.data;
};

export interface UseFollowersParams {
  addressOrEns?: string;
}

export interface UseFollowersResult {
  followers: InfiniteData<Followers, unknown> | undefined;
  fetchMoreFollowers: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<Followers, unknown>, Error>
  >;
  hasMoreFollowers: boolean;
  isFollowersPending: boolean;
  isFollowersFetching: boolean;
  isFollowersLoading: boolean;
}

export const useFollowers = ({
  addressOrEns,
}: UseFollowersParams): UseFollowersResult => {
  const query = useInfiniteQuery({
    ...defaultOptions,
    queryKey: buildFollowersQueryKey(addressOrEns),
    queryFn: async ({ pageParam: { offset, limit } }) => {
      return getFollowers(addressOrEns, limit, offset);
    },
    initialPageParam: { offset: 0, limit: 30 },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.followers.length < 20) {
        return undefined;
      }

      return {
        offset: allPages.flatMap((page) => page.followers).length,
        limit: 20,
      };
    },
    enabled: Boolean(addressOrEns),
  });

  return {
    followers: query.data,
    fetchMoreFollowers: query.fetchNextPage,
    hasMoreFollowers: query.hasNextPage,
    isFollowersPending: query.isPending,
    isFollowersFetching: query.isFetching,
    isFollowersLoading: query.isPending || query.isFetching,
  };
};
