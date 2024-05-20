'use client';

import { Address, TextRecord, SubnameAcceptResponse } from '@justaname.id/sdk';
import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useAccountSubnames } from './useAccountSubnames';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { useAccountInvitations } from './useAccountInvitations';

export interface BaseAcceptSubnameRequest {
  username: string;

  ensDomain: string;

  chainId: number;

  addresses?: Address[];

  text?: TextRecord[];

  contentHash?: string;
}

/**
 *  Interface defining the parameters needed to accept a subname.
 *
 *  @typedef UseAcceptSubname
 *  @type {object}
 *  @property {function} acceptSubname - The function to accept a subname.
 *  @property {boolean} acceptSubnamePending - Indicates if the mutation is currently pending.
 */
export interface UseAcceptSubname {
  acceptSubname: (
    params: BaseAcceptSubnameRequest
  ) => Promise<SubnameAcceptResponse>;
  acceptSubnamePending: boolean;
}
/**
 * Custom hook for performing a mutation to accept a subname.
 *
 * @returns {UseAcceptSubname} An object containing the `acceptSubname` async function to initiate the subname accept, and a boolean `acceptSubnamePending` indicating the mutation's pending state.
 */
export const useAcceptSubname = (): UseAcceptSubname => {
  const {  justaname } = useJustaName();
  const { address } = useMountedAccount();
  const { refetchInvitations } = useAccountInvitations();
  const { getSignature } = useSubnameSignature();
  const { refetchSubnames } = useAccountSubnames();

  const mutate = useMutation<
    SubnameAcceptResponse,
    Error,
    BaseAcceptSubnameRequest
  >({
    mutationFn: async (params: BaseAcceptSubnameRequest) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await getSignature();

      const accepted = await  justaname.subnames.acceptSubname({
        addresses: params.addresses,
        chainId: params.chainId,
        contentHash: params.contentHash,
        ensDomain: params.ensDomain,
        text: params.text,
        username: params.username,
      }, {
        xAddress: address,
        xSignature: signature.signature,
        xMessage: signature.message,
      });

      refetchSubnames();
      refetchInvitations();

      return accepted;
    },
  });

  return {
    acceptSubname: mutate.mutateAsync as (
      params: BaseAcceptSubnameRequest
    ) => Promise<SubnameAcceptResponse>,
    acceptSubnamePending: mutate.isPending,
  };
};
