'use client';

import { SubnameRejectResponse } from '@justaname.id/sdk';
import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useAccountSubnames } from './useAccountSubnames';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';

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
  const { backendUrl, routes } = useJustaName();
  const { address } = useMountedAccount();
  const { getSignature } = useSubnameSignature({
    backendUrl,
    requestChallengeRoute: routes.requestChallengeRoute,
  });
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

      const response = await fetch(backendUrl + routes.rejectSubnameRoute, {
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

      const data: SubnameRejectResponse = await response.json();
      refetchSubnames();
      return data;
    },
  });

  return {
    rejectSubname: mutate.mutateAsync as (
      params: BaseRejectSubnameRequest
    ) => Promise<SubnameRejectResponse>,
    rejectSubnamePending: mutate.isPending,
  };
};
