import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { RevokeEbdcPermissionResponse } from '@justaname.id/sdk';
import { useSignMessage } from 'wagmi';
import { useAccountSubnames, useMountedAccount } from '../account';

export interface UseRequestRevokeEbdcPermission {
  addEbdcPermission: UseMutateFunction<RevokeEbdcPermissionResponse, Error, RevokeEbdcPermissionRequest, unknown>;
  isRevokeEbdcPermissionPending: boolean;
}

export interface RevokeEbdcPermissionRequest {
  subname: string
}

export const useRevokeEbdcPermission = ({
                                       ensDomain
                                     }: {
  ensDomain: string
}): UseRequestRevokeEbdcPermission => {
  const { justaname } = useJustaName()
  const { signMessageAsync } = useSignMessage()
  const { address} = useMountedAccount()
  const { refetchAccountSubnames } = useAccountSubnames()
  const mutate = useMutation<
    RevokeEbdcPermissionResponse,
    Error,
    RevokeEbdcPermissionRequest
  >({
    mutationFn: async (
      params:RevokeEbdcPermissionRequest
    ) => {
      if (!address) {
        throw new Error('Wallet not connected')
      }
      const challengeResponse = await justaname.ebdc.requestRevokeEbdcFieldChallenge({
        subname: params.subname,
        address: address,
        ensDomain,
      })

      const signature = await signMessageAsync({
        message: challengeResponse.challenge,
        account: address
      })

      const response = await justaname.ebdc.revokeEbdcPermission({
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
    isRevokeEbdcPermissionPending: mutate.isPending
  }
}