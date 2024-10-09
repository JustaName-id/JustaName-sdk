"use client";

import { useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useEnsAuth } from './useEnsAuth';



export interface UseEnsSignOutResult {
  signOut: () => Promise<void>;
  isSignOutPending: boolean;
}

export interface UseEnsSignOutParams {
  backendUrl?: string;
  signoutRoute?: string;
}

export const useEnsSignOut = ( params?: UseEnsSignOutParams): UseEnsSignOutResult => {
  const { backendUrl, routes} = useJustaName();
  const _backendUrl = useMemo(() =>  params?.backendUrl || backendUrl || "", [backendUrl, params?.backendUrl]);
  const _signoutRoute = useMemo(() => params?.signoutRoute || routes.signoutRoute, [routes.signoutRoute, params?.signoutRoute]);
  const signoutEndpoint = useMemo(() => _backendUrl + _signoutRoute, [_backendUrl, _signoutRoute]);

  const { refreshEnsAuth } = useEnsAuth({
    backendUrl: _backendUrl
  })

  const mutation = useMutation({
    mutationFn: async () => {
      await fetch(signoutEndpoint,
        {
        credentials: 'include',
      });

      refreshEnsAuth()
    },
  });

  return {
    signOut: mutation.mutateAsync,
    isSignOutPending: mutation.isPending,
  }
}

