"use client";

import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { buildEnsAuthKey } from './useEnsAuth';

export interface UseEnsSignOutResult {
  signOut: UseMutateAsyncFunction<void, Error, void, unknown>,
  isSignOutPending: boolean;
}

export interface UseEnsSignOutParams {
  backendUrl?: string;
}

/**
 * Custom hook to request a challenge for a ens and obtain a signature proving ownership of an address.
 *
 * @returns {UseEnsSignOutResult} An object containing the function to initiate the signing process (`ensSignature`)
 * and a boolean indicating if the signature operation is pending (`ensSignaturePending`).
 */

export const useEnsSignOut = ( { backendUrl }: UseEnsSignOutParams = {}): UseEnsSignOutResult => {
  const { backendUrl: defaultBackendUrl, routes} = useJustaName();
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {

      await fetch((backendUrl || defaultBackendUrl || "") + routes.signoutRoute, {
        credentials: 'include',
      });

      queryClient.invalidateQueries({
        queryKey: buildEnsAuthKey(backendUrl || defaultBackendUrl || "")
      })
    },
  });

  return {
    signOut: mutation.mutateAsync,
    isSignOutPending: mutation.isPending,
  }
}

