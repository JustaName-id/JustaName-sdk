"use client";

import {
  QueryObserverResult,
  RefetchOptions
} from '@tanstack/react-query';
import { ChainId, SubnameGetAllByAddressResponse } from '@justaname.id/sdk';
import { useMountedAccount } from './useMountedAccount';
import { useAddressSubnames } from '../subname/useAddressSubnames';

export const buildAccountSubnamesKey = (
  address: string | undefined,
  chainId: ChainId,
) => [
  'WALLET_SUBNAMES_BY_ADDRESS', address, chainId]

export interface UseConnectedWalletSubnamesOptions {
  chainId?: ChainId;
}

interface UseAccountSubnamesResult {
  accountSubnames: SubnameGetAllByAddressResponse;
  isAccountSubnamesPending: boolean;
  isAccountSubnamesFetching: boolean;
  isAccountSubnamesLoading: boolean
  refetchAccountSubnames: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SubnameGetAllByAddressResponse | undefined, unknown>>;
}

export const useAccountSubnames = (
  params?: UseConnectedWalletSubnamesOptions
): UseAccountSubnamesResult => {
  const { address } = useMountedAccount();
  const {
    addressSubnames,
    isAddressSubnamesFetching,
    isAddressSubnamesPending,
    isAddressSubnamesLoading,
    refetchAddressSubnames
  } = useAddressSubnames({
    chainId: params?.chainId,
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
