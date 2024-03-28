import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { SubnameAcceptResponse } from '@justaname.id/sdk';
import { useAccountSubnames } from './useAccountSubnames';

/**
 * Defines the structure for the base request needed to claim a subname.
 * 
 * @typedef BaseClaimSubnameRequest
 * @type {object}
 * @property {string} username - The username part of the subname to be claimed or updated.
 */
export interface BaseClaimSubnameRequest {
  username: string;
}

export interface UseUpdateSubnameResult<T extends any> {
  updateSubname: (params: T & BaseClaimSubnameRequest) => Promise<SubnameAcceptResponse>;
  updateSubnamePending: boolean;
}

/**
 * Custom hook to handle the subname claim or update process.
 *
 * @template T Additional request parameters that can be merged with the base request structure.
 * @returns {UseUpdateSubnameResult} An object containing methods and properties to handle the mutation state.
 */
export const useUpdateSubname = <T = any>() : UseUpdateSubnameResult<T> => {
  const { backendUrl, routes } = useJustaName();
  const { address } = useMountedAccount()
  const { getSignature} = useSubnameSignature({
    backendUrl,
    requestChallengeRoute: routes.requestChallengeRoute
  })
  const { refetchSubnames } = useAccountSubnames()

  const mutate = useMutation<SubnameAcceptResponse,  Error, T & BaseClaimSubnameRequest>
  ({
    mutationFn: async (
      params: T & BaseClaimSubnameRequest
    ) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await getSignature()

      const response = await fetch(
        backendUrl + routes.updateSubnameRoute, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: params.username,
            signature: signature.signature,
            address: address,
            message: signature.message,
            addresses: [
            ]
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
    updateSubname: mutate.mutateAsync as (params: T & BaseClaimSubnameRequest) => Promise<SubnameAcceptResponse>,
    updateSubnamePending: mutate.isPending,
  }
}