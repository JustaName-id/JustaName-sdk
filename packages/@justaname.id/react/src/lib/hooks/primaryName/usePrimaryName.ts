import { Address } from 'viem';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChainId } from '@justaname.id/sdk';
import { useJustaName } from '../../providers';
import { useEnsPublicClient } from '../client/useEnsPublicClient';
import { defaultOptions } from '../../query';
import { getName } from '@ensdomains/ensjs/public';
import { PrimaryNameTaskQueue } from './primary-name-task-queue';
import { buildPrimaryNameBatchKey } from './usePrimaryNameBatch';

export const buildPrimaryName = (
  address: string,
  chainId: ChainId | undefined
) => ['PRIMARY_NAME', address, chainId];

export interface UsePrimaryNameParams {
  address?: string;
  chainId?: ChainId;
  enabled?: boolean;
}

export interface UsePrimaryNameResult {
  primaryName: string | undefined;
  isPrimaryNamePending: boolean;
  isPrimaryNameFetching: boolean;
  isPrimaryNameLoading: boolean;
  getPrimaryName: (
    params: getPrimaryNameParams,
    force?: boolean
  ) => Promise<string>;
  refetchPrimaryName: () => void;
}

export interface getPrimaryNameParams {
  address: Address | undefined;
  chainId?: ChainId;
}

export const usePrimaryName = (
  params?: UsePrimaryNameParams
): UsePrimaryNameResult => {
  const { chainId, justaname } = useJustaName();
  const _enabled = params?.enabled !== undefined ? params.enabled : true;
  const _chainId = params?.chainId || chainId;
  const { ensClient } = useEnsPublicClient({
    chainId: _chainId,
  });
  const queryClient = useQueryClient();

  const getPrimaryName = async (
    _params: getPrimaryNameParams
  ): Promise<string> => {
    if (!ensClient) {
      throw new Error('Public client not found');
    }

    if (!params?.address) {
      throw new Error('Address is required');
    }

    let name = '';

    const primaryNames = queryClient.getQueryData(
      buildPrimaryNameBatchKey(_chainId)
    ) as Record<string, string>;

    if (primaryNames && _params?.address) {
      if (primaryNames[_params?.address]) {
        return primaryNames[_params.address];
      }
    }

    const primaryNameGetByAddressResponse =
      await justaname.subnames.getPrimaryNameByAddress({
        address: params?.address,
        chainId: _chainId,
      });
    if (primaryNameGetByAddressResponse.name) {
      name = primaryNameGetByAddressResponse.name;
    } else {
      const taskFn = () => {
        if (!params?.address) {
          throw new Error('Address is required');
        }
        return getName(ensClient, {
          address: params?.address as Address,
        });
      };

      const reverseResolution = await PrimaryNameTaskQueue.enqueue(taskFn);

      if (reverseResolution && reverseResolution?.name) {
        name = reverseResolution.name;
      }
    }
    return name;
  };

  const query = useQuery({
    ...defaultOptions,
    retry: (_count, error) => {
      if (error?.message.includes('PrimaryNameNotFound')) {
        return false;
      }
      return _count < 3;
    },
    queryKey: buildPrimaryName(params?.address || '', _chainId),
    queryFn: () =>
      getPrimaryName({
        address: params?.address as Address,
      }),
    enabled:
      Boolean(params?.address) && Boolean(ensClient) && Boolean(_enabled),
  });

  const getPrimaryNameInternal = async (
    params: getPrimaryNameParams,
    force = false
  ): Promise<string> => {
    const _address = params.address || params?.address;
    if (!_address) {
      throw new Error('Address is required');
    }
    if (!force) {
      const cachedNames = queryClient.getQueryData(
        buildPrimaryName(_address, _chainId)
      ) as string;
      if (cachedNames) {
        return cachedNames;
      }
    }
    const names = await getPrimaryName({
      address: _address,
      chainId: _chainId,
    });
    queryClient.setQueryData(buildPrimaryName(_address, _chainId), names);
    return names;
  };

  return {
    primaryName: query.data,
    getPrimaryName: getPrimaryNameInternal,
    isPrimaryNamePending: query.isPending,
    isPrimaryNameFetching: query.isFetching,
    isPrimaryNameLoading: query.isLoading,
    refetchPrimaryName: query.refetch,
  };
};
