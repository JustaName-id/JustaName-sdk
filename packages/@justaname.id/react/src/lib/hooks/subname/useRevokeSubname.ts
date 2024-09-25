'use client';

import { SubnameRevokeParams, SubnameRevokeResponse } from '@justaname.id/sdk';
import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useAccountSubnames } from '../account/useAccountSubnames';
import { useMountedAccount } from '../account/useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';

export interface RevokeSubnameRequest extends SubnameRevokeParams {
  backendUrl?: string;
  revokeSubnameRoute?: string;
}

/**
 *  Interface defining the parameters needed to revoke a subname.
 *
 *  @typedef UseRevokeSubname
 *  @type {object}
 *  @property {function} revokeSubname - The function to revoke a subname.
 *  @property {boolean} isRevokeSubnamePending - Indicates if the mutation is currently pending.
 *  @template T - The type of additional parameters that can be passed to the revoke subname mutation, extending the base request.
 */
export interface UseRevokeSubname {
  revokeSubname: (
    params: RevokeSubnameRequest
  ) => Promise<SubnameRevokeResponse>;
  isRevokeSubnamePending: boolean;
}
/**
 * Custom hook for performing a mutation to revoke a subname.
 *
 * @template T - The type of additional parameters that can be passed to the revoke subname mutation, extending the base request.
 * @returns {UseRevokeSubname} An object containing the `revokeSubname` async function to initiate the subname revoke, and a boolean `revokeSubnamePending` indicating the mutation's pending state.
 */
export const useRevokeSubname = (): UseRevokeSubname => {
  const { backendUrl, routes, apiKey, justaname } = useJustaName();
  const { address } = useMountedAccount();
  const { getSignature } = useSubnameSignature();
  const { refetchAccountSubnames } = useAccountSubnames();

  const mutate = useMutation<
    SubnameRevokeResponse,
    Error,
    RevokeSubnameRequest
  >({
    mutationFn: async (params: RevokeSubnameRequest) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await getSignature();

      let response: SubnameRevokeResponse;

      if (apiKey) {
        response = await justaname.subnames.revokeSubname(
          {
            username: params.username,
            ensDomain: params.ensDomain,
            chainId: params.chainId,
          },
          {
            xSignature: signature.signature,
            xAddress: address,
            xMessage: signature.message,
          }
        );
      } else {
        const backendResponse = await fetch(
          (params.backendUrl ?? backendUrl ?? '') + params.revokeSubnameRoute ??
            routes.revokeSubnameRoute,
          {
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
    revokeSubname: mutate.mutateAsync as (
      params: RevokeSubnameRequest
    ) => Promise<SubnameRevokeResponse>,
    isRevokeSubnamePending: mutate.isPending,
  };
};
