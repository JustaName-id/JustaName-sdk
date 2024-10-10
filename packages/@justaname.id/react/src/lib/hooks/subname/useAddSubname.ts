'use client';

import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName, useSubnameSignature } from '../../providers';
import { useMountedAccount } from '../account/useMountedAccount';
import { sanitizeRecords, SubnameAddRoute } from '@justaname.id/sdk';
import { useAccountSubnames } from '../account/useAccountSubnames';
import { useMemo } from 'react';
import { Records } from '../../types';

export type UseAddSubnameFunctionParams = SubnameAddRoute['params'];

export interface UseAddSubnameParams extends Omit<UseAddSubnameFunctionParams, "username"> {
  backendUrl?: string;
  addSubnameRoute?: string;
}

export interface UseAddSubnameResult {
  addSubname: UseMutateAsyncFunction<Records, Error, UseAddSubnameFunctionParams>;
  isAddSubnamePending: boolean;
}

export const useAddSubname = (params?: UseAddSubnameParams): UseAddSubnameResult => {
  const { justaname, backendUrl, routes, apiKey, chainId, ensDomains } = useJustaName();
  const { address } = useMountedAccount();
  const { getSignature } = useSubnameSignature();
  const { refetchAccountSubnames } = useAccountSubnames();
  const _chainId = useMemo(() => params?.chainId || chainId, [params?.chainId, chainId]);
  const _ensDomain = useMemo(() => params?.ensDomain || ensDomains.find((ensDomain) => ensDomain.chainId === _chainId)?.ensDomain, [params?.ensDomain, ensDomains, _chainId]);
  const _backendUrl = useMemo(() => params?.backendUrl || backendUrl, [params?.backendUrl, backendUrl]);
  const _addSubnameRoute = useMemo(() => params?.addSubnameRoute || routes.addSubnameRoute, [params?.addSubnameRoute, routes.addSubnameRoute]);
  const addSubnameEndpoint = useMemo(() => _backendUrl + _addSubnameRoute, [_backendUrl, _addSubnameRoute]);

  const mutate = useMutation({
    mutationFn: async (_params: UseAddSubnameFunctionParams) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await getSignature();

      let response: SubnameAddRoute['response'];

      if (apiKey) {
        response = await justaname.subnames.addSubname(
          {
            username: _params.username,
            ensDomain: _params.ensDomain || _ensDomain,
            chainId: _params.chainId || _chainId,
            addresses: params?.addresses,
            text: params?.text,
            contentHash: params?.contentHash,
          },
          {
            xSignature: signature.signature,
            xAddress: address,
            xMessage: signature.message,
          }
        );
      } else {
        const backendResponse = await fetch(addSubnameEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: _params.username,
              ensDomain: _params.ensDomain || _ensDomain,
              chainId: _params.chainId || _chainId,
              signature: signature.signature,
              address: address,
              message: signature.message,
            }),
          }
        );

        if (!backendResponse.ok) {
          throw new Error('Network response was not ok');
        }

        response = await backendResponse.json();
      }

      refetchAccountSubnames();
      return {
        ...response,
        sanitizedRecords: sanitizeRecords(response)
      }
      },
  });

  return {
    addSubname: mutate.mutateAsync,
    isAddSubnamePending: mutate.isPending,
  };
};
