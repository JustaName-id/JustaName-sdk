"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { buildEnsAuthKey } from './useEnsAuth';

export interface EnsSignOutParams {
  backendUrl?: string;
  signoutRoute?: string;
}

export interface UseEnsSignOutResult {
  signOut: (params?: EnsSignOutParams) => Promise<void>;
  isSignOutPending: boolean;
}

export interface UseEnsSignOutParams {
  backendUrl?: string;
  signoutRoute?: string;
}

/**
 * Custom hook to request a challenge for a ens and obtain a signature proving ownership of an address.
 *
 * @returns {UseEnsSignOutResult} An object containing the function to initiate the signing process (`ensSignature`)
 * and a boolean indicating if the signature operation is pending (`ensSignaturePending`).
 */

export const useEnsSignOut = ( params: UseEnsSignOutParams = {}): UseEnsSignOutResult => {
  const { backendUrl, routes} = useJustaName();
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (_params: EnsSignOutParams ={}) => {

      const currentBackendUrl = _params.backendUrl || params.backendUrl || backendUrl;
      const currentSignoutRoute = _params.signoutRoute || params.signoutRoute || routes.signoutRoute;

      await fetch(
       currentBackendUrl + currentSignoutRoute,
        {
        credentials: 'include',
      });

      queryClient.invalidateQueries({
        queryKey: buildEnsAuthKey(currentBackendUrl || "")
      })
    },
  });

  return {
    signOut: mutation.mutateAsync,
    isSignOutPending: mutation.isPending,
  }
}

