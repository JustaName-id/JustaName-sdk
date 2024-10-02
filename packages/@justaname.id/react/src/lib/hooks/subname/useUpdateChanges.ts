'use client';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import {
  Address,
  sanitizeAddresses,
  sanitizeTexts,
  SubnameRecordsResponse,
  SubnameUpdateParams,
  TextRecord
} from '@justaname.id/sdk';
import { useRecords } from '../records';

export const buildUpdateChangesKey = (params: GetUpdateChangesParams) => ['ENS_UPDATE_CHANGES', ...Object.values(params)];

export interface GetUpdateChangesParams extends Omit<SubnameUpdateParams, 'username' | 'ensDomain'> {
  fullEnsDomain: string;
  providerUrl?: string;
}

export interface GetUpdateChangesResult {
  changedAddresses?: Address[];
  changedTexts?: TextRecord[];
  changedContentHash?: string | undefined;
}

export interface UseUpdateChangesResult {
  isUpdateChangesPending: boolean;
  changes?: GetUpdateChangesResult;
  canUpdateEns?: boolean;
  getUpdateChanges: (params: GetUpdateChangesParams) => Promise<GetUpdateChangesResult>;
  checkIfUpdateIsValid: (params: GetUpdateChangesParams) => Promise<boolean>;
  refetchUpdateChanges: () => void;
}


export const useUpdateChanges = (params?: GetUpdateChangesParams): UseUpdateChangesResult => {
  const { chainId, providerUrl } = useJustaName();
  const _currentProviderUrl = params?.providerUrl ? params?.providerUrl : providerUrl;
  const _currentChainId = params?.chainId ? params?.chainId : chainId;
  const { getRecords } = useRecords();

  const checkIfUpdateIsValid = async (_params: GetUpdateChangesParams) => {
    const {
      changedAddresses,
      changedTexts,
      changedContentHash
    } = await getUpdateChanges(_params);


    return changedAddresses.length > 0 || changedTexts.length > 0 || changedContentHash !== undefined;
  };

  const getUpdateChanges = async (_params: GetUpdateChangesParams) => {
    const { fullEnsDomain } = _params;

    const currentProviderUrl = _params.providerUrl ? _params.providerUrl : _currentProviderUrl;
    const currentChainId = _params.chainId ? _params.chainId : _currentChainId;
    const records = await getRecords({
      fullName: fullEnsDomain,
      providerUrl: currentProviderUrl,
      chainId: currentChainId
    });
    const sanitizedRequestAddress = sanitizeAddresses(_params.addresses)?.filter((address) => address.coinType >= 0);
    const sanitizedRequestText = sanitizeTexts(_params.text)?.filter((text) => !!text.key);

    if (!records || !records.records) {
      throw new Error('No records found');
    }

    const changedAddresses = getChangedAddresses(sanitizedRequestAddress, records.records);
    const changedTexts = getChangedTextRecords(sanitizedRequestText, records.records);
    const changedContentHash = getChangedContentHash(_params.contentHash, records.records);

    return {
      changedAddresses,
      changedTexts,
      changedContentHash
    };
  };

  const query = useQuery({
    queryKey: buildUpdateChangesKey({
      ...params,
      fullEnsDomain: params?.fullEnsDomain || '',
      providerUrl: _currentProviderUrl,
      chainId: _currentChainId
    }),
    queryFn: async () => ({
      changes: await getUpdateChanges({
        ...params,
        fullEnsDomain: params?.fullEnsDomain || '',
        providerUrl: _currentProviderUrl,
        chainId: _currentChainId
      }),
      canUpdate: await checkIfUpdateIsValid({
        ...params,
        fullEnsDomain: params?.fullEnsDomain || '',
        providerUrl: _currentProviderUrl,
        chainId: _currentChainId
      })
    }),
    enabled: Boolean(params?.fullEnsDomain) && Boolean(params?.addresses || params?.text || params?.contentHash)
  });

  return {
    changes: query.data?.changes,
    canUpdateEns: query.data?.canUpdate,
    getUpdateChanges,
    checkIfUpdateIsValid,
    refetchUpdateChanges: query.refetch,
    isUpdateChangesPending: query.isPending && Boolean(params?.fullEnsDomain) && Boolean(params?.addresses || params?.text || params?.contentHash)
  };
};

export const getChangedAddresses = (sanitizedRequestAddress: Address[] | undefined, records: SubnameRecordsResponse) => {
  const changedAddresses: Address[] = [];
  sanitizedRequestAddress?.forEach((address) => {
    const record = records.coins.find((record) => record.id === address.coinType);
    if ((!record || record.value !== address.address) && (!!record?.value || !!address.address)) {
      changedAddresses.push(address);
    }
  });

  return changedAddresses?.filter((address) => address.coinType >=0);
};

export const getChangedTextRecords = (sanitizedRequestText: TextRecord[] | undefined, records: SubnameRecordsResponse) => {
  const changedTexts: TextRecord[] = [];

  sanitizedRequestText?.forEach((text) => {
    const record = records.texts.find((record) => record.key === text.key);
    if ((!record || (record.value !== text.value)) && (!!record?.value || !!text.value)) {
      changedTexts.push(text);
    }
  });

  return changedTexts.filter((text) => !!text.key);
};

export const getChangedContentHash = (contentHash: string | null | undefined, records: SubnameRecordsResponse) => {
  const previousContentHash = records.contentHash ? records.contentHash.protocolType + '://' + records.contentHash.decoded : '';

  return contentHash ? contentHash !== previousContentHash ? contentHash : undefined : undefined;
};