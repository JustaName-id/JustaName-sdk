import { useJustaName } from '../../providers';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  ChainId,
  SanitizedRecords,
  sanitizeRecords,
  SubnameRecordsRoute,
} from '@justaname.id/sdk';
import { useMemo } from 'react';
import { Records } from '../../types';
import { defaultOptions } from '../../query';
import { RecordsTaskQueue } from './records-task-queue';

export const buildRecordsBySubnameKey = (
  subname: string,
  chainId: ChainId | undefined
) => ['RECORDS_BY_SUBNAME', subname, chainId];

export interface GetRecordsResult {
  rawRecords: SubnameRecordsRoute['response'] | undefined;
  sanitizedRecords: SanitizedRecords | undefined;
}

export interface UseRecordsParams
  extends Omit<SubnameRecordsRoute['params'], 'ens' | 'providerUrl'> {
  ens?: string | undefined;
  enabled?: boolean;
  skipQueue?: boolean;
}

export interface GetRecordsParams
  extends Omit<SubnameRecordsRoute['params'], 'ens' | 'providerUrl'> {
  ens: string;
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

  const _networks = useMemo(
    () => networks.find((network) => network.chainId === _chainId),
    [_chainId, networks]
  );
  const _providerUrl = useMemo(() => _networks?.providerUrl, [_networks]);

  const getRecords = async (
    _params: SubnameRecordsRoute['params']
  ): Promise<Records> => {
    const result = await justaname.subnames.getRecords({
      ens: _params.ens,
      providerUrl: _params.providerUrl,
      chainId: _params.chainId,
    });

    if (
      result.records.resolverAddress ===
      '0x0000000000000000000000000000000000000000'
    ) {
      throw new Error('Resolver address not found');
    }

    let ethAddress = null;
    if (result) {
      ethAddress = result?.records.coins?.find((coin) => coin.id === 60)?.value;

      if (!ethAddress) {
        throw new Error('ETH address not found');
      }
    }

    const sanitized = sanitizeRecords(result);

    return {
      ...result,
      sanitizedRecords: sanitized,
    };
  };

  const getRecordsInternal = async (
    _params: GetRecordsParams,
    forceUpdate = false
  ): Promise<Records> => {
    if (!forceUpdate) {
      const cachedRecords = queryClient.getQueryData(
        buildRecordsBySubnameKey(_params?.ens, _params?.chainId || _chainId)
      ) as Records;
      if (cachedRecords) {
        return cachedRecords;
      }
    }
    const __chainId = _params?.chainId || _chainId;
    const __networks = networks.find(
      (network) => network.chainId === __chainId
    );
    const __providerUrl = __networks?.providerUrl;
    const __skipQueue = _params?.skipQueue || params?.skipQueue;
    if (!__providerUrl) {
      throw new Error('ChainId not found');
    }

    const taskFn = () => {
      return getRecords({
        ens: _params.ens,
        chainId: __chainId,
        providerUrl: __providerUrl,
      });
    };

    let records: Records;
    if (__skipQueue) {
      records = await taskFn();
    } else {
      records = await RecordsTaskQueue.enqueue(taskFn);
    }

    queryClient.setQueryData(
      buildRecordsBySubnameKey(_params.ens, __chainId),
      records
    );
    return records;
  };

  const query = useQuery({
    ...defaultOptions,
    queryKey: buildRecordsBySubnameKey(params?.ens || '', _chainId),
    queryFn: () =>
      getRecordsInternal(
        {
          ens: params?.ens || '',
          chainId: _chainId,
        },
        true
      ),
    enabled:
      Boolean(params?.ens) &&
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
