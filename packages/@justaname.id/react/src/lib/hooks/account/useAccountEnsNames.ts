import { useMountedAccount } from './useMountedAccount';
import { ChainId } from '@justaname.id/sdk';
import { useAddressEnsNames } from '../ens';
import { Records } from '../../types';

export interface UseAccountEnsNamesParams {
  chainId?: ChainId
}

export interface UseAccountEnsNamesResult {
  accountEnsNames: Records[];
  isAccountEnsNamesPending: boolean;
  isAccountEnsNamesFetching: boolean;
  isAccountEnsNamesLoading: boolean;
  refetchAccountEnsNames: () => void;
}

export const useAccountEnsNames = (props?: UseAccountEnsNamesParams): UseAccountEnsNamesResult => {
  const { address } = useMountedAccount()
  const {
    addressEnsNames ,
    isAddressEnsNamesPending,
    isAddressEnsNamesFetching,
    isAddressEnsNamesLoading,
    refetchAddressEnsNames
  } = useAddressEnsNames({
    address,
    chainId: props?.chainId
  })

  return {
    accountEnsNames: addressEnsNames,
    isAccountEnsNamesPending: isAddressEnsNamesPending,
    isAccountEnsNamesLoading: isAddressEnsNamesLoading,
    isAccountEnsNamesFetching: isAddressEnsNamesFetching,
    refetchAccountEnsNames: refetchAddressEnsNames
  }
}