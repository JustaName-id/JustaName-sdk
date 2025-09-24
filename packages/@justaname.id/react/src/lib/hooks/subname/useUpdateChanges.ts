'use client';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import {
  Address,
  sanitizeAddresses,
  sanitizeTexts,
  SubnameUpdateRoute,
  TextRecord,
} from '@justaname.id/sdk';
import { useRecords } from '../records';
import { Records } from '../../types';
import { defaultOptions } from '../../query';

export const buildUpdateChangesKey = (params: GetUpdateChangesParams) => [
  'ENS_UPDATE_CHANGES',
  ...Object.values(params),
];

export interface GetUpdateChangesParams
  extends Omit<SubnameUpdateRoute['params'], 'username' | 'ensDomain'> {
  ens: string;
}

export interface GetUpdateChangesResult {
  changedAddresses?: Address[];
  changedTexts?: TextRecord[];
  changedContentHash?: string | undefined;
}

export interface UseUpdateChangesResult {
  canUpdateEns?: boolean;
  isUpdateChangesPending: boolean;
  isUpdateChangesFetching: boolean;
  isUpdateChangesLoading: boolean;
  changes?: GetUpdateChangesResult;
  refetchUpdateChanges: () => void;
  getUpdateChanges: (
    params: GetUpdateChangesParams
  ) => Promise<GetUpdateChangesResult>;
  checkIfUpdateIsValid: (params: GetUpdateChangesParams) => Promise<boolean>;
}

export interface UseUpdateChangesParams
  extends Omit<SubnameUpdateRoute['params'], 'username' | 'ensDomain'> {
  ens?: string;
}

export const useUpdateChanges = (
  params?: UseUpdateChangesParams
): UseUpdateChangesResult => {
  const { chainId } = useJustaName();
  const { getRecords } = useRecords();

  const _chainId = params?.chainId || chainId;

  const checkIfUpdateIsValid = async (_params: GetUpdateChangesParams) => {
    const { changedAddresses, changedTexts, changedContentHash } =
      await getUpdateChanges(_params);

    return (
      changedAddresses.length > 0 ||
      changedTexts.length > 0 ||
      changedContentHash !== undefined
    );
  };

  const getUpdateChanges = async (_params: GetUpdateChangesParams) => {
    const { ens } = _params;

    const __chainId = _params.chainId || _chainId;
    const records = await getRecords({
      ens: ens,
      chainId: __chainId,
    });
    const sanitizedRequestAddress = sanitizeAddresses(
      _params.addresses
    )?.filter((address) => address.coinType >= 0);
    const sanitizedRequestText = sanitizeTexts(_params.text)?.filter(
      (text) => !!text.key
    );

    if (!records) {
      throw new Error('No records found');
    }

    const changedAddresses = getChangedAddresses(
      sanitizedRequestAddress,
      records
    );
    const changedTexts = getChangedTextRecords(sanitizedRequestText, records);
    const changedContentHash = getChangedContentHash(
      _params.contentHash,
      records
    );

    return {
      changedAddresses,
      changedTexts,
      changedContentHash,
    };
  };

  const query = useQuery({
    ...defaultOptions,
    queryKey: buildUpdateChangesKey({
      ...params,
      ens: params?.ens || '',
      chainId: _chainId,
    }),
    queryFn: async () => ({
      changes: await getUpdateChanges({
        ...params,
        ens: params?.ens || '',
        chainId: _chainId,
      }),
      canUpdate: await checkIfUpdateIsValid({
        ...params,
        ens: params?.ens || '',
        chainId: _chainId,
      }),
    }),
    enabled:
      Boolean(params?.ens) &&
      Boolean(params?.addresses || params?.text || params?.contentHash),
  });

  return {
    changes: query.data?.changes,
    canUpdateEns: query.data?.canUpdate,
    getUpdateChanges,
    checkIfUpdateIsValid,
    refetchUpdateChanges: query.refetch,
    isUpdateChangesPending: query.isPending,
    isUpdateChangesFetching: query.isFetching,
    isUpdateChangesLoading: query.isPending || query.isFetching,
  };
};

export const getChangedAddresses = (
  sanitizedRequestAddress: Address[] | undefined,
  records: Records
) => {
  const changedAddresses: Address[] = [];
  sanitizedRequestAddress?.forEach((address) => {
    const record = records.records.coins.find(
      (record) => record.id === address.coinType
    );
    if (
      (!record || record.value !== address.address) &&
      (!!record?.value || !!address.address)
    ) {
      changedAddresses.push(address);
    }
  });

  return changedAddresses?.filter((address) => address.coinType >= 0);
};

export const getChangedTextRecords = (
  sanitizedRequestText: TextRecord[] | undefined,
  records: Records
) => {
  const changedTexts: TextRecord[] = [];

  sanitizedRequestText?.forEach((text) => {
    const record = records.records.texts.find(
      (record) => record.key === text.key
    );
    if (
      (!record || record.value !== text.value) &&
      (!!record?.value || !!text.value)
    ) {
      changedTexts.push(text);
    }
  });

  return changedTexts.filter((text) => !!text.key);
};

export const getChangedContentHash = (
  contentHash: string | undefined,
  records: Records
) => {
  if (contentHash === '') {
    return '';
  }

  if (!contentHash) {
    return undefined;
  }

  if (!records.records.contentHash) {
    // return `${contentHash.protocolType}://${contentHash.decoded}`;
    return contentHash;
  }

  if (
    // records.records.contentHash.protocolType !== contentHash.protocolType ||
    // records.records.contentHash.decoded !== contentHash.decoded
    contentHash !==
    records.records.contentHash.protocolType +
      '://' +
      records.records.contentHash.decoded
  ) {
    return contentHash;
  }

  return undefined;
};
