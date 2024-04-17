"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { SubnameUpdateRequest, SubnameUpdateResponse } from '@justaname.id/sdk';
import { useAccountSubnames } from './useAccountSubnames';
import { buildSubnameBySubnameKey } from './useSubname';

/**
 * Defines the structure for the base request needed to claim a subname.
 * 
 * @typedef BaseClaimSubnameRequest
 * @type {object}
 * @property {string} username - The username part of the subname to be claimed or updated.
 */
export interface SubnameUpdate extends Omit<SubnameUpdateRequest, 'ensDomain' | 'chainId'> {
  subname: string;
}

export interface UseUpdateSubnameResult {
  updateSubname: (params: SubnameUpdate) => Promise<SubnameUpdateResponse>;
  updateSubnamePending: boolean;
}

/**
 * Custom hook to handle the subname claim or update process.
 *
 * @template T Additional request parameters that can be merged with the base request structure.
 * @returns {UseUpdateSubnameResult} An object containing methods and properties to handle the mutation state.
 */
export const useUpdateSubname = () : UseUpdateSubnameResult => {
  const { backendUrl, routes } = useJustaName();
  const { address } = useMountedAccount()
  const queryClient = useQueryClient()
  const { getSignature} = useSubnameSignature({
    backendUrl,
    requestChallengeRoute: routes.requestChallengeRoute
  })
  const { refetchSubnames } = useAccountSubnames()

  const mutate = useMutation<SubnameUpdateResponse,  Error, SubnameUpdate>
  ({
    mutationFn: async (
      params: SubnameUpdate
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
            text: params.text,
            addresses: params.addresses,
            contentHash: params.contentHash
          })
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: SubnameUpdateResponse = await response.json();
      const key = buildSubnameBySubnameKey(params.subname)
      await queryClient.invalidateQueries({
        queryKey: key
      })
      refetchSubnames()
      return data;
    },
  })

  return {
    updateSubname: mutate.mutateAsync as (params: SubnameUpdate) => Promise<SubnameUpdateResponse>,
    updateSubnamePending: mutate.isPending,
  }
}