import { useMountedAccount } from './useMountedAccount';
import { ChainId, SanitizedRecords, SubnameRecordsResponse } from '@justaname.id/sdk';
import { useAddressEnsNames } from './useAddressEnsNames';

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
  refetchAccountEnsNames: () => void;
}

export const useAccountEnsNames = (props?: UseAccountEnsNamesParams): UseAccountEnsNamesResult => {
  const { address } = useMountedAccount()
  const { addressEnsNames , isAddressEnsNamesPending, refetchAddressEnsNames} = useAddressEnsNames({
    address,
    chainId: props?.chainId
  })

  return {
    accountEnsNames: addressEnsNames,
    isAccountEnsNamesPending: isAddressEnsNamesPending,
    refetchAccountEnsNames: refetchAddressEnsNames
  }
}