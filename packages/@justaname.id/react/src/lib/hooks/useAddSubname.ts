import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { SubnameAcceptResponse } from '@justaname.id/sdk';
import { useAccountSubnames } from './useAccountSubnames';

/**
 * Interface defining the base request structure for claiming a subname.
 *
 * @typedef BaseAddSubnameRequest
 * @type {object}
 * @property {string} username - The username part of the subname to be claimed.
 */
export interface BaseAddSubnameRequest {
  username: string;
}

/**
 * Custom hook for performing a mutation to add a subname.
 *
 * @template T - The type of additional parameters that can be passed to the claim subname mutation, extending the base request.
 * @returns {object} An object containing the `addSubname` async function to initiate the subname claim, and a boolean `claimSubnamePending` indicating the mutation's pending state.
 */
export const useAddSubname = <T = any>() => {
  const { backendUrl, routes } = useJustaName();
  const { address } = useMountedAccount()
  const { getSignature} = useSubnameSignature({
    backendUrl,
    requestChallengeRoute: routes.requestChallengeRoute
  })
  const { refetchSubnames } = useAccountSubnames()

  const mutate = useMutation<SubnameAcceptResponse,  Error, T & BaseAddSubnameRequest>
  ({
    mutationFn: async (
      params: T & BaseAddSubnameRequest
    ) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await getSignature()

      const response = await fetch(
        backendUrl + routes.addSubnameRoute, {
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

      const data: SubnameAcceptResponse = await response.json();
      refetchSubnames()
      return data;
    },
  })

  return {
    claimSubname: mutate.mutateAsync as (params: T & BaseAddSubnameRequest) => Promise<SubnameAcceptResponse>,
    claimSubnamePending: mutate.isPending,
  }
}