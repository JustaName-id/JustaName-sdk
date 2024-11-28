import { useJustaName } from '../../providers';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  ChainId,
  coinTypeMap,
  generalKeys,
  sanitizeRecords,
  SUPPORTED_SOCIALS,
} from '@justaname.id/sdk';
import { useMemo } from 'react';
import { Records } from '../../types';
import { defaultOptions } from '../../query';
import { buildRecordsBySubnameKey, useRecords } from './useRecords';
import { useEnsPublicClient } from '../client/useEnsPublicClient';
import { Address } from 'viem';
import {
  batch,
  getRecords as getEnsRecords,
  getResolver,
} from '@ensdomains/ensjs/public';
import { checkEnsValid } from '../../helpers/checkEnsValid';
import { useOffchainResolvers } from '../offchainResolver';

export const buildStandardRecordsBatchByEnsesKey = (
  enses: string[],
  chainId: ChainId | undefined
) => ['ALL_RECORDS_BY_ENSES', enses, chainId];

export const buildStandardRecordsBatchKey = (chainId: ChainId | undefined) => [
  'ALL_RECORDS',
  chainId,
];

export type RecordsRecord = Record<string | Address, Records | undefined>;

export interface UseStandardRecordsBatchParams {
  enses?: string[] | undefined;
  chainId?: ChainId | undefined;
  enabled?: boolean;
}

export interface getStandardRecordsBatchParams {
  enses: string[] | undefined;
  chainId?: ChainId;
}

export interface UseStandardRecordsBatchResult {
  isStandardRecordsBatchPending: boolean;
  isStandardRecordsBatchFetching: boolean;
  isStandardRecordsBatchLoading: boolean;
  recordsBatch: RecordsRecord | undefined;
  allRecordsBatch: RecordsRecord | undefined;
  refetchStandardRecordsBatch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<RecordsRecord | undefined, unknown>>;
}

export const useStandardRecordsBatch = (
  params?: UseStandardRecordsBatchParams
): UseStandardRecordsBatchResult => {
  const { chainId, networks } = useJustaName();
  const queryClient = useQueryClient();
  const { offchainResolvers } = useOffchainResolvers();
  const { getRecords } = useRecords();
  const _enabled = params?.enabled !== undefined ? params.enabled : true;
  const _chainId = useMemo(
    () => params?.chainId || chainId,
    [params?.chainId, chainId]
  );
  const { ensClient } = useEnsPublicClient({
    chainId: _chainId,
  });
  const _networks = useMemo(
    () => networks.find((network) => network.chainId === _chainId),
    [_chainId, networks]
  );
  const _providerUrl = useMemo(() => _networks?.providerUrl, [_networks]);

  const getStandardRecordsBatch = async (
    _params: getStandardRecordsBatchParams
  ): Promise<RecordsRecord> => {
    if (!ensClient) {
      throw new Error('Public client not found');
    }

    const enses =
      params?.enses?.filter((ens) => ens !== undefined && ens !== '') || [];
    if (!params?.enses || enses.length === 0) {
      throw new Error('Enses is required');
    }

    const __chainId = _params?.chainId || _chainId;

    const offchainResolver = offchainResolvers?.offchainResolvers?.find(
      (resolver) => resolver.chainId === __chainId
    );

    const recordsBatch: RecordsRecord = enses?.reduce((acc, ens) => {
      if (ens) {
        acc[ens] = undefined;
      }
      return acc;
    }, {} as RecordsRecord);

    enses.forEach((ensName) => {
      const ens = queryClient.getQueryData(
        buildRecordsBySubnameKey(ensName, _chainId, true)
      );
      if (ens) {
        recordsBatch[ensName] = ens as Records;
      } else {
        recordsBatch[ensName] = undefined;
      }
    });

    const checkMissing = Object.keys(recordsBatch).filter(
      (ensName) => recordsBatch[ensName] === undefined
    );

    const resolverAddressesCalls = checkMissing?.map((ensName) =>
      getResolver.batch({ name: ensName })
    );

    const resolverAddresses = await batch(ensClient, ...resolverAddressesCalls);

    const ensIsJAN = resolverAddresses?.map(
      (result) => result === offchainResolver?.resolverAddress
    );

    const janEns = checkMissing?.filter((_, index) => ensIsJAN[index]);

    const nonJanEns = checkMissing?.filter((_, index) => !ensIsJAN[index]);

    const batchCalls = nonJanEns?.map((ensName) =>
      getEnsRecords.batch({
        name: ensName,
        coins: Object.keys(coinTypeMap),
        texts: [
          ...generalKeys,
          ...SUPPORTED_SOCIALS.map((social) => social.identifier),
        ],
        contentHash: true,
      })
    );

    const batchJanCalls = janEns?.map((ensName) =>
      getRecords({
        ens: ensName,
        chainId: _chainId,
      })
    );

    const ensRecords = await batch(ensClient, ...batchCalls);

    const janRecords = await Promise.all(batchJanCalls);

    ensRecords.forEach((result, index) => {
      if (result) {
        const record = {
          ens: checkMissing[index],
          isJAN: result.resolverAddress === offchainResolver?.resolverAddress,
          records: {
            ...result,
            contentHash: {
              protocolType: result.contentHash?.protocolType || '',
              decoded: result.contentHash?.decoded || '',
            },
          },
        };

        checkEnsValid(record);

        const sanitized = sanitizeRecords(record);

        recordsBatch[checkMissing[index]] = {
          ...record,
          sanitizedRecords: sanitized,
        };
      } else {
        recordsBatch[checkMissing[index]] = undefined;
      }
    });

    janRecords.forEach((result, index) => {
      if (result) {
        recordsBatch[janEns[index]] = result;
      } else {
        recordsBatch[janEns[index]] = undefined;
      }
    });

    Object.keys(recordsBatch).forEach((ensName) => {
      queryClient.setQueryData(
        buildRecordsBySubnameKey(ensName, _chainId, true),
        recordsBatch[ensName]
      );
    });

    queryClient.setQueryData(
      buildStandardRecordsBatchKey(_chainId),
      (old: RecordsRecord) => {
        return {
          ...old,
          ...recordsBatch,
        };
      }
    );

    return recordsBatch;
  };

  const query = useQuery({
    ...defaultOptions,
    queryKey: buildStandardRecordsBatchByEnsesKey(
      params?.enses || [],
      _chainId
    ),
    queryFn: () =>
      getStandardRecordsBatch({
        enses: params?.enses || [],
        chainId: _chainId,
      }),
    enabled:
      Boolean(params?.enses && params?.enses?.length > 0) &&
      Boolean(_chainId) &&
      Boolean(_providerUrl) &&
      Boolean(_enabled),
  });

  const allQuery = useQuery({
    ...defaultOptions,
    queryKey: buildStandardRecordsBatchKey(_chainId),
    queryFn: () => {
      return {} as RecordsRecord;
    },
    enabled: false,
  });

  return {
    isStandardRecordsBatchPending: query.isPending,
    isStandardRecordsBatchFetching: query.isFetching,
    isStandardRecordsBatchLoading: query.isLoading,
    recordsBatch: query.data,
    allRecordsBatch: allQuery.data,
    refetchStandardRecordsBatch: query.refetch,
  };
};

//
// export const useStandardRecordsBatch = () => {
//   throw new Error('Not implemented');
// };
