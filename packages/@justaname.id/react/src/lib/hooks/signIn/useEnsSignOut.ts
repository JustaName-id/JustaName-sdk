"use client";

import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useSubnameSession } from './useEnsAuth';

export interface UseSubnameSignOutResult {
  signOut: UseMutateAsyncFunction<void, Error, void, unknown>,
  isSignOutPending: boolean;
}

/**
 * Custom hook to request a challenge for a subname and obtain a signature proving ownership of an address.
 *
 * @returns {UseSubnameSignOutResult} An object containing the function to initiate the signing process (`subnameSignature`)
 * and a boolean indicating if the signature operation is pending (`subnameSignaturePending`).
 */

export const useSubnameSignOut = (): UseSubnameSignOutResult => {
  const { backendUrl, routes} = useJustaName();
  const { refreshSubnameSession } = useSubnameSession()
  const mutation = useMutation({
    mutationFn: async () => {

      await fetch((backendUrl ?? "") + routes.signoutRoute, {
        credentials: 'include',
      });

      refreshSubnameSession()
    },
  });

  return {
    signOut: mutation.mutateAsync,
    isSignOutPending: mutation.isPending,
  }
}

