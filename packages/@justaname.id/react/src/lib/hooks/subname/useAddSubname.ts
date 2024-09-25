'use client';

import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useMountedAccount } from '../account/useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { SubnameAddParams, SubnameAddResponse } from '@justaname.id/sdk';
import { useAccountSubnames } from '../account/useAccountSubnames';

export interface AddSubnameRequest extends SubnameAddParams {
  backendUrl?: string;
  addSubnameRoute?: string;
}

/**
 *  Interface defining the parameters needed to add a subname.
 *
 *  @typedef UseAddSubname
 *  @type {object}
 *  @property {function} addSubname - The function to add a subname.
 *  @property {boolean} isAddSubnamePending - Indicates if the mutation is currently pending.
 *  @template T - The type of additional parameters that can be passed to the claim subname mutation, extending the base request.
 */
export interface UseAddSubname {
  addSubname: (params: AddSubnameRequest) => Promise<SubnameAddResponse>;
  isAddSubnamePending: boolean;
}
/**
 * Custom hook for performing a mutation to add a subname.
 *
 * @template T - The type of additional parameters that can be passed to the claim subname mutation, extending the base request.
 * @returns {UseAddSubname} An object containing the `addSubname` async function to initiate the subname claim, and a boolean `claimSubnamePending` indicating the mutation's pending state.
 */
export const useAddSubname = (): UseAddSubname => {
  const { justaname, backendUrl, routes, apiKey } = useJustaName();
  const { address } = useMountedAccount();
  const { getSignature } = useSubnameSignature();
  const { refetchAccountSubnames } = useAccountSubnames();

  const mutate = useMutation<SubnameAddResponse, Error, AddSubnameRequest>({
    mutationFn: async (params: AddSubnameRequest) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await getSignature();

      let response: SubnameAddResponse;

      if (apiKey) {
        response = await justaname.subnames.addSubname(
          {
            username: params.username,
            ensDomain: params.ensDomain,
            chainId: params.chainId,
            addresses: params.addresses,
            text: params.text,
            contentHash: params.contentHash,
          },
          {
            xSignature: signature.signature,
            xAddress: address,
            xMessage: signature.message,
          }
        );
      } else {
        const backendResponse = await fetch(
          (params.backendUrl ?? backendUrl ?? '') + params.addSubnameRoute ??
            routes.addSubnameRoute,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: params.username,
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
      return response;
    },
  });

  return {
    addSubname: mutate.mutateAsync as (
      params: AddSubnameRequest
    ) => Promise<SubnameAddResponse>,
    isAddSubnamePending: mutate.isPending,
  };
};
