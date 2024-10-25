import { ChainId } from '@justaname.id/sdk';
import { useQuery } from '@tanstack/react-query';
import { useJustaName } from '../../providers';
import { useEffect, useMemo } from 'react';
import { useRecords } from './useRecords';

export const buildEnsAvatarKey = (
  ens: string | undefined,
  chainId: ChainId | undefined
) => ['ENS_AVATAR', ens, chainId];

export interface SanitizeImageParams {
  name: string;
  image?: string;
  chainId?: ChainId;
}

export interface UseEnsAvatarParams {
  ens: string | undefined;
  chainId?: ChainId;
}

export interface GetEnsAvatarParams {
  name: string;
  chainId?: ChainId;
}

export interface UseEnsAvatarResult {
  avatar?: string;
  getEnsAvatar: (params: GetEnsAvatarParams) => Promise<string | undefined>;
  sanitizeEnsImage: (params: SanitizeImageParams) => string | undefined;
  isLoading: boolean;
}

export const useEnsAvatar = (
  params?: UseEnsAvatarParams
): UseEnsAvatarResult => {
  const { chainId } = useJustaName();
  const _chainId = useMemo(
    () => params?.chainId || chainId,
    [params?.chainId, chainId]
  );

  const { records, getRecords } = useRecords({
    chainId: _chainId,
    ens: params?.ens,
  });

  const sanitizeEnsImage = (_params: SanitizeImageParams) => {
    const _chainId = _params.chainId || chainId || 1;
    let avatar = _params.image;
    if (_params.image?.startsWith('eip')) {
      avatar = `https://metadata.ens.domains/${
        _chainId === 1 ? 'mainnet' : 'sepolia'
      }/avatar/${_params.name}`;
    }

    return avatar;
  };

  const getEnsAvatar = async (_params: GetEnsAvatarParams): Promise<string> => {
    let _records = records;
    const name = _params.name;
    const __chainId = _params.chainId || _chainId || 1;
    if (!name) {
      return '';
    }

    if (!_records) {
      _records = await getRecords({
        ens: name,
        chainId: __chainId,
      });
    }

    let avatar: string | undefined = '';

    if (_records?.sanitizedRecords.avatar) {
      avatar = sanitizeEnsImage({
        name: _params.name,
        image: _records?.sanitizedRecords.avatar,
        chainId: __chainId,
      });
    }
    return avatar ? avatar : '';
  };

  const query = useQuery({
    queryKey: buildEnsAvatarKey(params?.ens, _chainId),
    queryFn: async () => {
      if (!params?.ens) {
        return undefined;
      }
      return getEnsAvatar({
        name: params?.ens,
        chainId: _chainId,
      });
    },
    enabled: Boolean(params?.ens) && Boolean(records),
  });

  useEffect(() => {
    if (records) {
      query.refetch();
    }
  }, [records]);

  return {
    avatar: query.data === null ? undefined : query.data,
    getEnsAvatar,
    sanitizeEnsImage,
    isLoading: query.isLoading,
  };
};
