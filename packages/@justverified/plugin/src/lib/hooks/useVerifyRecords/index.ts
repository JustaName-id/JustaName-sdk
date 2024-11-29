import { ChainId } from '@justaname.id/sdk';
import axios from 'axios';
import qs from 'qs';
import {
  CredentialMetadataKey,
  CredentialMetadataKeyStandard,
  CredentialMetadataKeyStandardReverse,
  CredentialMetadataValue,
  Credentials,
} from '../../types';
import { useQuery } from '@tanstack/react-query';
import { useJustaName, useRecords } from '@justaname.id/react';
import { useEffect } from 'react';
import usePreviousState from '../usePreviousState';
import isEqual from 'lodash/isEqual';
import { VerifyResponse } from '../../types/verify-response';

export const buildVerifyRecordsKey = (
  credentials: Credentials[],
  ens: string,
  chainId: ChainId,
  matchStandard = false,
  issuer = 'justverified.eth',
  backendUrl = 'https://api.justaname.id/verifications/v1'
) => [
  'VERIFIED_RECORDS',
  backendUrl,
  credentials.join(','),
  ens,
  chainId,
  matchStandard,
  issuer,
];

export const verifyRecords = async (
  ens: string,
  credentials: Credentials[],
  providerUrl: string,
  matchStandard = false,
  issuer = 'justverified.eth',
  backendUrl = 'https://api.justaname.id/verifications/v1'
) => {
  const response = await axios.get<VerifyResponse>(
    `${backendUrl}/verify-records?${qs.stringify({
      credentials: credentials.map(
        (credential) => CredentialMetadataKeyStandard[credential]
      ),
      ens: ens,
      providerUrl,
      matchStandard,
      issuer,
    })}`
  );

  const records = response.data[0].credentials as Record<
    CredentialMetadataKey,
    boolean
  >;

  return Object.keys(records).reduce((acc, key) => {
    const credential =
      CredentialMetadataKeyStandardReverse[key as CredentialMetadataKey];

    if (credential) {
      acc[credential] = records[key as CredentialMetadataKey];
    }

    return acc;
  }, {} as Record<Credentials, boolean>);
};

export interface UseVerifyRecordsParams {
  credentials: Credentials[];
  ens: string;
  chainId?: ChainId;
  matchStandard?: boolean;
  verificationBackendUrl?: string;
  mApp?: string;
}

export interface UseVerifyRecordsReturn {
  verifiedRecords: Record<string, boolean> | undefined;
  isVerifiedRecordsPending: boolean;
  isVerifiedRecordsFetching: boolean;
  isVerifiedRecordsLoading: boolean;
  refetchVerifyRecords: () => void;
}

export const useVerifyRecords = ({
  credentials,
  ens,
  chainId = 1,
  matchStandard = false,
  verificationBackendUrl = 'https://api.justaname.id/verifications/v1',
  mApp = 'justverified.eth',
}: UseVerifyRecordsParams) => {
  const { networks } = useJustaName();
  const _network = networks.find((network) => network.chainId === chainId);
  const { records } = useRecords({
    ens: ens,
    chainId: chainId,
  });
  const previousRecords = usePreviousState(records, [records]);

  const query = useQuery({
    queryKey: buildVerifyRecordsKey(
      credentials,
      ens,
      chainId,
      matchStandard,
      mApp,
      verificationBackendUrl
    ),
    queryFn: async () => {
      const credentialVerifications = await verifyRecords(
        ens,
        credentials,
        _network?.providerUrl as string,
        matchStandard,
        mApp,
        verificationBackendUrl
      );

      return Object.keys(credentialVerifications)
        .filter((key) => credentialVerifications[key as Credentials])
        .reduce((acc, key) => {
          const credential = key as Credentials;
          const credentialStandard = CredentialMetadataKeyStandard[credential];
          const credentialRecordValue = records?.records?.texts?.find(
            (text) => text.key === credentialStandard + '_' + mApp
          )?.value;

          if (credentialRecordValue) {
            acc[credential] = JSON.parse(credentialRecordValue);
          }
          return acc;
        }, {} as Partial<CredentialMetadataValue>);
    },
    enabled:
      Boolean(ens) &&
      Boolean(credentials.length > 0) &&
      Boolean(records) &&
      Boolean(ens.length > 0),
  });

  useEffect(() => {
    if (query.isFetching || query.isPending) {
      return;
    }
    if (!ens || !credentials || !records) {
      return;
    }

    if (!isEqual(previousRecords, records)) {
      query.refetch();
    }
  }, [
    records,
    query.isFetching,
    query.isPending,
    ens,
    credentials,
    previousRecords,
  ]);

  return {
    verifiedRecords: query.data,
    isVerifiedRecordsPending: query.isPending,
    isVerifiedRecordsFetching: query.isFetching,
    isVerifiedRecordsLoading: query.isLoading,
    refetchVerifyRecords: query.refetch,
  };
};
