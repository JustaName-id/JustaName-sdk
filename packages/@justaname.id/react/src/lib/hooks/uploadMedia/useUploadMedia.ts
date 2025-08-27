import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import * as qs from 'qs';
import { useJustaName, useSubnameSignature } from '../../providers';
import { ChainId } from '@justaname.id/sdk';

interface UseUploadMediaFunctionParams {
  form: FormData;
  ens?: string;
  type?: 'Avatar' | 'Banner';
  chainId?: ChainId;
}

export interface UseUploadMediaParams {
  ens?: string;
  type?: 'Avatar' | 'Banner';
  chainId?: ChainId;
}

export interface UseUploadMediaHookParams {
  address?: string;
  chainId?: ChainId;
  signature?: string;
  message?: string;
}

export interface UseUploadMediaResponse {
  url: string;
}

export interface UseUploadMediaResult {
  uploadMedia: UseMutateAsyncFunction<
    UseUploadMediaResponse,
    Error,
    UseUploadMediaFunctionParams,
    unknown
  >;
  isUploadPending: boolean;
}

const query = (ens: string, type: 'Avatar' | 'Banner', chainId: ChainId) =>
  qs.stringify({
    ens: ens,
    type: type.toLowerCase(),
    chainId: chainId,
  });

export const useUploadMedia = (
  params?: UseUploadMediaParams,
  hookParams?: UseUploadMediaHookParams
): UseUploadMediaResult => {
  const { dev, chainId: defaultChainId } = useJustaName();
  const { getSignature } = useSubnameSignature();
  
  // Use passed parameters or fallback to defaults
  const chainId = hookParams?.chainId ?? defaultChainId;
  const address = hookParams?.address;
  const signature = hookParams?.signature;
  const message = hookParams?.message;
  const mutation = useMutation({
    mutationFn: async (_params: UseUploadMediaFunctionParams) => {
      const _ens = _params.ens || params?.ens;
      const _type = _params.type || params?.type;
      const _chainId = _params.chainId || params?.chainId || chainId;
      if (!_ens) {
        throw new Error('Subname is required');
      }

      if (!_params.form) {
        throw new Error('Form is required');
      }

      if (!_type) {
        throw new Error('Type is required');
      }

      if (!_chainId) {
        throw new Error('ChainId is required');
      }

      let finalSignature: string;
      let finalMessage: string;
      let finalAddress: string;

      if (signature && message && address) {
        finalSignature = signature;
        finalMessage = message;
        finalAddress = address;
      } else {
        const signatureData = await getSignature();
        finalSignature = signatureData.signature;
        finalMessage = signatureData.message;
        finalAddress = signatureData.address;
      }

      _params.form.append('signature', finalSignature);
      // const baseUrl = 'http://localhost:3000';
      const baseUrl = dev
        ? 'https://api-staging.justaname.id'
        : 'https://api.justaname.id';
      const result = await axios.post<{
        result: {
          data: {
            url: string;
          };
          error: null;
        };
        statusCode: number;
      }>(
        `${baseUrl}/ens/v1/subname/upload-to-cdn` +
          '?' +
          query(_ens, _type, _chainId),
        _params.form,
        {
          headers: {
            'x-message': finalMessage.replace(/\n/g, '\\n'),
            'x-address': finalAddress,
          },
        }
      );

      let url = '';

      if (result.data.statusCode === 200) {
        url = result.data.result.data.url;
      }

      return {
        url,
      };
    },
  });

  return {
    uploadMedia: mutation.mutateAsync,
    isUploadPending: mutation.isPending,
  };
};
