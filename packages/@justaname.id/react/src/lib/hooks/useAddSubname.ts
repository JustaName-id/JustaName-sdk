'use client';

import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { SubnameAddResponse } from '@justaname.id/sdk';
import { useAccountSubnames } from './useAccountSubnames';

export interface BaseAddSubnameRequest {
  username: string;
}

/**
 *  Interface defining the parameters needed to add a subname.
 *
 *  @typedef UseAddSubname
 *  @type {object}
 *  @property {function} addSubname - The function to add a subname.
 *  @property {boolean} addSubnamePending - Indicates if the mutation is currently pending.
 *  @template T - The type of additional parameters that can be passed to the claim subname mutation, extending the base request.
 */
export interface UseAddSubname<T = any> {
  addSubname: (
    params: T & BaseAddSubnameRequest
  ) => Promise<SubnameAddResponse>;
  addSubnamePending: boolean;
}
/**
 * Custom hook for performing a mutation to add a subname.
 *
 * @template T - The type of additional parameters that can be passed to the claim subname mutation, extending the base request.
 * @returns {UseAddSubname} An object containing the `addSubname` async function to initiate the subname claim, and a boolean `claimSubnamePending` indicating the mutation's pending state.
 */
export const useAddSubname = <T = any>(): UseAddSubname<T> => {
  const { backendUrl, routes } = useJustaName();
  const { address } = useMountedAccount();
  const { getSignature } = useSubnameSignature();
  const { refetchSubnames } = useAccountSubnames();

  const mutate = useMutation<
    SubnameAddResponse,
    Error,
    T & BaseAddSubnameRequest
  >({
    mutationFn: async (params: T & BaseAddSubnameRequest) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await getSignature();

      const response = await fetch((backendUrl ?? "") + routes.addSubnameRoute, {
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
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: SubnameAddResponse = await response.json();
      refetchSubnames();
      return data;
    },
  });

  return {
    addSubname: mutate.mutateAsync as (
      params: T & BaseAddSubnameRequest
    ) => Promise<SubnameAddResponse>,
    addSubnamePending: mutate.isPending,
  };
};
