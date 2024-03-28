import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { SubnameClaimResponse } from '@justaname.id/sdk';
import { useAccountSubnames } from './useAccountSubnames';

/**
 * Interface defining the base request structure for claiming a subname.
 *
 * @typedef BaseClaimSubnameRequest
 * @type {object}
 * @property {string} username - The username part of the subname to be claimed.
 */
export interface BaseClaimSubnameRequest {
  username: string;
}

/**
 * Custom hook for performing a mutation to claim a subname.
 *
 * @template T - The type of additional parameters that can be passed to the claim subname mutation, extending the base request.
 * @returns {object} An object containing the `claimSubname` async function to initiate the subname claim, and a boolean `claimSubnamePending` indicating the mutation's pending state.
 */
export const useClaimSubname = <T = any>() => {
  const { backendUrl, routes } = useJustaName();
  const { address } = useMountedAccount()
  const { subnameSignature} = useSubnameSignature()
  const { refetchSubnames } = useAccountSubnames()

  const mutate = useMutation<SubnameClaimResponse,  Error, T & BaseClaimSubnameRequest>
  ({
    mutationFn: async (
      params: T & BaseClaimSubnameRequest
    ) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await subnameSignature()

      const response = await fetch(
        backendUrl + routes.claimSubnameRoute, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: params.username,
            signature: signature.signature,
            address: address,
            message: signature.message,
          })
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: SubnameClaimResponse = await response.json();
      refetchSubnames()
      return data;
    },
  })

  return {
    claimSubname: mutate.mutateAsync as (params: T & BaseClaimSubnameRequest) => Promise<SubnameClaimResponse>,
    claimSubnamePending: mutate.isPending,
  }
}