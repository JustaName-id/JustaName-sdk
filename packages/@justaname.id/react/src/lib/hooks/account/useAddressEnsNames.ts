import {  Address } from 'viem';
import { getNamesForAddress } from '@ensdomains/ensjs/subgraph'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChainId, SanitizedRecords, SubnameRecordsResponse } from '@justaname.id/sdk';
import { useJustaName } from '../../providers';
import { useEnsPublicClient } from '../client/useEnsPublicClient';
import { useRecords } from '../records';

export const buildAddressEnsNames = (address: string, chainId: ChainId) => [
  'ACCOUNT_ENS_NAMES',
  address,
  chainId,
]

export interface UseAddressEnsNamesParams {
  address?: Address
  chainId?: ChainId
}

export interface GetEnsNamesForAddressResult {
  records: SubnameRecordsResponse,
  sanitizedRecords: SanitizedRecords,
  name: string,
}

export interface UseAddressEnsNamesResult {
  addressEnsNames: GetEnsNamesForAddressResult[];
  isAddressEnsNamesPending: boolean;
  getEnsNamesForAddress: (address: Address) => Promise<GetEnsNamesForAddressResult[]>;
  refetchAddressEnsNames: () => void;
}

export interface GetEnsNamesForAddressParams {
  address: Address | undefined
}

export const useAddressEnsNames = (params?: UseAddressEnsNamesParams): UseAddressEnsNamesResult => {
  const {  ensClient } = useEnsPublicClient()
  const queryClient = useQueryClient()
  const { getRecords } = useRecords()
  const { chainId, providerUrl } = useJustaName()
  const currentChainId = params?.chainId ? params?.chainId : chainId


  const getEnsNamesForAddress = async (_params: GetEnsNamesForAddressParams): Promise<GetEnsNamesForAddressResult[]> => {
      if (!ensClient) {
        throw new Error('Public client not found')
      }

      if (!params?.address) {
        throw new Error('Address is required')
      }

      const names = await getNamesForAddress(ensClient,
        { address: params?.address })

      const records = await Promise.allSettled([
        ...names
          .filter((name) => !!name?.name)
          .map(async (name) => {
            const record = await getRecords({
              fullName: name?.name || "",
              chainId: currentChainId,
              providerUrl: providerUrl
            });
            return {
              ...record,
              name: name.name as string,
            }
          })
      ])

      return records.filter((record) => record.status === 'fulfilled').map((record) => record.value).filter((record) =>
        !!record && !!record.records && !!record.sanitizedRecords && !!record.name
      ) as GetEnsNamesForAddressResult[]
  }


  const query = useQuery({
    queryKey: buildAddressEnsNames(params?.address || "", currentChainId),
    queryFn: () => getEnsNamesForAddress({
      address: params?.address
    }),
    enabled: Boolean(params?.address) && Boolean(currentChainId) ,
  })

  const getEnsNamesForAddressInternal = async (address: Address) => {
    const names = await getEnsNamesForAddress({ address })
    queryClient.setQueryData(buildAddressEnsNames(address, currentChainId), names)
    return names
  }

  return {
    addressEnsNames: query.data ?? [],
    getEnsNamesForAddress: getEnsNamesForAddressInternal,
    isAddressEnsNamesPending: query.isPending,
    refetchAddressEnsNames: query.refetch,
  }
}