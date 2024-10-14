import { Address } from 'viem';
import { getNamesForAddress } from '@ensdomains/ensjs/subgraph';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChainId } from '@justaname.id/sdk';
import { useJustaName } from '../../providers';
import { useEnsPublicClient } from '../client/useEnsPublicClient';
import { useRecords } from '../records';
import { Records } from '../../types';

export const buildAddressEnsNames = (
  address: string,
  chainId: ChainId | undefined
) => ['ACCOUNT_ENS_NAMES', address, chainId];

export interface UseAddressEnsNamesParams {
  address?: Address;
  chainId?: ChainId;
}

export interface UseAddressEnsNamesResult {
  addressEnsNames: Records[];
  isAddressEnsNamesPending: boolean;
  isAddressEnsNamesFetching: boolean;
  isAddressEnsNamesLoading: boolean;
  getEnsNamesForAddress: (address: Address) => Promise<Records[]>;
  refetchAddressEnsNames: () => void;
}

export interface GetEnsNamesForAddressParams {
  address: Address | undefined;
}

export const useAddressEnsNames = (
  params?: UseAddressEnsNamesParams
): UseAddressEnsNamesResult => {
  const { ensClient } = useEnsPublicClient();
  const queryClient = useQueryClient();
  const { chainId } = useJustaName();
  const _chainId = params?.chainId || chainId;
  const { getRecords } = useRecords();

  const getEnsNamesForAddress = async (
    _params: GetEnsNamesForAddressParams
  ): Promise<Records[]> => {
    if (!ensClient) {
      throw new Error('Public client not found');
    }

    if (!params?.address) {
      throw new Error('Address is required');
    }

    const names = await getNamesForAddress(ensClient, {
      address: params?.address,
    });

    const records = await Promise.allSettled([
      ...names
        .filter((name) => !!name?.name)
        .map(async (name) =>
          getRecords({
            ens: name?.name || '',
            chainId: _chainId,
          })
        ),
    ]);

    return records
      .filter((record) => record.status === 'fulfilled')
      .map((record) => record?.value)
      .filter((record) => !!record && !!record.sanitizedRecords) as Records[];
  };

  const query = useQuery({
    queryKey: buildAddressEnsNames(params?.address || '', _chainId),
    queryFn: () =>
      getEnsNamesForAddress({
        address: params?.address,
      }),
    enabled:
      Boolean(params?.address) && Boolean(_chainId) && Boolean(ensClient),
  });

  const getEnsNamesForAddressInternal = async (
    address: Address,
    force = false
  ): Promise<Records[]> => {
    if (!force) {
      const cachedNames = queryClient.getQueryData(
        buildAddressEnsNames(address, _chainId)
      ) as Records[];
      if (cachedNames) {
        return cachedNames;
      }
    }
    const names = await getEnsNamesForAddress({ address });
    queryClient.setQueryData(buildAddressEnsNames(address, _chainId), names);
    return names;
  };

  return {
    addressEnsNames: query.data ?? [],
    getEnsNamesForAddress: getEnsNamesForAddressInternal,
    isAddressEnsNamesPending: query.isPending,
    isAddressEnsNamesFetching: query.isFetching,
    isAddressEnsNamesLoading: query.isLoading,
    refetchAddressEnsNames: query.refetch,
  };
};
