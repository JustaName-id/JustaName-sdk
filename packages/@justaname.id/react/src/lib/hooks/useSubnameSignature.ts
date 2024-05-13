"use client";

import { useMountedAccount } from './useMountedAccount';
import { useSignMessage } from 'wagmi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RequestChallengeResponse } from '@justaname.id/sdk';

export const buildSignature = (address: string) => ['SUBNAME_SIGNATURE', address]

export interface UseSubnameSignatureOptions {
  backendUrl: string,
  requestChallengeRoute: string
}

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
export const useSubnameSignature = (
  props: UseSubnameSignatureOptions
): UseSubnameSignatureResult => {
  const {  address} = useMountedAccount();
  const queryClient = useQueryClient()
  const { signMessageAsync } = useSignMessage()
  const mutation = useMutation({
    mutationFn: async () => {
      if (!address) {
        throw new Error('No address found');
      }

      const response = await fetch(props.backendUrl + props.requestChallengeRoute + `?address=${address}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: RequestChallengeResponse = await response.json();

      console.log(data.challenge, address)
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

      return signedData
    },
  });


  const query = useQuery({
    queryKey: buildSignature(address ?? ''),
    queryFn: () => mutation.mutateAsync(),
    enabled: false
  })

  const getSignature = async () => {
    const now = new Date();
    if (query.data) {
      if (query.data.expirationTime > now) {
        return query.data
      }
    }
    return await mutation.mutateAsync()
  }
  return {
    getSignature,
    subnameSignaturePending: mutation.isPending,
  }
}

