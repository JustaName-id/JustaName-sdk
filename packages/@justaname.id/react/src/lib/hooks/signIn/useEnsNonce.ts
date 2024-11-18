import { useMemo } from 'react';
import { useJustaName } from '../../providers';
import { useQuery } from '@tanstack/react-query';
import { defaultOptions } from '../../query';

export const buildNonceKey = (
  backendUrl: string,
  route: string,
  address: string
) => ['ENS_NONCE', backendUrl, route, address];

export interface UseEnsNonceParams {
  signinNonceRoute?: string;
  backendUrl?: string;
  address?: string;
  enabled?: boolean;
}

export interface UseEnsNonceResult {
  nonce: string | undefined;
  refetchNonce: () => void;
  isNoncePending: boolean;
  isNonceLoading: boolean;
  isNonceFetching: boolean;
}

export const useEnsNonce = (params?: UseEnsNonceParams): UseEnsNonceResult => {
  const { backendUrl, routes } = useJustaName();
  const _enabled = params?.enabled !== undefined ? params.enabled : true;
  const _backendUrl = useMemo(
    () => params?.backendUrl || backendUrl || '',
    [backendUrl, params?.backendUrl]
  );
  const _signinNonceRoute = useMemo(
    () => params?.signinNonceRoute || routes.signinNonceRoute,
    [routes.signinNonceRoute, params?.signinNonceRoute]
  );
  const nonceEndpoint = useMemo(
    () => _backendUrl + _signinNonceRoute,
    [_backendUrl, _signinNonceRoute]
  );

  const query = useQuery({
    ...defaultOptions,
    retry: 0,
    staleTime: Infinity,
    queryKey: buildNonceKey(
      _backendUrl,
      _signinNonceRoute,
      params?.address || ''
    ),
    queryFn: async () => {
      const nonceResponse = await fetch(nonceEndpoint, {
        credentials: 'include',
      });

      if (!nonceResponse.ok) {
        throw new Error('Failed to fetch nonce');
      }

      return nonceResponse.text();
    },
    enabled: Boolean(params?.address) && Boolean(_enabled),
  });

  return {
    nonce: query.data,
    refetchNonce: query.refetch,
    isNoncePending: query.isFetching,
    isNonceLoading: query.isLoading,
    isNonceFetching: query.isFetching,
  };
};
