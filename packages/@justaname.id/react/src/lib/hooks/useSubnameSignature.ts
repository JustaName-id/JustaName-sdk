"use client";

import { useMountedAccount } from './useMountedAccount';
import { useSignMessage } from 'wagmi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RequestChallengeResponse } from '@justaname.id/sdk';
import { useJustaName } from '../providers';

export const buildSignature = (address: string) => ['SUBNAME_SIGNATURE', address]


export interface UseSubnameSignatureResult {
  getSignature: () => Promise<{signature: string, message: string, address: string, expirationTime: Date}>,
  subnameSignaturePending: boolean;
}
/**
 * Custom hook to request a challenge for a subname and obtain a signature proving ownership of an address.
 *
 * @returns {UseSubnameSignatureResult} An object containing the function to initiate the signing process (`subnameSignature`)
 * and a boolean indicating if the signature operation is pending (`subnameSignaturePending`).
 */
export const useSubnameSignature = (): UseSubnameSignatureResult => {
  const { backendUrl, routes} = useJustaName();
  const {  address} = useMountedAccount();
  const queryClient = useQueryClient()
  const { signMessageAsync } = useSignMessage()

  const isWeb = typeof window !== 'undefined';

  const mutation = useMutation({
    mutationFn: async () => {
      if (!address) {
        throw new Error('No address found');
      }

      const response = await fetch(
        (backendUrl ?? "") + routes.requestChallengeRoute
        + `?address=${address}`, {
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

      const expirationTime =  new Date(data.challenge.split('Expiration Time: ')[1])

      const signedData = {
        signature,
          message: data.challenge,
        address,
        expirationTime
      }
      await queryClient.setQueryData(
        buildSignature(address),
        signedData
      )

      if (isWeb) {
        localStorage.setItem(buildSignature(address).join('_'), JSON.stringify(signedData));
      }

      return signedData
    },
  });


  const query = useQuery({
    queryKey: buildSignature(address ?? ''),
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
      const localData = localStorage.getItem(buildSignature(address ?? '').join('_'));
      if (localData) {
        const parsedData = JSON.parse(localData);
        if (new Date(parsedData.expirationTime) > now) {
          await queryClient.setQueryData(
            buildSignature(address ?? ''),
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
    subnameSignaturePending: mutation.isPending,
  }
}

