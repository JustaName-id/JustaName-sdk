import { useQuery } from '@tanstack/react-query';
import { Passport } from '../../types';
import { defaultOptions } from '@justaname.id/react';
import axios from 'axios';

export const getTPPassport = async (
  address: string,
  apiKey?: string,
  backendUrl?: string
) => {
  if (apiKey) {
    const tpPassport = await axios.get<Passport>(
      `https://api.talentprotocol.com/api/v2/passports/${address}`,
      {
        headers: {
          Accept: 'application/json',
          'x-api-key': apiKey,
        },
      }
    );
    return tpPassport.data;
  }

  const _backendUrl = backendUrl || '';

  const tpPassport = await axios.get<Passport>(
    `${_backendUrl}/api/tp/passport?address=${address}`
  );
  return tpPassport.data;
};

export const buildTPPassportQueryKey = (address: string | undefined) => {
  return ['TP_PASSPORT_BY_ADDRESS', address];
};

export interface UseTPPassportParams {
  address: string;
  apiKey?: string;
  backendUrl?: string;
}

export interface UseTPPassportResult {
  tpPassport: Passport | undefined;
  isTPPassportPending: boolean;
  isTPPassportFetching: boolean;
  isTPPassportLoading: boolean;
}

export const useTPPassportByAddress = ({
  address,
  apiKey,
  backendUrl,
}: UseTPPassportParams): UseTPPassportResult => {
  const query = useQuery({
    ...defaultOptions,
    queryKey: [...buildTPPassportQueryKey(address), apiKey, backendUrl],
    queryFn: () => getTPPassport(address, apiKey, backendUrl),
    enabled: Boolean(address),
  });

  return {
    tpPassport: query.data,
    isTPPassportPending: query.isPending,
    isTPPassportFetching: query.isFetching,
    isTPPassportLoading: query.isPending || query.isFetching,
  };
};
