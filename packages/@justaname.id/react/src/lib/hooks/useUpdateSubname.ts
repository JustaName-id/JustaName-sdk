"use client";

import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { SubnameUpdateRequest, SubnameUpdateResponse } from '@justaname.id/sdk';
import { useAccountSubnames } from './useAccountSubnames';

/**
 * Defines the structure for the base request needed to claim a subname.
 * 
 * @typedef BaseClaimSubnameRequest
 * @type {object}
 * @property {string} username - The username part of the subname to be claimed or updated.
 */
export interface SubnameUpdate extends Omit<SubnameUpdateRequest, 'chainId'> {
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
  const { justaname,chainId } = useJustaName();
  const { address } = useMountedAccount()
  const { getSignature} = useSubnameSignature()
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

      const updated = await  justaname.subnames.updateSubname({
        addresses: params.addresses,
        chainId,
        contentHash: params.contentHash,
        ensDomain: params.ensDomain,
        text: params.text,
        username: params.username,
      }, {
        xAddress: address,
        xSignature: signature.signature,
        xMessage: signature.message,
      });

      refetchSubnames()
      return updated
    },
  })

  return {
    updateSubname: mutate.mutateAsync as (params: SubnameUpdate) => Promise<SubnameUpdateResponse>,
    updateSubnamePending: mutate.isPending,
  }
}