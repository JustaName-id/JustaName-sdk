import { useMutation } from '@tanstack/react-query';
import qs from 'qs';
import { useAccountSubnames } from '@justaname.id/react';
import { useContext } from 'react';
import { JustWeb3Context } from '../../../providers';
import { justANameInstance, controlledAxiosPromise } from '../axios';
import { AxiosInstance } from 'axios';

interface UploadAvatarParams {
  data: ImageParams;
  subnameId: string | undefined;
  backendInstance: AxiosInstance;
}

interface ImageParams {
  form: FormData;
  type: 'avatar' | 'banner';
}

const query = (subnameId: string, type: 'avatar' | 'banner') =>
  qs.stringify({
    subdomainId: subnameId,
    type: type,
  });

export const postUploadToCdn = async (params: UploadAvatarParams) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controlledAxiosPromise<any>(
    params.backendInstance.post(
      '/ens/v1/subdomain/upload-to-cdn' +
        '?' +
        query(params.subnameId || '', params.data.type),
      params.data.form
    )
  );

export const useUploadToCdn = (subname: string, type: 'Avatar' | 'Banner') => {
  const { config } = useContext(JustWeb3Context);
  const backendInstance = justANameInstance(config.backendUrl, config.dev);
  const { accountSubnames } = useAccountSubnames();
  const subnameId = accountSubnames?.find((sub) => sub.ens === subname)?.ens;
  return useMutation({
    mutationFn: (formData: ImageParams) =>
      postUploadToCdn({
        data: formData,
        subnameId,
        backendInstance,
      }),
  });
};
