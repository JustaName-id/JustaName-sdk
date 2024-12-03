'use client';

import { useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useEnsAuth } from './useEnsAuth';
import { useEnsNonce } from './useEnsNonce';

export interface UseEnsSignOutResult {
  signOut: () => Promise<void>;
  isSignOutPending: boolean;
}

export interface UseEnsSignOutParams {
  backendUrl?: string;
  signoutRoute?: string;
  currentEnsRoute?: string;
  signinNonceRoute?: string;
  local?: boolean;
}

export const useEnsSignOut = (
  params?: UseEnsSignOutParams
): UseEnsSignOutResult => {
  const { backendUrl, routes } = useJustaName();
  const _backendUrl = useMemo(
    () => params?.backendUrl || backendUrl || '',
    [backendUrl, params?.backendUrl]
  );
  const _signoutRoute = useMemo(
    () => params?.signoutRoute || routes.signoutRoute,
    [routes.signoutRoute, params?.signoutRoute]
  );
  const signoutEndpoint = useMemo(
    () => _backendUrl + _signoutRoute,
    [_backendUrl, _signoutRoute]
  );
  const _currentEnsRoute = useMemo(
    () => params?.currentEnsRoute || routes.currentEnsRoute,
    [routes.currentEnsRoute, params?.currentEnsRoute]
  );
  const _signinNonceRoute = useMemo(
    () => params?.signinNonceRoute || routes.signinNonceRoute,
    [routes.signinNonceRoute, params?.signinNonceRoute]
  );

  const { refreshEnsAuth, connectedEns } = useEnsAuth({
    backendUrl: _backendUrl,
    currentEnsRoute: _currentEnsRoute,
    local: params?.local,
  });

  const { refetchNonce } = useEnsNonce({
    backendUrl: _backendUrl,
    signinNonceRoute: _signinNonceRoute,
    address: connectedEns?.address,
    enabled: !params?.local,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (params?.local) {
        localStorage.removeItem('ENS_AUTH');
        refreshEnsAuth();
        return;
      }

      await fetch(signoutEndpoint, {
        method: 'POST',
        credentials: 'include',
      });

      refreshEnsAuth();
      refetchNonce();
    },
  });

  return {
    signOut: mutation.mutateAsync,
    isSignOutPending: mutation.isPending,
  };
};
