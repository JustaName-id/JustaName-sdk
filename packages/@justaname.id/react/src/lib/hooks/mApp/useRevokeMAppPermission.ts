import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { RevokeMAppPermissionResponse } from '@justaname.id/sdk';
import { useSignMessage } from 'wagmi';
import { useAccountSubnames, useMountedAccount } from '../account';

export interface UseRequestRevokeEbdcPermission {
  addEbdcPermission: UseMutateFunction<RevokeMAppPermissionResponse, Error, RevokeEbdcPermissionRequest, unknown>;
  isRevokeEbdcPermissionPending: boolean;
}

export interface RevokeEbdcPermissionRequest {
  subname: string
}

export interface UseRevokeMAppPermissionParams {
  mApp: string
}

export const useRevokeMAppPermission = ({ mApp }: UseRevokeMAppPermissionParams): UseRequestRevokeEbdcPermission => {
  const { justaname } = useJustaName()
  const { signMessageAsync } = useSignMessage()
  const { address} = useMountedAccount()
  const { refetchAccountSubnames } = useAccountSubnames()
  const mutate = useMutation<
    RevokeMAppPermissionResponse,
    Error,
    RevokeEbdcPermissionRequest
  >({
    mutationFn: async (
      params:RevokeEbdcPermissionRequest
    ) => {
      if (!address) {
        throw new Error('Wallet not connected')
      }
      const challengeResponse = await justaname.mApps.requestRevokeMAppPermissionChallenge({
        subname: params.subname,
        address: address,
        mApp: mApp
      })

      const signature = await signMessageAsync({
        message: challengeResponse.challenge,
        account: address
      })

      const response = await justaname.mApps.revokeMAppPermission({
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