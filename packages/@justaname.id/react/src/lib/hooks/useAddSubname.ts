import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { SubnameAcceptResponse } from '@justaname.id/sdk';
import { useAccountSubnames } from './useAccountSubnames';

export interface BaseAddSubnameRequest {
  username: string;
}

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