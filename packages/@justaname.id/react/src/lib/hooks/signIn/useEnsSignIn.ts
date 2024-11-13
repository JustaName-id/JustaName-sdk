'use client';

import { useMemo } from 'react';
import { useMountedAccount } from '../account';
import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useSignMessage } from 'wagmi';
import { RequestSignInParams } from '@justaname.id/sdk';
import { useEnsAuth } from './useEnsAuth';
import { useEnsNonce } from './useEnsNonce';

export type UseEnsSignInFunctionParams = Omit<
  RequestSignInParams,
  'nonce' | 'address'
>;

export interface UseEnsSignInParams
  extends Omit<UseEnsSignInFunctionParams, 'ens'> {
  backendUrl?: string;
  signinNonceRoute?: string;
  signinRoute?: string;
  currentEnsRoute?: string;
}

export interface UseEnsSignInResult {
  signIn: UseMutateAsyncFunction<
    string,
    Error,
    UseEnsSignInFunctionParams,
    unknown
  >;
  isSignInPending: boolean;
}

export const useEnsSignIn = (
  params?: UseEnsSignInParams
): UseEnsSignInResult => {
  const { justaname, backendUrl, config, routes, chainId } = useJustaName();
  const { address } = useMountedAccount();
  const { signMessageAsync } = useSignMessage();
  const _backendUrl = useMemo(
    () => params?.backendUrl || backendUrl || '',
    [backendUrl, params?.backendUrl]
  );

  const _signinRoute = useMemo(
    () => params?.signinRoute || routes.signinRoute,
    [routes.signinRoute, params?.signinRoute]
  );

  const signinEndpoint = useMemo(
    () => _backendUrl + _signinRoute,
    [_backendUrl, _signinRoute]
  );
  const _currentEnsRoute = useMemo(
    () => params?.currentEnsRoute || routes.currentEnsRoute,
    [routes.currentEnsRoute, params?.currentEnsRoute]
  );
  const { refreshEnsAuth } = useEnsAuth({
    backendUrl: _backendUrl,
    currentEnsRoute: _currentEnsRoute,
  });

  const { nonce, refetchNonce } = useEnsNonce({
    backendUrl: params?.backendUrl,
    signinNonceRoute: params?.signinNonceRoute,
    address,
  });

  const mutation = useMutation({
    mutationFn: async (_params: UseEnsSignInFunctionParams) => {
      if (!address) {
        throw new Error('No address found');
      }

      if (!nonce) {
        throw new Error('No nonce found');
      }

      try {
        const message = justaname.signIn.requestSignIn({
          ens: _params.ens,
          ttl: config?.signInTtl,
          uri: config?.origin,
          domain: config?.domain,
          chainId: chainId,
          address,
          nonce,
        });

        const signature = await signMessageAsync({
          message: message,
          account: address,
        });

        const response = await fetch(signinEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            signature: signature,
            message: message,
          }),
          credentials: 'include',
        });

        refreshEnsAuth();

        return response.text();
      } catch (e) {
        refetchNonce();
        throw e;
      }
    },
  });

  return {
    signIn: mutation.mutateAsync,
    isSignInPending: mutation.isPending,
  };
};
