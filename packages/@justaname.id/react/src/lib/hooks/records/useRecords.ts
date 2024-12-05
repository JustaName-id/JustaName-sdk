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
  SanitizedRecords,
  sanitizeRecords,
  SubnameRecordsRoute,
  SUPPORTED_SOCIALS,
} from '@justaname.id/sdk';
import { useMemo } from 'react';
import { Records } from '../../types';
import { defaultOptions } from '../../query';
import { RecordsTaskQueue } from './records-task-queue';
import { useEnsPublicClient } from '../client/useEnsPublicClient';
import { useOffchainResolvers } from '../offchainResolver';
import { getRecords as getEnsRecords } from '@ensdomains/ensjs/public';
import { checkEnsValid } from '../../helpers/checkEnsValid';
import { validateEns } from '../../helpers/validateEns';

export const buildRecordsBySubnameKey = (
  subname: string,
  chainId: ChainId | undefined,
  standard = false
) => ['RECORDS_BY_SUBNAME', subname, chainId, standard];

export interface GetRecordsResult {
  rawRecords: SubnameRecordsRoute['response'] | undefined;
  sanitizedRecords: SanitizedRecords | undefined;
}

export interface UseRecordsParams
  extends Omit<SubnameRecordsRoute['params'], 'ens' | 'providerUrl'> {
  ens?: string | undefined;
  enabled?: boolean;
  skipQueue?: boolean;
  // standard?: boolean;
}

export interface GetRecordsParams
  extends Omit<SubnameRecordsRoute['params'], 'ens' | 'providerUrl'> {
  ens: string;
  // standard?: boolean;
  skipQueue?: boolean;
}

export interface UseRecordsResult {
  isRecordsPending: boolean;
  isRecordsFetching: boolean;
  isRecordsLoading: boolean;
  records: Records | undefined;
  getRecords: (
    params: GetRecordsParams,
    forceUpdate?: boolean
  ) => Promise<Records>;
  refetchRecords: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Records | undefined, unknown>>;
  recordsStatus: 'error' | 'success' | 'pending';
}

export const useRecords = (params?: UseRecordsParams): UseRecordsResult => {
  const { justaname, chainId, networks } = useJustaName();
  const queryClient = useQueryClient();
  const _enabled = params?.enabled !== undefined ? params.enabled : true;
  const _chainId = useMemo(
    () => params?.chainId || chainId,
    [params?.chainId, chainId]
  );
  const _ens = useMemo(() => validateEns(params?.ens), [params?.ens]);
  const { offchainResolvers } = useOffchainResolvers();
  const { ensClient } = useEnsPublicClient({
    chainId: _chainId,
  });

  const _networks = useMemo(
    () => networks.find((network) => network.chainId === _chainId),
    [_chainId, networks]
  );
  const _providerUrl = useMemo(() => _networks?.providerUrl, [_networks]);

  const getRecords = async (
    _params: SubnameRecordsRoute['params']
  ): Promise<Records> => {
    const __ens = validateEns(_params.ens);

    if (!__ens) {
      throw new Error('Invalid ENS name');
    }

    const result = await justaname.subnames.getRecords({
      ens: __ens,
      providerUrl: _params.providerUrl,
      chainId: _params.chainId,
    });

    checkEnsValid(result);

    const sanitized = sanitizeRecords(result);

    return {
      ...result,
      sanitizedRecords: sanitized,
    };
  };

  const getStandardRecords = async (
    _params: SubnameRecordsRoute['params']
  ): Promise<Records> => {
    if (!ensClient) {
      throw new Error('Public client not found');
    }

    const __ens = validateEns(_params.ens) || _ens;

    if (!__ens) {
      throw new Error('Invalid ENS name');
    }

    const result = await getEnsRecords(ensClient, {
      name: __ens,
      coins: Object.keys(coinTypeMap),
      texts: [
        ...generalKeys,
        ...SUPPORTED_SOCIALS.map((social) => social.identifier),
      ],
      contentHash: true,
    });

    const __chainId = _params?.chainId || _chainId;

    const offchainResolver = offchainResolvers?.offchainResolvers?.find(
      (resolver) => resolver.chainId === __chainId
    );

    const record = {
      ens: __ens,
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

    return {
      ...record,
      sanitizedRecords: sanitized,
    };
  };

  const getRecordsInternal = async (
    _params: GetRecordsParams,
    forceUpdate = false
  ): Promise<Records> => {
    const __chainId = _params?.chainId || _chainId;
    const __ens = validateEns(_params?.ens) || _ens;
    if (!__ens) {
      throw new Error('Invalid ENS name');
    }
    // const __standard = _params?.standard || params?.standard;
    const __standard = false;
    if (!forceUpdate) {
      const cachedRecords = queryClient.getQueryData(
        buildRecordsBySubnameKey(__ens, __chainId, __standard)
      ) as Records;
      if (cachedRecords) {
        return cachedRecords;
      }
    }

    const __networks = networks.find(
      (network) => network.chainId === __chainId
    );
    const __providerUrl = __networks?.providerUrl;
    const __skipQueue = _params?.skipQueue || params?.skipQueue;
    if (!__providerUrl) {
      throw new Error('ChainId not found');
    }

    const taskFn = async () => {
      let records: Records;
      try {
        records = await getRecords({
          ens: __ens,
          chainId: __chainId,
          providerUrl: __providerUrl,
        });
      } catch (error) {
        if (error instanceof Error && error.message.includes('NotFound')) {
          throw error;
        }
        records = await getStandardRecords({
          ens: __ens,
          chainId: __chainId,
          providerUrl: __providerUrl,
        });
      }

      return records;
    };

    let records: Records;

    // if (__standard) {
    //   records = await getStandardRecords({
    //     ens: __ens,
    //     chainId: __chainId,
    //     providerUrl: __providerUrl,
    //   });
    // } else {
    if (__skipQueue) {
      records = await taskFn();
    } else {
      records = await RecordsTaskQueue.enqueue(taskFn);
    }
    // }

    queryClient.setQueryData(
      buildRecordsBySubnameKey(__ens, __chainId, __standard),
      records
    );
    return records;
  };

  const query = useQuery({
    ...defaultOptions,
    retry: (failureCount, error) => {
      if (error instanceof Error) {
        if (
          error.message.includes('NotFound') ||
          error.message.includes('ETH address not found')
        ) {
          return false;
        }
      }
      return failureCount < 3;
    },
    queryKey: buildRecordsBySubnameKey(
      _ens || '',
      _chainId
      // params?.standard
    ),
    queryFn: () =>
      getRecordsInternal(
        {
          ens: _ens || '',
          chainId: _chainId,
        },
        true
      ),
    enabled:
      Boolean(_ens) &&
      Boolean(_chainId) &&
      Boolean(_providerUrl) &&
      Boolean(_enabled),
  });

  return {
    isRecordsPending: query.isPending,
    isRecordsFetching: query.isFetching,
    isRecordsLoading: query.isPending || query.isFetching,
    records: query.data,
    getRecords: getRecordsInternal,
    refetchRecords: query.refetch,
    recordsStatus: query.status,
  };
};
