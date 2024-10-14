'use client';

import { sanitizeRecords, SubnameRevokeRoute } from '@justaname.id/sdk';
import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName, useSubnameSignature } from '../../providers';
import { useAccountSubnames } from '../account/useAccountSubnames';
import { useMountedAccount } from '../account/useMountedAccount';
import { useMemo } from 'react';
import { Records } from '../../types';

export type UseRevokeSubnameFunctionParams = SubnameRevokeRoute['params'];

export interface UseRevokeSubnameParams
  extends Omit<UseRevokeSubnameFunctionParams, 'username'> {
  backendUrl?: string;
  revokeSubnameRoute?: string;
}

export interface UseRevokeSubnameResult {
  revokeSubname: UseMutateAsyncFunction<
    Records,
    Error,
    UseRevokeSubnameFunctionParams
  >;
  isRevokeSubnamePending: boolean;
}

export const useRevokeSubname = (
  params?: UseRevokeSubnameParams
): UseRevokeSubnameResult => {
  const { backendUrl, routes, justaname, chainId, ensDomains } = useJustaName();
  const { address } = useMountedAccount();
  const { getSignature } = useSubnameSignature();
  const { refetchAccountSubnames } = useAccountSubnames();
  const _chainId = useMemo(
    () => params?.chainId || chainId,
    [params?.chainId, chainId]
  );
  const _ensDomain = useMemo(
    () =>
      params?.ensDomain ||
      ensDomains.find((ensDomain) => ensDomain.chainId === _chainId)?.ensDomain,
    [params?.ensDomain, ensDomains, _chainId]
  );
  const _backendUrl = useMemo(
    () => params?.backendUrl || backendUrl,
    [params?.backendUrl, backendUrl]
  );
  const _revokeSubnameRoute = useMemo(
    () => params?.revokeSubnameRoute || routes.revokeSubnameRoute,
    [params?.revokeSubnameRoute, routes.revokeSubnameRoute]
  );
  const revokeEndpoint = useMemo(
    () => _backendUrl + _revokeSubnameRoute,
    [_backendUrl, _revokeSubnameRoute]
  );
  const _apiKey =
    params?.apiKey ||
    ensDomains.find((ensDomain) => ensDomain.chainId === _chainId)?.apiKey;

  const mutate = useMutation({
    mutationFn: async (_params: UseRevokeSubnameFunctionParams) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await getSignature();

      if (!_ensDomain) {
        throw new Error(
          'Missing ensDomain name: add the ensDomain to the hook params or the function params or to the provider'
        );
      }

      let response: SubnameRevokeRoute['response'];

      const __apiKey = params?.apiKey || _apiKey;
      const __ensDomain = params?.ensDomain || _ensDomain;
      const __chainId = params?.chainId || _chainId;

      if (__apiKey) {
        response = await justaname.subnames.revokeSubname(
          {
            username: _params.username,
            ensDomain: __ensDomain,
            chainId: __chainId,
          },
          {
            xSignature: signature.signature,
            xAddress: address,
            xMessage: signature.message,
            xApiKey: __apiKey,
          }
        );
      } else {
        const backendResponse = await fetch(revokeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...params,
            signature: signature.signature,
            ensDomain: __ensDomain,
            chainId: __chainId,
            address: address,
            message: signature.message,
          }),
        });

        if (!backendResponse.ok) {
          throw new Error('Network response was not ok');
        }

        response = await backendResponse.json();
      }

      refetchAccountSubnames();
      return {
        ...response,
        sanitizedRecords: sanitizeRecords(response),
      };
    },
  });

  return {
    revokeSubname: mutate.mutateAsync,
    isRevokeSubnamePending: mutate.isPending,
  };
};
