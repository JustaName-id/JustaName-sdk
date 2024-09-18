"use client";

import { useMountedAccount } from '../account/useMountedAccount';
import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useSignMessage } from 'wagmi';
import { useEnsAuth } from './useEnsAuth';


export interface EnsSignInParams {
  ens: string;
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

export const useEnsSignIn = (): UseEnsSignInResult => {
  const { justaname, backendUrl, routes} = useJustaName();
  const { address } = useMountedAccount();
  const { refreshEnsAuth } =useEnsAuth()
  const { signMessageAsync } = useSignMessage()

  const mutation = useMutation({
    mutationFn: async ({ ens }: EnsSignInParams) => {
      if (!address) {
        throw new Error('No address found');
      }

      const nonceResponse = await fetch((backendUrl ?? "") + routes.signinNonceRoute, {
        credentials: 'include',
      });

      const message = justaname.signIn.requestSignIn({
        address,
        ens,
        nonce: await nonceResponse.text()
      })

      const signature = await signMessageAsync({
        message: message,
        account: address
      })


      const response = await fetch((backendUrl ?? "") + routes.signinRoute, {
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

      refreshEnsAuth();

      return response.text();
    },
  });

  return {
    signIn: mutation.mutateAsync,
    isSignInPending: mutation.isPending
  }
}

