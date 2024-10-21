import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

interface UseUploadMediaFunctionParams {
  form: FormData;
}

export interface UseUploadMediaRequest {
  subname: string;
  type: 'Avatar' | 'Banner';
  isDev: boolean;
}

export interface UseUploadMediaResponse {
  url: string;
}

export interface UseUploadMediaResult {
  uploadMedia: UseMutateAsyncFunction<
    AxiosResponse<UseUploadMediaResponse>,
    Error,
    UseUploadMediaFunctionParams,
    unknown
  >;
  isUploadPending: boolean;
}

const query = (subname: string, type: 'Avatar' | 'Banner') =>
  qs.stringify({
    subdomainId: subname,
    type: type.toLowerCase(),
  });

export const useUploadMedia = (
  params: UseUploadMediaRequest
): UseUploadMediaResult => {
  const mutation = useMutation({
    mutationFn: async (_params: UseUploadMediaFunctionParams) => {
      const result = axios.post(
        `${
          params.isDev
            ? 'https://api-staging.justaname.id'
            : 'https://api.justaname.id'
        }/ens/v1/subname/upload-to-cdn` +
          '?' +
          query(params.subname || '', params.type),
        _params.form
      );
      return result;
    },
  });

  return {
    uploadMedia: mutation.mutateAsync,
    isUploadPending: mutation.isPending,
  };
};
