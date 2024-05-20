import { useJustaName } from '../providers';
import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import { ChainId, JustaName, SubnameRecordsResponse, SanitizedRecords, sanitizeRecords } from '@justaname.id/sdk';

export const buildRecordsBySubnameKey = (
  subname: string,
  chainId: number
) => [
  'RECORDS_BY_SUBNAME',
  subname,
  chainId
]


export const getSubnameDetails = async (fullName: string,
                                        justaname:JustaName,
                                        chainId: ChainId,
                                        providerUrl: string) => {
    const result = await justaname.subnames.getRecordsByFullName({
      fullName,
      providerUrl,
      chainId,
    })
    if (
      result.resolverAddress ===
      '0x0000000000000000000000000000000000000000'
    ) {
      throw new Error('Resolver address not found')
    }

    let ethAddress = null
    if (result) {
      ethAddress = result?.coins?.find((coin) => coin.id === 60)?.value

      if (!ethAddress) {
        throw new Error('ETH address not found')
      }
    }

    const sanitized = sanitizeRecords(result)

    return {
      records: result,
      sanitizedRecords: sanitized,
    }
}

interface UseRecordsProps {
  fullName: string;
  providerUrl: string;
}

interface UseRecordsResult {
  isRecordsPending: boolean;
  records: SubnameRecordsResponse | undefined;
  sanitizedRecords: SanitizedRecords | undefined;
  refetchRecords: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<
    {
      records: SubnameRecordsResponse | undefined;
      sanitizedRecords: SanitizedRecords | undefined;
    } | undefined
    , unknown>>;
  recordsStatus: 'error' | 'success' | 'pending';
}

export const useRecords = (
  props: UseRecordsProps
): UseRecordsResult => {

  const { justaname, chainId } = useJustaName()

   const query = useQuery({
      queryKey: buildRecordsBySubnameKey(props.fullName, chainId),
      queryFn: () =>  getSubnameDetails(props.fullName, justaname, chainId, props.providerUrl)
    })

    return {
      isRecordsPending: query.isPending,
      records: query.data?.records,
      sanitizedRecords: query.data?.sanitizedRecords,
      refetchRecords: query.refetch,
      recordsStatus: query.status,
    }
}

