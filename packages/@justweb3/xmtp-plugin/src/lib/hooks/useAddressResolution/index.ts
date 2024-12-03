import { addressResolution } from '@justaname.id/address-resolution';
import {
  getPrimaryNameParams,
  useMountedAccount,
  usePrimaryName,
} from '@justaname.id/react';
import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';

export interface AddressResolutionResponse {
  id: string;
  name: string;
  address: string;
  nameHash: string;
  chainId: number;
}

export const buildAddressResolutionByAddressKey = (address: string) => [
  'ADDRESS_RESOLUTION_BY_ADDRESS',
  address,
];
export const getAddressResolutionNameByAddress = async (
  address: string,
  chainId: ChainId | undefined,
  getPrimaryName: (
    params: getPrimaryNameParams,
    force?: boolean
  ) => Promise<string>
): Promise<string | null> => {
  try {
    const name = await addressResolution(
      address,
      //   TODO: fix
      process.env.NEXT_PUBLIC_PROVIDER_URL ?? ''
    );
    if (!name) {
      const backName = await getPrimaryName({
        address: address as `0x${string}`,
        chainId,
      });
      if (!!backName) {
        return backName as string;
      } else {
        return null;
      }
    } else {
      return name as string;
    }
  } catch (error) {
    return null;
  }
};

export const useAddressResolutionName = (address: string, isValid = true) => {
  const { chainId } = useMountedAccount();
  const { getPrimaryName } = usePrimaryName();
  const query = useQuery({
    queryKey: buildAddressResolutionByAddressKey(address || ''),
    queryFn: () =>
      getAddressResolutionNameByAddress(
        address || '',
        chainId as ChainId,
        getPrimaryName
      ),
    enabled: address.length == 42 && isValid,
  });
  return {
    isAddressResolving: query.isPending,
    name: query.data,
    refetchAddressResolution: query.refetch,
  };
};
