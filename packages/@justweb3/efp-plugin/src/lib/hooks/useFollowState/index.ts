import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { defaultOptions } from '@justaname.id/react';

export const buildFollowStateQueryKey = (
  addressOrEns1: string | undefined,
  addressOrEns2: string | undefined
) => {
  return ['EFP_FOLLOW_STATE', addressOrEns1, addressOrEns2];
};

export interface FollowState {
  addressUser: string;
  addressFollower: string;
  state: {
    follow: boolean;
    block: boolean;
    mute: boolean;
  };
}

export const getFollowState = async (
  addressOrEns1: string | undefined,
  addressOrEns2: string | undefined
) => {
  const followState = await axios.get<FollowState>(
    `https://api.ethfollow.xyz/api/v1/users/${addressOrEns1}/${addressOrEns2}/followerState`
  );

  return followState.data;
};

export interface UseFollowStateParams {
  addressOrEns1?: string;
  addressOrEns2?: string;
}

export interface UseFollowStateResult {
  followState: FollowState | undefined;
  isFollowStatePending: boolean;
  isFollowStateFetching: boolean;
  isFollowStateLoading: boolean;
}

export const useFollowState = ({
  addressOrEns1,
  addressOrEns2,
}: UseFollowStateParams): UseFollowStateResult => {
  const query = useQuery({
    ...defaultOptions,
    queryKey: buildFollowStateQueryKey(addressOrEns1, addressOrEns2),
    queryFn: () => getFollowState(addressOrEns1, addressOrEns2),
    enabled: Boolean(addressOrEns1) && Boolean(addressOrEns2),
  });

  return {
    followState: query.data,
    isFollowStatePending: query.isPending,
    isFollowStateFetching: query.isFetching,
    isFollowStateLoading: query.isPending || query.isFetching,
  };
};
