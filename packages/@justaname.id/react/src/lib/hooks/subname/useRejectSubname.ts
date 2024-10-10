'use client';

import { sanitizeRecords, SubnameRejectRoute } from '@justaname.id/sdk';
import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName, useSubnameSignature } from '../../providers';
import { useAccountSubnames } from '../account/useAccountSubnames';
import { useMountedAccount } from '../account/useMountedAccount';
import { useAccountInvitations } from '../account/useAccountInvitations';
import { splitDomain } from '../../helpers';
import { useMemo } from 'react';
import { Records } from '../../types';

export interface UseRejectSubnameFunctionParams extends Omit<SubnameRejectRoute['params'], 'ensDomain' | 'username'> {
  ens: string;
}

export type UseRejectSubnameParams = Omit<UseRejectSubnameFunctionParams, 'ens'>

export interface UseRejectSubnameResult {
  rejectSubname: UseMutateAsyncFunction<Records, Error, UseRejectSubnameFunctionParams>;
  isRejectSubnamePending: boolean;
}

export const useRejectSubname = (params?: UseRejectSubnameParams): UseRejectSubnameResult => {
  const { justaname, chainId } = useJustaName();
  const { address } = useMountedAccount();
  const { refetchInvitations } = useAccountInvitations();
  const { getSignature } = useSubnameSignature();
  const { refetchAccountSubnames } = useAccountSubnames();
  const _chainId = useMemo(() => params?.chainId || chainId, [params?.chainId, chainId]);

  const mutate = useMutation({
    mutationFn: async (_params: UseRejectSubnameFunctionParams) => {
      if (!address) {
        throw new Error('No address found');
      }

      const _ens = _params.ens

      const [_username, _ensDomain] = splitDomain(_ens);

      const signature = await getSignature();

      const rejected = await  justaname.subnames.rejectSubname({
        ensDomain: _ensDomain,
        chainId: _params.chainId || _chainId,
        username: _username,
      }, {
        xAddress: address,
        xSignature: signature.signature,
        xMessage: signature.message,
      });

      refetchAccountSubnames();
      refetchInvitations();
      return {
        ...rejected,
        sanitizedRecords: sanitizeRecords(rejected),
      }
    },
  });

  return {
    rejectSubname: mutate.mutateAsync,
    isRejectSubnamePending: mutate.isPending,
  };
};
