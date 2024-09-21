import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId, RevokeMAppPermissionResponse } from '@justaname.id/sdk';
import { useSignMessage } from 'wagmi';
import { useAccountSubnames, useMountedAccount } from '../account';
import { buildIsMAppEnabledKey } from './useIsMAppEnabled';

export interface UseRequestRevokeEbdcPermission {
  revokeEbdcPermission: UseMutateFunction<RevokeMAppPermissionResponse, Error, RevokeEbdcPermissionRequest, unknown>;
  isRevokeEbdcPermissionPending: boolean;
}

export interface RevokeEbdcPermissionRequest {
  subname: string
}

export interface UseRevokeMAppPermissionParams {
  mApp: string,
  chainId?: ChainId
}

export const useRevokeMAppPermission = (props: UseRevokeMAppPermissionParams): UseRequestRevokeEbdcPermission => {
  const { justaname, chainId } = useJustaName()
  const queryClient = useQueryClient()
  const currentChainId = props.chainId || chainId
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
        mApp: props.mApp,
        chainId: currentChainId
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

      queryClient.invalidateQueries({
        queryKey: buildIsMAppEnabledKey(params.subname, props.mApp, currentChainId)
      })
      refetchAccountSubnames()
      return response
    }
  })

  return {
    revokeEbdcPermission: mutate.mutate,
    isRevokeEbdcPermissionPending: mutate.isPending
  }
}