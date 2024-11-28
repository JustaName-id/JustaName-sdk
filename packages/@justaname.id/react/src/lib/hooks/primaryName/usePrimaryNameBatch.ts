import { Address } from 'viem';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChainId } from '@justaname.id/sdk';
import { useJustaName } from '../../providers';
import { useEnsPublicClient } from '../client/useEnsPublicClient';
import { defaultOptions } from '../../query';
import { batch, getName } from '@ensdomains/ensjs/public';
import { buildPrimaryName } from './usePrimaryName';

export const buildPrimaryNameBatchByAddressesKey = (
  addresses: string[],
  chainId: ChainId | undefined
) => ['PRIMARY_NAME_BATCH', addresses, chainId];

export const buildPrimaryNameBatchKey = (chainId: ChainId | undefined) => [
  'ALL_PRIMARY_NAME_BATCH',
  chainId,
];

export type PrimaryNameRecord = Record<string | Address, string | null>;

export interface UsePrimaryNameBatchParams {
  addresses?: Address[];
  chainId?: ChainId;
  enabled?: boolean;
}

export interface UsePrimaryNameBatchResult {
  primaryNames: PrimaryNameRecord | undefined;
  allPrimaryNames: PrimaryNameRecord | undefined;
  isPrimaryNameBatchPending: boolean;
  isPrimaryNameBatchFetching: boolean;
  isPrimaryNameBatchLoading: boolean;
  refetchPrimaryNameBatch: () => void;
}

export interface getPrimaryNameBatchParams {
  addresses: Address[] | undefined;
  chainId?: ChainId;
}

export const usePrimaryNameBatch = (
  params?: UsePrimaryNameBatchParams
): UsePrimaryNameBatchResult => {
  const { chainId, justaname } = useJustaName();
  const _enabled = params?.enabled !== undefined ? params.enabled : true;
  const _chainId = params?.chainId || chainId;
  const { ensClient } = useEnsPublicClient({
    chainId: _chainId,
  });
  const queryClient = useQueryClient();

  const getPrimaryNameBatch = async (
    _params: getPrimaryNameBatchParams
  ): Promise<PrimaryNameRecord> => {
    if (!ensClient) {
      throw new Error('Public client not found');
    }

    if (!params?.addresses || params?.addresses.length === 0) {
      throw new Error('Address is required');
    }

    const primaryNameBatch: PrimaryNameRecord = params?.addresses.reduce(
      (acc, address) => {
        if (address) {
          acc[address] = null;
        }
        return acc;
      },
      {} as PrimaryNameRecord
    );

    params?.addresses.forEach((address) => {
      const primaryName = queryClient.getQueryData(
        buildPrimaryName(address, _chainId)
      );
      if (typeof primaryName === 'string') {
        primaryNameBatch[address] = primaryName;
      }
    });

    let checkMissing = Object.keys(primaryNameBatch).filter(
      (address) => primaryNameBatch[address] === null
    );

    const batchCalls = checkMissing?.map((address) =>
      getName.batch({ address: address as Address })
    );

    const names = await batch(ensClient, ...batchCalls);

    names.forEach((name, index) => {
      if (name && name.name) {
        primaryNameBatch[checkMissing[index]] = name?.name;
      }
    });

    checkMissing = Object.keys(primaryNameBatch).filter(
      (address) => primaryNameBatch[address] === null
    );

    const justanamePrimaryNames = await Promise.all(
      checkMissing.map((address) =>
        justaname.subnames.getPrimaryNameByAddress({
          address: address,
          chainId: _chainId,
        })
      )
    );

    justanamePrimaryNames.forEach((name, index) => {
      if (name.name) {
        primaryNameBatch[checkMissing[index]] = name.name;
      } else {
        primaryNameBatch[checkMissing[index]] = '';
      }
    });

    Object.keys(primaryNameBatch).forEach((address) => {
      queryClient.setQueryData(
        buildPrimaryName(address, _chainId),
        primaryNameBatch[address]
      );
    });

    queryClient.setQueryData(
      buildPrimaryNameBatchKey(_chainId),
      (prev: PrimaryNameRecord) => ({
        ...prev,
        ...primaryNameBatch,
      })
    );

    return primaryNameBatch;
  };

  const query = useQuery({
    ...defaultOptions,
    queryKey: buildPrimaryNameBatchByAddressesKey(
      params?.addresses || [],
      _chainId
    ),
    queryFn: () =>
      getPrimaryNameBatch({
        addresses: params?.addresses,
      }),
    enabled:
      Boolean(params?.addresses) && Boolean(ensClient) && Boolean(_enabled),
  });

  const allQuery = useQuery({
    ...defaultOptions,
    queryKey: buildPrimaryNameBatchKey(_chainId),
    queryFn: () => {
      return {} as PrimaryNameRecord;
    },
    enabled: false,
  });

  return {
    primaryNames: query.data,
    isPrimaryNameBatchPending: query.isPending,
    allPrimaryNames: allQuery.data,
    isPrimaryNameBatchFetching: query.isFetching,
    isPrimaryNameBatchLoading: query.isLoading,
    refetchPrimaryNameBatch: query.refetch,
  };
};
