import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { AddMAppPermissionResponse, ChainId } from '@justaname.id/sdk';
import { useSignMessage } from 'wagmi';
import { useAccountSubnames, useMountedAccount } from '../account';
import { useRecords } from '../records';

export interface UseRequestAddMAppPermission {
  addMAppPermission: UseMutateAsyncFunction<AddMAppPermissionResponse, Error, AddMAppPermissionRequest, unknown>;
  isAddMAppPermissionPending: boolean;
}

export interface AddMAppPermissionRequest {
  subname: string
}

export interface UseAddMAppPermissionParams {
  mApp: string
  chainId?: ChainId
  providerUrl?: string
}


export const useAddMAppPermission = (props : UseAddMAppPermissionParams): UseRequestAddMAppPermission => {
  const { justaname, chainId, providerUrl  } = useJustaName()
  const { signMessageAsync } = useSignMessage()
  const { address} = useMountedAccount()
  const { getRecords } = useRecords()
  const currentChainId = props.chainId || chainId
  const currentProviderUrl = props.providerUrl || providerUrl
  const { refetchAccountSubnames } = useAccountSubnames()
  const mutate = useMutation<
    AddMAppPermissionResponse,
    Error,
    AddMAppPermissionRequest
  >({
    mutationFn: async (
      params:AddMAppPermissionRequest
    ) => {
      if (!address) {
        throw new Error('Wallet not connected')
      }
      const challengeResponse = await justaname.mApps.requestAddMAppPermissionChallenge({
        subname: params.subname,
        address: address,
        mApp: props.mApp,
        chainId: currentChainId,
      })

      const signature = await signMessageAsync({
        message: challengeResponse.challenge,
        account: address
      })

      const response = await justaname.mApps.addMAppPermission({
        message: challengeResponse.challenge,
        address: address,
        signature,
      })

      refetchAccountSubnames()

      getRecords({
        fullName: params.subname,
        chainId: currentChainId,
        providerUrl: currentProviderUrl
      }, true)
      return response
    }
  })
  
  return {
    addMAppPermission: mutate.mutateAsync,
    isAddMAppPermissionPending: mutate.isPending
  }
}