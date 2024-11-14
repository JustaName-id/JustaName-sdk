import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId } from '@justaname.id/sdk';
import { defaultOptions } from '../../query';
import axios from 'axios';

export const buildEnsAuthKey = (backendUrl: string) => ['ENS_AUTH', backendUrl];

export type EnsAuth<T extends object = {}> = T & {
  ens: string;
  address: string;
  chainId: ChainId;
};

export interface UseEnsAuthParams {
  backendUrl?: string;
  currentEnsRoute?: string;
  enabled?: boolean;
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
  const _enabled = params?.enabled !== undefined ? params.enabled : true;
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
    ...defaultOptions,
    retry: 0,
    queryKey: buildEnsAuthKey(_backendUrl),
    queryFn: async () => {
      try {
        const response = await axios.get(currentEnsEndpoint, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Similar to 'credentials: include' in fetch
        });

        return response.data;
      } catch (e) {
        return null;
      }
    },
    enabled: Boolean(_enabled),
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
