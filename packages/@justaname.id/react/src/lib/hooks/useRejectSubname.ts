'use client';

import { SubnameRejectResponse } from '@justaname.id/sdk';
import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useAccountSubnames } from './useAccountSubnames';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { useAccountInvitations } from './useAccountInvitations';

export interface BaseRejectSubnameRequest {
  username: string;

  ensDomain: string;

  chainId: number;
}

/**
 *  Interface defining the parameters needed to reject a subname.
 *
 *  @typedef UseRejectSubname
 *  @type {object}
 *  @property {function} rejectSubname - The function to reject a subname.
 *  @property {boolean} rejectSubnamePending - Indicates if the mutation is currently pending.
 */
export interface UseRejectSubname {
  rejectSubname: (
    params: BaseRejectSubnameRequest
  ) => Promise<SubnameRejectResponse>;
  rejectSubnamePending: boolean;
}
/**
 * Custom hook for performing a mutation to reject a subname.
 *
 * @returns {UseRejectSubname} An object containing the `rejectSubname` async function to initiate the subname reject, and a boolean `rejectSubnamePending` indicating the mutation's pending state.
 */
export const useRejectSubname = (): UseRejectSubname => {
  const { justaname } = useJustaName();
  const { address } = useMountedAccount();
  const { refetchInvitations } = useAccountInvitations();
  const { getSignature } = useSubnameSignature();
  const { refetchSubnames } = useAccountSubnames();

  const mutate = useMutation<
    SubnameRejectResponse,
    Error,
    BaseRejectSubnameRequest
  >({
    mutationFn: async (params: BaseRejectSubnameRequest) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await getSignature();

      const accepted = await  justaname.subnames.rejectSubname({
        chainId: params.chainId,
        ensDomain: params.ensDomain,
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
    rejectSubname: mutate.mutateAsync as (
      params: BaseRejectSubnameRequest
    ) => Promise<SubnameRejectResponse>,
    rejectSubnamePending: mutate.isPending,
  };
};
