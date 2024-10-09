import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId, RequestAddMAppPermissionChallengeRoute, AddMAppPermissionRoute } from '@justaname.id/sdk';
import { useSignMessage } from 'wagmi';
import { useAccountSubnames, useMountedAccount } from '../account';
import { useRecords } from '../records';
import { useMemo } from 'react';

export interface UseAddMAppPermissionFunctionParams extends Omit<RequestAddMAppPermissionChallengeRoute['params'], 'mApp' | "address"> {
  mApp?: string
}

export interface UseAddMAppPermissionParams extends Omit<UseAddMAppPermissionFunctionParams, 'subname' | 'address'> {
  mApp: string
  chainId?: ChainId
}

export interface UseRequestAddMAppPermission {
  addMAppPermission: UseMutateAsyncFunction<AddMAppPermissionRoute['response'], Error, UseAddMAppPermissionFunctionParams, unknown>,
  isAddMAppPermissionPending: boolean;
}


export const useAddMAppPermission = (params: UseAddMAppPermissionParams): UseRequestAddMAppPermission => {
  const { justaname, chainId  } = useJustaName()
  const { signMessageAsync } = useSignMessage()
  const { address} = useMountedAccount()
  const { getRecords } = useRecords()
  const _chainId = useMemo(() => params.chainId || chainId, [params.chainId, chainId])

  const { refetchAccountSubnames } = useAccountSubnames()
  const mutate = useMutation({
    mutationFn: async (
      _params: UseAddMAppPermissionFunctionParams
    ) => {
      if (!address) {
        throw new Error('Wallet not connected')
      }

      const challengeResponse = await justaname.mApps.requestAddMAppPermissionChallenge({
        subname: _params.subname,
        address: address,
        mApp: _params?.mApp || params.mApp,
        chainId: _params?.chainId || _chainId
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
        ens: _params.subname,
        chainId: _chainId,
      }, true)
      return response
    }
  })
  
  return {
    addMAppPermission: mutate.mutateAsync,
    isAddMAppPermissionPending: mutate.isPending
  }
}