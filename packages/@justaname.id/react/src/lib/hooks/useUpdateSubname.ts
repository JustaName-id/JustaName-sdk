import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { useMountedAccount } from './useMountedAccount';
import { useSubnameSignature } from './useSubnameSignature';
import { SubnameClaimResponse } from '@justaname.id/sdk';
import { useAccountSubnames } from './useAccountSubnames';

export interface BaseClaimSubnameRequest {
  username: string;
}

export const useUpdateSubname = <T = any>() => {
  const { backendUrl, routes } = useJustaName();
  const { address } = useMountedAccount()
  const { subnameSignature} = useSubnameSignature()
  const { refetchSubnames } = useAccountSubnames()

  const mutate = useMutation<SubnameClaimResponse,  Error, T & BaseClaimSubnameRequest>
  ({
    mutationFn: async (
      params: T & BaseClaimSubnameRequest
    ) => {
      if (!address) {
        throw new Error('No address found');
      }

      const signature = await subnameSignature()

      const response = await fetch(
        backendUrl + routes.claimSubnameRoute, {
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

      const data: SubnameClaimResponse = await response.json();
      refetchSubnames()
      return data;
    },
  })

  return {
    claimSubname: mutate.mutateAsync as (params: T & BaseClaimSubnameRequest) => Promise<SubnameClaimResponse>,
    claimSubnamePending: mutate.isPending,
  }
}