"use client";

import { useMountedAccount } from '../account';
import { UseMutateAsyncFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useSignMessage } from 'wagmi';
import { buildEnsAuthKey } from './useEnsAuth';


export interface EnsSignInParams {
  ens: string;
  backendUrl?: string;
  signinNonceRoute?: string;
  signinRoute?: string;
}

export interface UseEnsSignInParams {
  backendUrl?: string;
  signinNonceRoute?: string;
  signinRoute?: string;
}

export interface UseEnsSignInResult {
  signIn:  UseMutateAsyncFunction<string, Error, EnsSignInParams, unknown>,
  isSignInPending: boolean;
}

/**
 * Custom hook to request a challenge for a ens and obtain a signature proving ownership of an address.
 *
 * @returns {UseEnsSignInResult} An object containing the function to initiate the signing process (`ensSignature`)
 * and a boolean indicating if the signature operation is pending (`ensSignaturePending`).
 */

export const useEnsSignIn = (params: UseEnsSignInParams = {}): UseEnsSignInResult => {
  const { justaname, backendUrl, routes} = useJustaName();
  const { address } = useMountedAccount();
  const queryClient = useQueryClient()
  const { signMessageAsync } = useSignMessage()

  const mutation = useMutation({
    mutationFn: async (_params: EnsSignInParams) => {
      if (!address) {
        throw new Error('No address found');
      }

      const currentBackendUrl = _params.backendUrl || params.backendUrl || backendUrl;
      const currentSigninNonceRoute = _params.signinNonceRoute || params.signinNonceRoute || routes.signinNonceRoute;
      const currentSigninRoute = _params.signinRoute || params.signinRoute || routes.signinRoute;

      const nonceResponse = await fetch(
          currentBackendUrl + currentSigninNonceRoute, {
        credentials: 'include',
      });

      const message = justaname.signIn.requestSignIn({
        address,
        ens: _params.ens,
        nonce: await nonceResponse.text()
      })

      const signature = await signMessageAsync({
        message: message,
        account: address
      })


      const response = await fetch(
          currentBackendUrl + currentSigninRoute,
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signature: signature,
          message: message,
        }),
        credentials: 'include'
      });

      queryClient.invalidateQueries({
        queryKey: buildEnsAuthKey(currentBackendUrl || "")
      })

      return response.text();
    },
  });

  return {
    signIn: mutation.mutateAsync,
    isSignInPending: mutation.isPending
  }
}

