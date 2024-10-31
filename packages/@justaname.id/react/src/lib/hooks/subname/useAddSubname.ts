'use client';

import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName, useSubnameSignature } from '../../providers';
import { useMountedAccount } from '../account/useMountedAccount';
import { sanitizeRecords, SubnameAddRoute } from '@justaname.id/sdk';
import { useAccountSubnames } from '../account/useAccountSubnames';
import { useMemo } from 'react';
import { Records } from '../../types';

export type UseAddSubnameFunctionParams = SubnameAddRoute['params'];

export interface UseAddSubnameParams
  extends Omit<UseAddSubnameFunctionParams, 'username'> {
  backendUrl?: string;
  addSubnameRoute?: string;
}

export interface UseAddSubnameResult {
  addSubname: UseMutateAsyncFunction<
    Records,
    Error,
    UseAddSubnameFunctionParams
  >;
  isAddSubnamePending: boolean;
}

export const useAddSubname = (
  params?: UseAddSubnameParams
): UseAddSubnameResult => {
  const { justaname, backendUrl, routes, chainId, ensDomains } = useJustaName();
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
  const _addSubnameRoute = useMemo(
    () => params?.addSubnameRoute || routes.addSubnameRoute,
    [params?.addSubnameRoute, routes.addSubnameRoute]
  );
  const addSubnameEndpoint = useMemo(
    () => _backendUrl + _addSubnameRoute,
    [_backendUrl, _addSubnameRoute]
  );
  const _apiKey =
    params?.apiKey ||
    ensDomains.find((ensDomain) => ensDomain.chainId === _chainId)?.apiKey;

  const mutate = useMutation({
    mutationFn: async (_params: UseAddSubnameFunctionParams) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await getSignature();
      const __apiKey = _params.apiKey || _apiKey;
      const __ensDomain = _params.ensDomain || _ensDomain;

      const __chainId = _params.chainId || _chainId;
      const __addresses = _params.addresses || params?.addresses;
      const __text = _params.text || params?.text;
      const __contentHash = _params.contentHash || params?.contentHash;
      let response: SubnameAddRoute['response'];

      if (__apiKey) {
        response = await justaname.subnames.addSubname(
          {
            username: _params.username,
            ensDomain: __ensDomain,
            chainId: __chainId,
            addresses: __addresses,
            text: __text,
            contentHash: __contentHash,
          },
          {
            xSignature: signature.signature,
            xAddress: address,
            xMessage: signature.message,
            xApiKey: __apiKey,
          }
        );
      } else {
        console.log(params);
        const backendResponse = await fetch(addSubnameEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: _params.username,
            ensDomain: __ensDomain,
            chainId: __chainId,
            signature: signature.signature,
            address: address,
            message: signature.message,
            text: __text,
            contentHash: __contentHash,
            addresses: __addresses,
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
    addSubname: mutate.mutateAsync,
    isAddSubnamePending: mutate.isPending,
  };
};
