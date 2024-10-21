import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId } from '@justaname.id/sdk';

export const buildEnsAuthKey = (backendUrl: string) => ['ENS_AUTH', backendUrl];

export type EnsAuth<T extends object = {}> = T & {
  ens: string;
  address: string;
  chainId: ChainId;
};

export interface UseEnsAuthParams {
  backendUrl?: string;
  currentEnsRoute?: string;
}

export interface UseEnsAuthReturn<T extends object = {}> {
  isLoggedIn: boolean;
  connectedEns: EnsAuth<T> | null | undefined;
  isEnsAuthPending: boolean;
  isEnsAuthFetching: boolean;
  isEnsAuthLoading: boolean;
  refreshEnsAuth: () => void;
}

export const useEnsAuth = <T extends object = {}>(
  params?: UseEnsAuthParams
): UseEnsAuthReturn<T> => {
  const { backendUrl, routes } = useJustaName();

  const _backendUrl = useMemo(
    () => params?.backendUrl || backendUrl || '',
    [backendUrl, params?.backendUrl]
  );
  const _currentEnsRoute = useMemo(
    () => params?.currentEnsRoute || routes.currentEnsRoute,
    [routes.currentEnsRoute, params?.currentEnsRoute]
  );
  const currentEnsEndpoint = useMemo(
    () => _backendUrl + _currentEnsRoute,
    [_backendUrl, _currentEnsRoute]
  );
  const query = useQuery({
    queryKey: buildEnsAuthKey(_backendUrl),
    queryFn: async () => {
      try {
        const response = await fetch(currentEnsEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const json = await response.json();
        return response.status === 200 ? json : null;
      } catch (e) {
        return null;
      }
    },
  });

  return {
    isLoggedIn: !!query.data,
    connectedEns: query.data,
    isEnsAuthPending: query.isPending,
    isEnsAuthFetching: query.isFetching,
    isEnsAuthLoading: query.isPending || query.isFetching,
    refreshEnsAuth: query.refetch,
  };
};
