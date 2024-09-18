import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { AddEbdcPermissionResponse } from '@justaname.id/sdk';
import { useSignMessage } from 'wagmi';
import { useAccountSubnames, useMountedAccount } from '../account';

export interface UseRequestAddEbdcPermission {
  addEbdcPermission: UseMutateFunction<AddEbdcPermissionResponse, Error, AddEbdcPermissionRequest, unknown>;
  isAddEbdcPermissionPending: boolean;
}

export interface AddEbdcPermissionRequest {
  subname: string
}

export const useAddEbdcPermission = ({
  ensDomain
                                    }: {
  ensDomain: string
}): UseRequestAddEbdcPermission => {
  const { justaname } = useJustaName()
  const { signMessageAsync } = useSignMessage()
  const { address} = useMountedAccount()
  const { refetchAccountSubnames } = useAccountSubnames()
  const mutate = useMutation<
    AddEbdcPermissionResponse,
    Error,
    AddEbdcPermissionRequest
  >({
    mutationFn: async (
      params:AddEbdcPermissionRequest
    ) => {
      if (!address) {
        throw new Error('Wallet not connected')
      }
      const challengeResponse = await justaname.ebdc.requestAddEbdcPermissionChallenge({
        subname: params.subname,
        address: address,
        ensDomain,
      })

      const signature = await signMessageAsync({
        message: challengeResponse.challenge,
        account: address
      })

      const response = await justaname.ebdc.addEbdcPermission({
        message: challengeResponse.challenge,
        address: address,
        signature
      })
      
      refetchAccountSubnames()
      return response
    }
  })
  
  return {
    addEbdcPermission: mutate.mutate,
    isAddEbdcPermissionPending: mutate.isPending
  }
}