import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId, RevokeMAppPermissionResponse } from '@justaname.id/sdk';
import { useSignMessage } from 'wagmi';
import { useAccountSubnames, useMountedAccount } from '../account';
import { buildIsMAppEnabledKey } from './useIsMAppEnabled';

export interface UseRequestRevokeMAppPermissionResult {
  revokeMAppPermission: UseMutateFunction<RevokeMAppPermissionResponse, Error, RevokeMAppPermissionRequest, unknown>;
  isRevokeMAppPermissionPending: boolean;
}

export interface RevokeMAppPermissionRequest {
  ens: string
}

export interface UseRevokeMAppPermissionParams {
  mApp: string,
  chainId?: ChainId
}

export const useRevokeMAppPermission = (props: UseRevokeMAppPermissionParams): UseRequestRevokeMAppPermissionResult => {
  const { justaname, chainId } = useJustaName()
  const queryClient = useQueryClient()
  const currentChainId = props.chainId || chainId
  const { signMessageAsync } = useSignMessage()
  const { address} = useMountedAccount()
  const { refetchAccountSubnames } = useAccountSubnames()
  const mutate = useMutation<
    RevokeMAppPermissionResponse,
    Error,
    RevokeMAppPermissionRequest
  >({
    mutationFn: async (
      params:RevokeMAppPermissionRequest
    ) => {
      if (!address) {
        throw new Error('Wallet not connected')
      }
      const challengeResponse = await justaname.mApps.requestRevokeMAppPermissionChallenge({
        subname: params.ens,
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
        queryKey: buildIsMAppEnabledKey(params.ens, props.mApp, currentChainId)
      })
      refetchAccountSubnames()
      return response
    }
  })

  return {
    revokeMAppPermission: mutate.mutateAsync,
    isRevokeMAppPermissionPending: mutate.isPending
  }
}