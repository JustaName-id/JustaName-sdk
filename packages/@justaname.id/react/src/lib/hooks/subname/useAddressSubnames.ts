'use client';

import { useJustaName } from '../../providers';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  ChainId,
  sanitizeRecords,
  SubnameGetAllByAddressRoute,
} from '@justaname.id/sdk';
import { buildSubnameBySubnameKey } from './useSubname';
import { Records } from '../../types';
import { defaultOptions } from '../../query';

export const buildAddressSubnamesKey = (
  address: string | undefined,
  chainId: ChainId | undefined
) => ['WALLET_SUBNAMES_BY_ADDRESS', address, chainId];

export interface UseAddressSubnamesParams
  extends Omit<
    SubnameGetAllByAddressRoute['params'],
    'isClaimed' | 'coinType' | 'address'
  > {
  address: string | undefined;
  isClaimed?: boolean;
  coinType?: number;
  enabled?: boolean;
}

interface UseAddressSubnamesResult {
  addressSubnames: Records[];
  isAddressSubnamesPending: boolean;
  isAddressSubnamesFetching: boolean;
  isAddressSubnamesLoading: boolean;
  refetchAddressSubnames: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Records[], unknown>>;
}

export const useAddressSubnames = (
  params: UseAddressSubnamesParams
): UseAddressSubnamesResult => {
  const queryClient = useQueryClient();
  const { justaname, chainId: defaultChainId } = useJustaName();
  const { chainId, ...rest } = params;
  const _chainId = chainId || defaultChainId;
  const _enabled = params?.enabled !== undefined ? params.enabled : true;

  const query = useQuery({
    ...defaultOptions,
    queryKey: buildAddressSubnamesKey(params.address, _chainId),
    queryFn: async () => {
      if (!params.address) {
        throw new Error('Address is required');
      }

      const response = await justaname?.subnames.getSubnamesByAddress({
        ...rest,
        address: params.address,
        isClaimed: params.isClaimed ?? true,
        coinType: params.coinType,
        chainId: _chainId,
      });

      response?.subnames.forEach((subname) => {
        queryClient.setQueryData(
          buildSubnameBySubnameKey(subname.ens, _chainId),
          {
            ...subname,
            sanitizedRecords: sanitizeRecords(subname),
          }
        );
      });

      return (
        response?.subnames.map((subname) => ({
          ...subname,
          sanitizedRecords: sanitizeRecords(subname),
        })) || []
      );
    },
    enabled: Boolean(justaname) && Boolean(params.address) && Boolean(_enabled),
  });

  return {
    addressSubnames: query.data ?? [],
    isAddressSubnamesPending: query.isPending,
    isAddressSubnamesFetching: query.isFetching,
    isAddressSubnamesLoading: query.isPending || query.isFetching,
    refetchAddressSubnames: query.refetch,
  };
};
