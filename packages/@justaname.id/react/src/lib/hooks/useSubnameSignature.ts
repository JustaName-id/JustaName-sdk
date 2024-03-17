import { useMountedAccount } from './useMountedAccount';
import { useSignMessage } from 'wagmi';
import { useMutation } from '@tanstack/react-query';
import { useJustaName } from '../providers';
import { RequestChallengeResponse } from '@justaname.id/sdk';

export const useSubnameSignature = () => {
  const {  address} = useMountedAccount();
  const { signMessageAsync } = useSignMessage()
  const { backendUrl, routes} = useJustaName()
  const mutation = useMutation({
    mutationFn: async () => {
      if (!address) {
        throw new Error('No address found');
      }

      const response = await fetch(backendUrl + routes.requestChallengeRoute + `?address=${address}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: RequestChallengeResponse = await response.json();

      const signature = await signMessageAsync({
        message: data.challenge,
        account: address
      });

      if(!signature) {
        throw new Error('Message not signed');
      }

      return {
        signature,
        message: data.challenge,
        address
      }
    },
  });

  return {
    subnameSignature: mutation.mutateAsync,
    subnameSignaturePending: mutation.isPending,
  }
}