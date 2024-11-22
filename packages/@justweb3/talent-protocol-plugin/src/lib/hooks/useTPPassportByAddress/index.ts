import { useQuery } from '@tanstack/react-query';
import { Passport } from '../../types';
import { defaultOptions } from '@justaname.id/react';
import axios from 'axios';

export const getTPPassports = async (
  address: string,
  apiKey?: string,
  backendUrl?: string
) => {
  if (apiKey) {
    const tpPassports = await axios.get<Passport>(
      `https://api.talentprotocol.com/api/v2/passports/${address}`,
      {
        headers: {
          Accept: 'application/json',
          'x-api-key': apiKey,
        },
      }
    );
    return tpPassports.data;
  }

  const _backendUrl = backendUrl || '';

  const tpPassports = await axios.get<Passport>(
    `${_backendUrl}/api/tp/passport?address=${address}`
  );
  return tpPassports.data;
};

export const buildTPPassportsQueryKey = (address: string | undefined) => {
  return ['TP_PASSPORT_BY_ADDRESS', address];
};

export interface UseTPPassportsParams {
  address: string;
  apiKey?: string;
  backendUrl?: string;
}

export interface UseTPPassportsResult {
  tpPassports: Passport | undefined;
  isTPPassportsPending: boolean;
  isTPPassportsFetching: boolean;
  isTPPassportsLoading: boolean;
}

export const useTPPassportsByAddress = ({
  address,
  apiKey,
  backendUrl,
}: UseTPPassportsParams): UseTPPassportsResult => {
  const query = useQuery({
    ...defaultOptions,
    queryKey: [...buildTPPassportsQueryKey(address), apiKey, backendUrl],
    queryFn: () => getTPPassports(address, apiKey, backendUrl),
    enabled: Boolean(address),
  });

  return {
    tpPassports: query.data,
    isTPPassportsPending: query.isPending,
    isTPPassportsFetching: query.isFetching,
    isTPPassportsLoading: query.isPending || query.isFetching,
  };
};
