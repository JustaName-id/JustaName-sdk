import { useQuery } from '@tanstack/react-query';
import { PassportCredential } from '../../types';
import { defaultOptions } from '@justaname.id/react';
import axios from 'axios';

export const getTPCredentials = async (
  address: string,
  apiKey?: string,
  backendUrl?: string
) => {
  if (apiKey) {
    const tpCredentials = await axios.get<PassportCredential>(
      `https://api.talentprotocol.com/api/v2/passport_credentials?passport_id=${address}`,
      {
        headers: {
          Accept: 'application/json',
          'x-api-key': apiKey,
        },
      }
    );
    return tpCredentials.data;
  }

  const _backendUrl = backendUrl || '';

  const tpCredentials = await axios.get<PassportCredential>(
    `${_backendUrl}/api/tp/credentials?address=${address}`
  );
  return tpCredentials.data;
};

export const buildTPCredentialsQueryKey = (address: string | undefined) => {
  return ['TP_CREDENTIALS_BY_ADDRESS', address];
};

export interface UseTPCredentialsParams {
  address: string;
  apiKey?: string;
  backendUrl?: string;
}

export interface UseTPCredentialsResult {
  tpCredentials: PassportCredential | undefined;
  isTPCredentialsPending: boolean;
  isTPCredentialsFetching: boolean;
  isTPCredentialsLoading: boolean;
}

export const useTPCredentialsByAddress = ({
  address,
  apiKey,
  backendUrl,
}: UseTPCredentialsParams): UseTPCredentialsResult => {
  const query = useQuery({
    ...defaultOptions,
    queryKey: [...buildTPCredentialsQueryKey(address), apiKey, backendUrl],
    queryFn: () => getTPCredentials(address, apiKey, backendUrl),
    enabled: Boolean(address),
  });

  return {
    tpCredentials: query.data,
    isTPCredentialsPending: query.isPending,
    isTPCredentialsFetching: query.isFetching,
    isTPCredentialsLoading: query.isPending || query.isFetching,
  };
};
