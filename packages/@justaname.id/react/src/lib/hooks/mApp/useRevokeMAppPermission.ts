import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { ChainId, RevokeMAppPermissionResponse } from '@justaname.id/sdk';
import { useSignMessage } from 'wagmi';
import { useAccountSubnames, useMountedAccount } from '../account';
import { useRecords } from '../records';
import { useMemo } from 'react';

export interface UseRequestRevokeMAppPermissionResult {
  revokeMAppPermission: UseMutateAsyncFunction<RevokeMAppPermissionResponse, Error, UseRevokeMAppPermissionFunctionParams, unknown>;
  isRevokeMAppPermissionPending: boolean;
}

export interface UseRevokeMAppPermissionFunctionParams {
  ens: string
}

export interface UseRevokeMAppPermissionParams {
  mApp: string,
  chainId?: ChainId,
  providerUrl?: string
}

export const useRevokeMAppPermission = (params: UseRevokeMAppPermissionParams): UseRequestRevokeMAppPermissionResult => {
  const { justaname, chainId } = useJustaName()
  const _chainId = useMemo(() => params.chainId || chainId, [params.chainId, chainId])
  const { signMessageAsync } = useSignMessage()
  const { address} = useMountedAccount()
  const { refetchAccountSubnames } = useAccountSubnames()
  const { getRecords } = useRecords()
  const mutate = useMutation<
    RevokeMAppPermissionResponse,
    Error,
    UseRevokeMAppPermissionFunctionParams
  >({
    mutationFn: async (
      _params:UseRevokeMAppPermissionFunctionParams
    ) => {
      if (!address) {
        throw new Error('Wallet not connected')
      }
      const challengeResponse = await justaname.mApps.requestRevokeMAppPermissionChallenge({
        subname: _params.ens,
        address: address,
        mApp: params.mApp,
        chainId: _chainId
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
        ens: _params.ens,
        chainId: _chainId,
      }, true)

      return response
    }
  })

  return {
    revokeMAppPermission: mutate.mutateAsync,
    isRevokeMAppPermissionPending: mutate.isPending
  }
}