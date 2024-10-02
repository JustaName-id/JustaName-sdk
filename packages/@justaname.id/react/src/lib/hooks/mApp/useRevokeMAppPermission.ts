import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId, RevokeMAppPermissionResponse } from '@justaname.id/sdk';
import { useSignMessage } from 'wagmi';
import { useAccountSubnames, useMountedAccount } from '../account';
import { useRecords } from '../records';

export interface UseRequestRevokeMAppPermissionResult {
  revokeMAppPermission: UseMutateAsyncFunction<RevokeMAppPermissionResponse, Error, RevokeMAppPermissionRequest, unknown>;
  isRevokeMAppPermissionPending: boolean;
}

export interface RevokeMAppPermissionRequest {
  ens: string
}

export interface UseRevokeMAppPermissionParams {
  mApp: string,
  chainId?: ChainId,
  providerUrl?: string
}

export const useRevokeMAppPermission = (props: UseRevokeMAppPermissionParams): UseRequestRevokeMAppPermissionResult => {
  const { justaname, chainId, providerUrl } = useJustaName()
  const currentChainId = props.chainId || chainId
  const currentProviderUrl = props.providerUrl || providerUrl
  const { signMessageAsync } = useSignMessage()
  const { address} = useMountedAccount()
  const { refetchAccountSubnames } = useAccountSubnames()
  const { getRecords } = useRecords()
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

      refetchAccountSubnames()
      getRecords({
        fullName: params.ens,
        chainId: currentChainId,
        providerUrl: currentProviderUrl
      }, true)

      return response
    }
  })

  return {
    revokeMAppPermission: mutate.mutateAsync,
    isRevokeMAppPermissionPending: mutate.isPending
  }
}