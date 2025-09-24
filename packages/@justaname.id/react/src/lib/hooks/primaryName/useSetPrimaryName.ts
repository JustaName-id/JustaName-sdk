'use client';

import { SetPrimaryNameRoute } from '@justaname.id/sdk';
import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useJustaName, useSubnameSignature } from '../../providers';
import { useMountedAccount } from '../account/useMountedAccount';
import { usePrimaryName } from './usePrimaryName';

export interface UseSetPrimaryNameFunctionParams {
  name: string;
}

export type UseSetPrimaryNameParams = Omit<
SetPrimaryNameRoute['params'],
  'name'
>;

export interface UseSetPrimaryNameResult {
  setPrimaryName: UseMutateAsyncFunction<
    SetPrimaryNameRoute['response'],
    Error,
    UseSetPrimaryNameFunctionParams
  >;
  isSetPrimaryNamePending: boolean;
}

export const useSetPrimaryName = (
  params?: UseSetPrimaryNameParams
): UseSetPrimaryNameResult => {
  const { justaname, chainId } = useJustaName();
  const { address } = useMountedAccount();
  const { getSignature } = useSubnameSignature();
  const {refetchPrimaryName} = usePrimaryName({
    address: address || '',
    enabled: !!address,
  });
  const _chainId = useMemo(
    () => params?.chainId || chainId,
    [params?.chainId, chainId]
  );

  const mutate = useMutation({
    mutationFn: async (_params: UseSetPrimaryNameFunctionParams) => {
      if (!address) {
        throw new Error('No address found');
      }

      const _name = _params.name;
      const signature = await getSignature();
      const primaryNameSet = await justaname.subnames.setPrimaryName(
        {
          address,
          name: _name,
          chainId: _chainId,
        },
        {
          xAddress: address,
          xSignature: signature.signature,
          xMessage: signature.message,
        }
      );
      refetchPrimaryName();
      return primaryNameSet;
    },
  });

  return {
    setPrimaryName: mutate.mutateAsync,
    isSetPrimaryNamePending: mutate.isPending,
  };
};
