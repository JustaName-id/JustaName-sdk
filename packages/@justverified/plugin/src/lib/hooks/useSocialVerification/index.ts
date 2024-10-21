import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { Credentials, JustVerifiedResponse } from '../../types';
import { EthereumEip712Signature2021 } from '../../types/ethereumEip712Signature';

export interface SocialVerificationParams {
  credential: Omit<Credentials, 'email'>;
}

export interface UseSocialVerificationResult {
  verifySocial: UseMutateAsyncFunction<
    JustVerifiedResponse<EthereumEip712Signature2021<{}>>,
    Error,
    SocialVerificationParams,
    unknown
  >;
  isVerifyingSocialPending: boolean;
}

export interface UseSocialVerificationParams {
  verificationBackendUrl?: string;
  onWindowClose?: () => void;
  onError?: (error: any) => void;
}

export const useSocialVerification = ({
  verificationBackendUrl = 'https://api.justaname.id/verification/v1',
  onWindowClose = () => {},
  onError = () => {},
}: UseSocialVerificationParams): UseSocialVerificationResult => {
  const mutate = useMutation({
    mutationFn: async (
      _params: SocialVerificationParams
    ): Promise<JustVerifiedResponse<EthereumEip712Signature2021<{}>>> => {
      const eventSource = new EventSource(
        verificationBackendUrl + '/credentials/socials/' + _params.credential,
        { withCredentials: true }
      );

      let result: JustVerifiedResponse<EthereumEip712Signature2021<{}>>;
      try {
        result = await new Promise((resolve, reject) => {
          eventSource.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              if (data.redirectUrl) {
                if (/<\/?[a-z][\s\S]*>/i.test(data.redirectUrl)) {
                  const newWindow = window.open('', '_blank');
                  if (newWindow) {
                    newWindow.document.open();
                    newWindow.document.write(data.redirectUrl);
                    newWindow.document.close();

                    const intervalId = setInterval(() => {
                      if (newWindow.closed) {
                        clearInterval(intervalId);
                        onWindowClose();
                      }
                    }, 500);
                  } else {
                    onWindowClose();
                  }
                } else {
                  const newWindow = window.open(data.redirectUrl, '_blank');

                  const intervalId = setInterval(() => {
                    if (newWindow?.closed) {
                      clearInterval(intervalId);
                      onWindowClose();
                    }
                  }, 500);
                }
              } else if (data.result) {
                resolve(data.result);
              } else if (data.error) {
                onError(data.error);
                reject(data.error);
              }
            } catch (error) {
              reject(error);
              onError(error);
            }
          };

          eventSource.onerror = (error) => {
            onError(error);
          };
        });
      } catch (error) {
        onError(error);
        eventSource.close();
        throw error;
      }

      eventSource.close();

      return result;
    },
  });

  return {
    verifySocial: mutate.mutateAsync,
    isVerifyingSocialPending: mutate.isPending,
  };
};
