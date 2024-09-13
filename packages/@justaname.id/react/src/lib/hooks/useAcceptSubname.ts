'use client';

import {
  Address,
  TextRecord,
  SubnameAcceptResponse,
  ChainId,
  SubnameAcceptParams,
} from '@justaname.id/sdk';
import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useAccountSubnames } from './useAccountSubnames';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { useAccountInvitations } from './useAccountInvitations';

export interface BaseAcceptSubnameRequest {
  username: string;

  ensDomain: string;

  chainId: ChainId;

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
 *  @property {boolean} isAcceptSubnamePending - Indicates if the mutation is currently pending.
 */
export interface UseAcceptSubname {
  acceptSubname: (
    params: SubnameAcceptParams
  ) => Promise<SubnameAcceptResponse>;
  isAcceptSubnamePending: boolean;
}
/**
 * Custom hook for performing a mutation to accept a subname.
 *
 * @returns {UseAcceptSubname} An object containing the `acceptSubname` async function to initiate the subname accept, and a boolean `acceptSubnamePending` indicating the mutation's pending state.
 */
export const useAcceptSubname = (): UseAcceptSubname => {
  const { justaname, chainId, ensDomain } = useJustaName();
  const { address } = useMountedAccount();
  const { refetchInvitations } = useAccountInvitations();
  const { getSignature } = useSubnameSignature();
  const { refetchAccountSubnames } = useAccountSubnames();

  const mutate = useMutation<SubnameAcceptResponse, Error, SubnameAcceptParams>(
    {
      mutationFn: async (params: SubnameAcceptParams) => {
        if (!address) {
          throw new Error('No address found');
        }

        const chainIdToUse = params.chainId || chainId;
        const ensDomainToUse = params.ensDomain || ensDomain;

        const signature = await getSignature();

        const accepted = await justaname.subnames.acceptSubname(
          {
            addresses: params.addresses,
            chainId: chainIdToUse,
            contentHash: params.contentHash,
            ensDomain: ensDomainToUse,
            text: params.text,
            username: params.username,
          },
          {
            xAddress: address,
            xSignature: signature.signature,
            xMessage: signature.message,
          }
        );

        refetchAccountSubnames();
        refetchInvitations();

        return accepted;
      },
    }
  );

  return {
    acceptSubname: mutate.mutateAsync as (
      params: SubnameAcceptParams
    ) => Promise<SubnameAcceptResponse>,
    isAcceptSubnamePending: mutate.isPending,
  };
};
