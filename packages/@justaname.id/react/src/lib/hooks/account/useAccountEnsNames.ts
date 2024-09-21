import {  Address, createPublicClient, http } from 'viem';
import { mainnet, sepolia } from 'viem/chains'
import { addEnsContracts } from '@ensdomains/ensjs'
import { getNamesForAddress } from '@ensdomains/ensjs/subgraph'
import { useMountedAccount } from './useMountedAccount';
import { useQuery } from '@tanstack/react-query';
import { ChainId, JustaName, SanitizedRecords, SubnameRecordsResponse } from '@justaname.id/sdk';
import { useJustaName } from '../../providers';
import { getSubnameDetails } from '../records';

const getNames = async (address: Address | undefined, chainId: ChainId, justaname: JustaName, providerUrl: string )
  : Promise<{
    name: string;
    records: SubnameRecordsResponse;
    sanitizedRecords: SanitizedRecords;
  }[]> => {
  const client = createPublicClient({
    chain: addEnsContracts(chainId === 1 ? mainnet : sepolia),
    transport: http(),
  })

  if (!address) {
    return []
  }

  const names = await getNamesForAddress(client,
    { address })

  const records = await Promise.allSettled([
    ...names
      .filter((name) => !!name?.name)
      .map(async (name) => {
      const record = await getSubnameDetails(name?.name || "", justaname, chainId, providerUrl);
      return {
        ...record,
        name: name.name as string,
      }
    })
  ])

  return records.filter((record) => record.status === 'fulfilled').map((record) => record.value)
}

export const buildAccountEnsNames = (address: string, chainId: ChainId) => [
  'ACCOUNT_ENS_NAMES',
  address,
  chainId,
]

export interface UseAccountEnsNamesParams {
  chainId?: ChainId
}

export interface UseAccountEnsNamesResult {
  accountEnsNames: {
    records: SubnameRecordsResponse,
    sanitizedRecords: SanitizedRecords,
    name: string,
  }[];
  isAccountEnsNamesPending: boolean;
  refetchAccountEnsNames: () => void;
}

export const useAccountEnsNames = (props?: UseAccountEnsNamesParams): UseAccountEnsNamesResult => {
  const { address, isConnected } = useMountedAccount()
  const { chainId, justaname, providerUrl } = useJustaName()
  const currentChainId = props?.chainId ? props?.chainId : chainId
  const query = useQuery({
    queryKey: buildAccountEnsNames(address || "", currentChainId),
    queryFn: () => getNames(address, currentChainId, justaname, providerUrl),
    enabled: Boolean(address) && Boolean(currentChainId) && isConnected,
  })

  return {
    accountEnsNames: query.data ?? [],
    isAccountEnsNamesPending: query.isPending,
    refetchAccountEnsNames: query.refetch,
  }
}