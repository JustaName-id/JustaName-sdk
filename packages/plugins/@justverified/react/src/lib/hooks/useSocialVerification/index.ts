import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { Credentials, JustVerifiedResponse } from '../../types';


export interface SocialVerificationParams {
  credential: Omit<Credentials, 'email'>;
}

export interface UseSocialVerificationResult {
  verifySocial: UseMutateAsyncFunction<JustVerifiedResponse | undefined, unknown, SocialVerificationParams, unknown>;
  isVerifyingSocialPending: boolean;
}

export interface UseSocialVerificationParams {
  verificationBackendUrl?: string;
  onWindowClose?: () => void;
  onError?: (error: any) => void;
}

export const useSocialVerification = ({
                                        verificationBackendUrl = 'https://api.justaname.id/verification/v1',
                                        onWindowClose = () => {
                                        },
                                        onError = () => {
                                        }
                                      }: UseSocialVerificationParams): UseSocialVerificationResult => {
  const mutate = useMutation({
    mutationFn: async (_params: SocialVerificationParams) => {
      const eventSource = new EventSource(
        verificationBackendUrl + '/credentials/socials/' + _params.credential,
        { withCredentials: true }
      );
      let result: JustVerifiedResponse | undefined;

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.redirectUrl) {
            const newWindow = window.open(data.redirectUrl, '_blank');

            const intervalId = setInterval(() => {
              if (newWindow?.closed) {
                clearInterval(intervalId);
                onWindowClose();
              }
            }, 500);
          } else if (data.result) {
            result = data.result;
            eventSource.close();
          } else if (data.error) {
            onError(data.error);
            eventSource.close();
          }
        } catch (error) {
          onError(error);
        }
      };

      eventSource.onerror = (error) => {
        onError(error);
        eventSource.close();
      };

      return result;

    }
  });

  return {
    verifySocial: mutate.mutateAsync,
    isVerifyingSocialPending: mutate.isPending,
  };
}