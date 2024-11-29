import { useQuery } from '@tanstack/react-query';
import { POAP } from '../../types';
import { defaultOptions } from '@justaname.id/react';
import axios from 'axios';

export const getPoaps = async (
  address: string,
  apiKey?: string,
  backendUrl?: string
) => {
  if (apiKey) {
    const poaps = await axios.get<POAP[]>(
      `https://api.poap.tech/actions/scan/${address}`,
      {
        headers: {
          Accept: 'application/json',
          'x-api-key': apiKey,
        },
      }
    );
    return poaps.data;
  }

  const _backendUrl = backendUrl || '';

  const poaps = await axios.get<POAP[]>(
    `${_backendUrl}/api/poap?address=${address}`
  );
  return poaps.data;
};

export const buildPoapsQueryKey = (address: string | undefined) => {
  return ['POAPS_BY_ADDRESS', address];
};

export interface UsePoapsParams {
  address: string;
  apiKey?: string;
  backendUrl?: string;
}

export interface UsePoapsResult {
  poaps: POAP[] | undefined;
  isPoapsPending: boolean;
  isPoapsFetching: boolean;
  isPoapsLoading: boolean;
}

export const usePoaps = ({
  address,
  apiKey,
  backendUrl,
}: UsePoapsParams): UsePoapsResult => {
  const query = useQuery({
    ...defaultOptions,
    retry: 3,
    retryDelay: 1000,
    queryKey: [...buildPoapsQueryKey(address), apiKey, backendUrl],
    queryFn: () => getPoaps(address, apiKey, backendUrl),
    enabled: Boolean(address),
  });

  return {
    poaps: query.data,
    isPoapsPending: query.isPending,
    isPoapsFetching: query.isFetching,
    isPoapsLoading: query.isPending || query.isFetching,
  };
};
