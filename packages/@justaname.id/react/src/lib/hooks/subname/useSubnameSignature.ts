"use client";

import { useMountedAccount } from '../account/useMountedAccount';
import { useSignMessage } from 'wagmi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId } from '@justaname.id/sdk';

export const buildSignature = (address: string, chainId: ChainId) => ['SUBNAME_SIGNATURE', address, chainId];

export interface UseSubnameSignatureResult {
  getSignature: () => Promise<{signature: string, message: string, address: string, expirationTime: Date}>,
  isSubnameSignaturePending: boolean;
  isSubnameSignatureFetching: boolean;
}

export const useSubnameSignature = (): UseSubnameSignatureResult => {
  const { justaname, chainId} = useJustaName();
  const { address} = useMountedAccount();
  const queryClient = useQueryClient()
  const { signMessageAsync } = useSignMessage()

  const isWeb = typeof window !== 'undefined';

  const mutation = useMutation({
    mutationFn: async () => {
      if (!address) {
        throw new Error('No address found');
      }
      const message = await justaname.siwe.requestChallenge({
        address,
        chainId
      })

      const signature = await signMessageAsync({
        message: message.challenge,
        account: address
      });

      if(!signature) {
        throw new Error('Message not signed');
      }

      const expirationTime =  new Date(message.challenge.split('Expiration Time: ')[1])

      const signedData = {
        signature,
          message: message.challenge,
        address,
        expirationTime
      }
      await queryClient.setQueryData(
        buildSignature(address, chainId),
        signedData
      )

      if (isWeb) {
        localStorage.setItem(buildSignature(address, chainId).join('_'), JSON.stringify(signedData));
      }

      return signedData
    },
  });


  const query = useQuery({
    queryKey: buildSignature(address ?? "", chainId),
    queryFn: () => mutation.mutateAsync(),
    enabled: false,
    refetchOnWindowFocus: false,
  })

  const getSignature = async () => {
    const now = new Date();

    if (query.data) {
      if (query.data.expirationTime > now) {
        return query.data
      }
    }

    if (isWeb) {
      const localData = localStorage.getItem(buildSignature(address ?? '', chainId).join('_'));
      if (localData) {
        const parsedData = JSON.parse(localData);
        if (new Date(parsedData.expirationTime) > now) {
          await queryClient.setQueryData(
            buildSignature(address ?? '', chainId),
            parsedData
          )
          return parsedData;
        }
      }
    }

    return await mutation.mutateAsync()
  }
  return {
    getSignature,
    isSubnameSignaturePending: mutation.isPending,
    isSubnameSignatureFetching: query.isFetching,
  }
}

