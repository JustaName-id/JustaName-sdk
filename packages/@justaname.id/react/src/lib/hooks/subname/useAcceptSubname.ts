'use client';

import {
  sanitizeRecords,
  SubnameAcceptRoute
} from '@justaname.id/sdk';
import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { useJustaName, useSubnameSignature } from '../../providers';
import { useAccountSubnames } from '../account/useAccountSubnames';
import { useMountedAccount } from '../account/useMountedAccount';
import { useAccountInvitations } from '../account/useAccountInvitations';
import { splitDomain } from '../../helpers';
import { useMemo } from 'react';
import { Records } from '../../types';

export interface UseAcceptSubnameFunctionParams extends Omit<SubnameAcceptRoute['params'], 'ensDomain' | 'username'> {
  ens: string;
}

export type UseAcceptSubnameParams = Omit<UseAcceptSubnameFunctionParams, "ens">

export interface UseAcceptSubnameResult {
  acceptSubname: UseMutateAsyncFunction<Records, Error, UseAcceptSubnameFunctionParams>;
  isAcceptSubnamePending: boolean;
}

export const useAcceptSubname = (params?: UseAcceptSubnameParams): UseAcceptSubnameResult => {
  const { justaname, chainId } = useJustaName();
  const { address } = useMountedAccount();
  const { refetchInvitations } = useAccountInvitations();
  const { getSignature } = useSubnameSignature();
  const { refetchAccountSubnames } = useAccountSubnames();
  const _chainId = useMemo(() => params?.chainId || chainId, [params?.chainId, chainId]);

  const mutate = useMutation(
    {
      mutationFn: async (_params: UseAcceptSubnameFunctionParams) => {
        if (!address) {
          throw new Error('No address found');
        }

        const _ens = _params.ens
        const [_username, _ensDomain] = splitDomain(_ens);
        const signature = await getSignature();
        const accepted = await justaname.subnames.acceptSubname(
          {
            addresses: _params.addresses,
            chainId: _params.chainId || _chainId,
            contentHash: _params.contentHash,
            ensDomain: _ensDomain,
            text: _params.text,
            username: _username,
          },
          {
            xAddress: address,
            xSignature: signature.signature,
            xMessage: signature.message,
          }
        );

        refetchAccountSubnames();
        refetchInvitations();

        return {
          ...accepted,
          sanitizedRecords: sanitizeRecords(accepted)
        }
      },
    }
  );

  return {
    acceptSubname: mutate.mutateAsync,
    isAcceptSubnamePending: mutate.isPending,
  };
};
