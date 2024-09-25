import { useJustaName } from '../../providers';
import { QueryObserverResult, RefetchOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChainId, SanitizedRecords, sanitizeRecords, SubnameRecordsResponse } from '@justaname.id/sdk';

export const buildRecordsBySubnameKey = (
  subname: string,
  chainId: ChainId,
  providerUrl: string
) => [
  'RECORDS_BY_SUBNAME',
  subname,
  chainId,
  providerUrl
];

export interface GetRecordsResult {
  records: SubnameRecordsResponse | undefined;
  sanitizedRecords: SanitizedRecords | undefined;
}

interface UseRecordsParams {
  fullName?: string | undefined;
  providerUrl?: string;
  chainId?: ChainId;
}

interface GetRecordsParams {
  fullName: string;
  chainId?: ChainId;
  providerUrl?: string;
}

interface UseRecordsResult {
  isRecordsPending: boolean;
  records: SubnameRecordsResponse | undefined;
  sanitizedRecords: SanitizedRecords | undefined;
  getRecords: (params: GetRecordsParams, forceUpdate? :boolean) => Promise<GetRecordsResult>;
  refetchRecords: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<
    GetRecordsResult | undefined
    , unknown>>;
  recordsStatus: 'error' | 'success' | 'pending';
}

export const useRecords = (
  params: UseRecordsParams = {}
): UseRecordsResult => {

  const { justaname, chainId, providerUrl } = useJustaName();
  const queryClient = useQueryClient();
  const currentChainId = params?.chainId ? params?.chainId : chainId;
  const currentProviderUrl = params?.providerUrl ? params?.providerUrl : providerUrl;

  const getRecords = async (_fullName: string | undefined,
                                   _chainId: ChainId,
                                   _providerUrl: string): Promise<GetRecordsResult> => {
    if (!_fullName) {
      throw new Error('Full name is required');
    }

    const result = await justaname.subnames.getRecordsByFullName({
      fullName: _fullName,
      providerUrl: _providerUrl,
      chainId: _chainId
    });
    if (
      result.resolverAddress ===
      '0x0000000000000000000000000000000000000000'
    ) {
      throw new Error('Resolver address not found');
    }

    let ethAddress = null;
    if (result) {
      ethAddress = result?.coins?.find((coin) => coin.id === 60)?.value;

      if (!ethAddress) {
        throw new Error('ETH address not found');
      }
    }

    const sanitized = sanitizeRecords(result);

    return {
      records: result,
      sanitizedRecords: sanitized
    };
  };


  const getRecordsInternal = async (_params: GetRecordsParams, forceUpdate=false) => {
    if(!forceUpdate){
      const cachedRecords = queryClient.getQueryData(buildRecordsBySubnameKey(_params?.fullName, _params?.chainId || currentChainId, _params?.providerUrl || currentProviderUrl)) as GetRecordsResult;
      if(cachedRecords){
        return cachedRecords;
      }
    }
    const records = await getRecords(_params?.fullName, _params?.chainId || currentChainId, _params?.providerUrl || currentProviderUrl);
    queryClient.setQueryData(buildRecordsBySubnameKey(_params.fullName, _params?.chainId || currentChainId, _params?.providerUrl || currentProviderUrl), records);
    return records;
  };

  const query = useQuery({
    queryKey: buildRecordsBySubnameKey(params?.fullName || "", currentChainId, currentProviderUrl),
    queryFn: () => getRecordsInternal({
      fullName: params?.fullName || '',
      chainId: currentChainId,
      providerUrl: currentProviderUrl
    }),
    enabled: Boolean(params?.fullName) && Boolean(currentChainId) && Boolean(currentProviderUrl)
  });


  return {
    isRecordsPending: query.isPending,
    records: query.data?.records,
    getRecords: getRecordsInternal,
    sanitizedRecords: query.data?.sanitizedRecords,
    refetchRecords: query.refetch,
    recordsStatus: query.status
  };
};

