import { ChainId } from '@justaname.id/sdk';
import axios from 'axios';
import qs from 'qs';
import {
  CredentialMetadataKey,
  CredentialMetadataKeyStandard,
  CredentialMetadataKeyStandardReverse, CredentialMetadataValue,
  Credentials
} from '../../types';
import { useQuery } from '@tanstack/react-query';
import { useRecords } from '@justaname.id/react';
import { useEffect } from 'react';
import usePreviousState from '../usePreviousState';
import isEqual from 'lodash/isEqual';

export const buildVerifyRecordsKey = (  credentials: Credentials[],
                                        ens: string, chainId: ChainId, matchStandard=false, issuer= 'justverified.eth', backendUrl= "https://api.justaname.id/verifications/v1") =>
  [
    'VERIFIED_RECORDS',
    backendUrl,
    credentials.join(','),
    ens,
    chainId,
    matchStandard,
    issuer
  ]


export const verifyRecords = async (
  ens: string,
  credentials: Credentials[],
  chainId: ChainId,
  matchStandard=false,
  issuer= 'justverified.eth',
  backendUrl= "https://api.justaname.id/verifications/v1"
) => {
  const response = await
    axios.get<{ records: Partial<Record<CredentialMetadataKey, boolean>>}>(`${backendUrl}/verify-records?${qs.stringify({
      credentials: credentials.map((credential) => CredentialMetadataKeyStandard[credential]),
      ens,
      chainId,
      matchStandard,
      issuer
    })}`);

  const records = response.data.records as Record<CredentialMetadataKey, boolean>;

  return Object.keys(records).reduce((acc, key) => {
    const credential = CredentialMetadataKeyStandardReverse[key as CredentialMetadataKey];

    if (credential) {
      acc[credential] = records[key as CredentialMetadataKey];
    }

    return acc;
  }, {} as Record<Credentials, boolean>);
}

export interface UseVerifyRecordsParams {
  credentials: Credentials[],
  ens: string;
  chainId?: ChainId;
  matchStandard?: boolean;
  verificationBackendUrl?: string;
  mApp?: string;
}

export interface UseVerifyRecordsReturn {
  verifiedRecords: Record<string, boolean> | undefined;
  isPending: boolean;
  refetchVerifyRecords: () => void;
}

export const useVerifyRecords = ({
                                   credentials,
  ens,
  chainId= 1,
  matchStandard= false,
  verificationBackendUrl= "https://api.justaname.id/verifications/v1",
  mApp= 'justverified.eth'
}: UseVerifyRecordsParams) => {

  const { records } = useRecords({
    ens: ens,
  })
  const previousRecords = usePreviousState(records, [records])

  const query = useQuery({
    queryKey: buildVerifyRecordsKey(credentials, ens, chainId, matchStandard, mApp, verificationBackendUrl),
    queryFn: async () =>  {
      const credentialVerifications = await verifyRecords(
        ens,
        credentials,
        chainId,
        matchStandard,
        mApp,
        verificationBackendUrl
      )

      return Object.keys(credentialVerifications).reduce((acc, key) => {
        const credential = key as Credentials;
        const credentialStandard = CredentialMetadataKeyStandard[credential];
        const credentialRecordValue = records?.records?.texts?.find((text) => text.key === credentialStandard + "_" + mApp)?.value;

        if (credentialRecordValue) {
          acc[credential] = JSON.parse(credentialRecordValue)
        }
        return acc;
      }, {} as Partial<CredentialMetadataValue>)
    },
    enabled: Boolean(ens) && Boolean(credentials.length > 0) && Boolean(records) && Boolean(ens.length > 0)
  });

  useEffect(() => {
    if(query.isFetching || query.isPending){
      return
    }
    if (!ens || !credentials || !records) {
      return
    }

    if(!isEqual(previousRecords, records)){
      query.refetch()
    }
  }, [records, query.isFetching, query.isPending, ens, credentials, previousRecords])

  return {
    verifiedRecords: query.data,
    isVerifiedRecordsPending: query.isPending || query.isFetching,
    refetchVerifyRecords: query.refetch
  }
}
