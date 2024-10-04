import { useMountedAccount } from './useMountedAccount';
import { ChainId, SanitizedRecords, SubnameRecordsResponse } from '@justaname.id/sdk';
import { useAddressEnsNames } from '../ens';

export interface UseAccountEnsNamesParams {
  chainId?: ChainId
}

export interface UseAccountEnsNamesResult {
  accountEnsNames: {
    records: SubnameRecordsResponse,
    sanitizedRecords: SanitizedRecords,
    name: string,
  }[];
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