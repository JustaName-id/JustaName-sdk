import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { SubnameAcceptResponse } from '@justaname.id/sdk';
import { useAccountSubnames } from './useAccountSubnames';

export interface BaseClaimSubnameRequest {
  username: string;
}

export const useUpdateSubname = <T = any>() => {
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
    claimSubname: mutate.mutateAsync as (params: T & BaseClaimSubnameRequest) => Promise<SubnameAcceptResponse>,
    claimSubnamePending: mutate.isPending,
  }
}