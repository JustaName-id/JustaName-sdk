"use client";

import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useEnsAuth } from './useEnsAuth';

export interface UseEnsSignOutResult {
  signOut: UseMutateAsyncFunction<void, Error, void, unknown>,
  isSignOutPending: boolean;
}

/**
 * Custom hook to request a challenge for a ens and obtain a signature proving ownership of an address.
 *
 * @returns {UseEnsSignOutResult} An object containing the function to initiate the signing process (`ensSignature`)
 * and a boolean indicating if the signature operation is pending (`ensSignaturePending`).
 */

export const useEnsSignOut = (): UseEnsSignOutResult => {
  const { backendUrl, routes} = useJustaName();
  const { refreshEnsAuth } = useEnsAuth()
  const mutation = useMutation({
    mutationFn: async () => {

      await fetch((backendUrl ?? "") + routes.signoutRoute, {
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

