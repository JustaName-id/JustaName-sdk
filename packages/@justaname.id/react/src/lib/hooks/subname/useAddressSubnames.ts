"use client";

import { useJustaName } from '../../providers';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ChainId, SubnameGetAllByAddressParams, SubnameGetAllByAddressResponse } from '@justaname.id/sdk';
import { buildSubnameBySubnameKey } from './useSubname';

export const buildAddressSubnamesKey = (
  address: string | undefined,
  chainId: ChainId,
) => [
  'WALLET_SUBNAMES_BY_ADDRESS',
  address,
  chainId
]

export interface UseAddressSubnamesParams extends Omit<SubnameGetAllByAddressParams, 'isClaimed' | 'coinType' | "address"> {
  address: string | undefined;
  isClaimed?: boolean;
  coinType?: number;
}

interface UseAddressSubnamesResult {
  addressSubnames: SubnameGetAllByAddressResponse;
  isAddressSubnamesPending: boolean;
  isAddressSubnamesFetching: boolean;
  isAddressSubnamesLoading: boolean;
  refetchAddressSubnames: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SubnameGetAllByAddressResponse | undefined, unknown>>;
}

export const useAddressSubnames = (
  params: UseAddressSubnamesParams
): UseAddressSubnamesResult => {
  const queryClient = useQueryClient();
  const { justaname, chainId: defaultChainId } = useJustaName();
  const { chainId, ...rest } = params;
  const _chainId = chainId || defaultChainId;

  const query = useQuery({
    queryKey: buildAddressSubnamesKey(params.address, _chainId),
    queryFn: async () => {
      if (!params.address) {
        throw new Error('Address is required');
      }

      const response = await justaname?.subnames.getAllByAddress({
        ...rest,
        address: params.address,
        isClaimed: params.isClaimed ?? true,
        coinType: params.coinType ?? 60,
        chainId: _chainId,
      });

      response?.subnames.forEach((subname) => {
        queryClient.setQueryData(
          buildSubnameBySubnameKey(subname.subname, _chainId),
          subname
        );
      });

      return response;
    },
    enabled: Boolean(justaname) && Boolean(params.address),
    initialData: {
      subnames: [],
    },
  });

  return {
    addressSubnames: query.data,
    isAddressSubnamesPending: query.isPending,
    isAddressSubnamesFetching: query.isFetching,
    isAddressSubnamesLoading: query.isPending || query.isFetching,
    refetchAddressSubnames: query.refetch,
  };
};
