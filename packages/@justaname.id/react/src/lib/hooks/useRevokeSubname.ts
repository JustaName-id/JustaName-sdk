'use client';

import { SubnameRevokeResponse } from '@justaname.id/sdk';
import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useAccountSubnames } from './useAccountSubnames';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';

export interface BaseRevokeSubnameRequest {
  ensDomain: string;

  username: string;

  chainId: number;
}

/**
 *  Interface defining the parameters needed to revoke a subname.
 *
 *  @typedef UseRevokeSubname
 *  @type {object}
 *  @property {function} revokeSubname - The function to revoke a subname.
 *  @property {boolean} revokeSubnamePending - Indicates if the mutation is currently pending.
 *  @template T - The type of additional parameters that can be passed to the revoke subname mutation, extending the base request.
 */
export interface UseRevokeSubname<T = any> {
  revokeSubname: (
    params: T & BaseRevokeSubnameRequest
  ) => Promise<SubnameRevokeResponse>;
  revokeSubnamePending: boolean;
}
/**
 * Custom hook for performing a mutation to revoke a subname.
 *
 * @template T - The type of additional parameters that can be passed to the revoke subname mutation, extending the base request.
 * @returns {UseRevokeSubname} An object containing the `revokeSubname` async function to initiate the subname revoke, and a boolean `revokeSubnamePending` indicating the mutation's pending state.
 */
export const useRevokeSubname = <T = any>(): UseRevokeSubname<T> => {
  const { backendUrl, routes } = useJustaName();
  const { address } = useMountedAccount();
  const { getSignature } = useSubnameSignature();
  const { refetchSubnames } = useAccountSubnames();

  const mutate = useMutation<
    SubnameRevokeResponse,
    Error,
    T & BaseRevokeSubnameRequest
  >({
    mutationFn: async (params: T & BaseRevokeSubnameRequest) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await getSignature();

      const response = await fetch((backendUrl ?? "") + routes.revokeSubnameRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...params,
          signature: signature.signature,
          address: address,
          message: signature.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: SubnameRevokeResponse = await response.json();
      refetchSubnames();
      return data;
    },
  });

  return {
    revokeSubname: mutate.mutateAsync as (
      params: T & BaseRevokeSubnameRequest
    ) => Promise<SubnameRevokeResponse>,
    revokeSubnamePending: mutate.isPending,
  };
};
