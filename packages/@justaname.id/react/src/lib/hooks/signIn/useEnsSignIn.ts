"use client";

import { useMountedAccount } from '../useMountedAccount';
import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useSignMessage } from 'wagmi';
import { useSubnameSession } from './useENSAuth';


export interface SubnameSignInParams {
  subname: string;
}

export interface UseSubnameSignInResult {
  signIn:  UseMutateAsyncFunction<string, Error, SubnameSignInParams, unknown>,
  isSignInPending: boolean;
}

/**
 * Custom hook to request a challenge for a subname and obtain a signature proving ownership of an address.
 *
 * @returns {UseSubnameSignInResult} An object containing the function to initiate the signing process (`subnameSignature`)
 * and a boolean indicating if the signature operation is pending (`subnameSignaturePending`).
 */

export const useSubnameSignIn = (): UseSubnameSignInResult => {
  const { justaname, backendUrl, routes} = useJustaName();
  const { address } = useMountedAccount();
  const { refreshSubnameSession } =useSubnameSession()
  const { signMessageAsync } = useSignMessage()

  const mutation = useMutation({
    mutationFn: async ({ subname }: SubnameSignInParams) => {
      if (!address) {
        throw new Error('No address found');
      }

      const nonceResponse = await fetch((backendUrl ?? "") + routes.signinNonceRoute, {
        credentials: 'include',
      });

      const message = justaname.signIn.requestSignIn({
        address,
        subname,
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

      refreshSubnameSession();

      return response.text();
    },
  });

  return {
    signIn: mutation.mutateAsync,
    isSignInPending: mutation.isPending
  }
}

