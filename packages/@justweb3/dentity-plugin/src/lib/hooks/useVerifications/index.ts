import {
  getVerificationPresentations,
  VerifiableCredentialPresentation,
} from '@dentity/ens-client';

import { defaultOptions } from '@justaname.id/react';
import { useQuery } from '@tanstack/react-query';

export const buildVerificationsQueryKey = (url: string | undefined) => {
  return ['DENTITY_VERIFICATIONS', url];
};

export const getVerifications = async (
  url: string | undefined
): Promise<VerifiableCredentialPresentation[]> => {
  if (!url) {
    return [];
  }

  try {
    const res = await getVerificationPresentations(url);
    if (res) {
      return res.data.vp_token;
    }
    return [];
  } catch (error: any) {
    return [];
  }
};

export interface UseVerificationsParams {
  url?: string;
}

export interface UseVerificationsResult {
  verifications: VerifiableCredentialPresentation[] | undefined;
  isVerificationsPending: boolean;
  isVerificationsFetching: boolean;
  isVerificationsLoading: boolean;
}

export const useVerifications = ({
  url,
}: UseVerificationsParams): UseVerificationsResult => {
  const query = useQuery({
    ...defaultOptions,
    queryKey: buildVerificationsQueryKey(url),
    queryFn: () => getVerifications(url),
    enabled: Boolean(url),
  });

  return {
    verifications: query.data,
    isVerificationsPending: query.isPending,
    isVerificationsFetching: query.isFetching,
    isVerificationsLoading: query.isPending || query.isFetching,
  };
};
