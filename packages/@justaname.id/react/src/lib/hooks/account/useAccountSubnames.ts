"use client";

import {
  QueryObserverResult,
  RefetchOptions
} from '@tanstack/react-query';
import { ChainId } from '@justaname.id/sdk';
import { useMountedAccount } from './useMountedAccount';
import { useAddressSubnames } from '../subname/useAddressSubnames';
import { Records } from '../../types';
import { useJustaName } from '../../providers';

export interface UseConnectedWalletSubnamesOptions {
  chainId?: ChainId;
}

interface UseAccountSubnamesResult {
  accountSubnames: Records[];
  isAccountSubnamesPending: boolean;
  isAccountSubnamesFetching: boolean;
  isAccountSubnamesLoading: boolean
  refetchAccountSubnames: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Records[] | undefined, unknown>>;
}

export const useAccountSubnames = (
  params?: UseConnectedWalletSubnamesOptions
): UseAccountSubnamesResult => {
  const { chainId } = useJustaName()
  const { address } = useMountedAccount();
  const _chainId = params?.chainId || chainId;
  const {
    addressSubnames,
    isAddressSubnamesFetching,
    isAddressSubnamesPending,
    isAddressSubnamesLoading,
    refetchAddressSubnames
  } = useAddressSubnames({
    chainId: _chainId,
    address
  })

  return {
    accountSubnames: addressSubnames,
    isAccountSubnamesPending: isAddressSubnamesPending,
    isAccountSubnamesFetching: isAddressSubnamesFetching,
    isAccountSubnamesLoading: isAddressSubnamesLoading,
    refetchAccountSubnames: refetchAddressSubnames
  }
};
