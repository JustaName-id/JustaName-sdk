'use client';

import { Address, TextRecord, SubnameAcceptResponse } from '@justaname.id/sdk';
import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useAccountSubnames } from './useAccountSubnames';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';

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
  const { backendUrl, routes } = useJustaName();
  const { address } = useMountedAccount();
  const { getSignature } = useSubnameSignature({
    backendUrl,
    requestChallengeRoute: routes.requestChallengeRoute,
  });
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

      const response = await fetch(backendUrl + routes.acceptSubnameRoute, {
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

      const data: SubnameAcceptResponse = await response.json();
      refetchSubnames();
      return data;
    },
  });

  return {
    acceptSubname: mutate.mutateAsync as (
      params: BaseAcceptSubnameRequest
    ) => Promise<SubnameAcceptResponse>,
    acceptSubnamePending: mutate.isPending,
  };
};
