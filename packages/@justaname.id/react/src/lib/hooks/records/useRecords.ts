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
}

export interface GetRecordsParams
  extends Omit<SubnameRecordsRoute['params'], 'ens' | 'providerUrl'> {
  ens: string;
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

    if (!__providerUrl) {
      throw new Error('ChainId not found');
    }

    const records = await getRecords({
      ens: _params.ens,
      chainId: __chainId,
      providerUrl: __providerUrl,
    });

    queryClient.setQueryData(
      buildRecordsBySubnameKey(_params.ens, __chainId),
      records
    );
    return records;
  };

  const query = useQuery({
    queryKey: buildRecordsBySubnameKey(params?.ens || '', _chainId),
    queryFn: () =>
      getRecordsInternal(
        {
          ens: params?.ens || '',
          chainId: _chainId,
        },
        true
      ),
    enabled: Boolean(params?.ens) && Boolean(_chainId) && Boolean(_providerUrl),
  });

  return {
    isRecordsPending: query.isPending,
    isRecordsFetching: query.isFetching,
    isRecordsLoading: query.isLoading,
    records: query.data,
    getRecords: getRecordsInternal,
    refetchRecords: query.refetch,
    recordsStatus: query.status,
  };
};
