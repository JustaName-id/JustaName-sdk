import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface ClearOtpParams {
  state: string;
}

export interface UseClearOtpParams {
  verificationBackendUrl?: string;
}

export interface UseClearOtpResult {
  clearOtp: UseMutateAsyncFunction<void, unknown, ClearOtpParams, unknown>;
  isClearingOtpPending: boolean;
}

export const useClearOtp = (params?: UseClearOtpParams) : UseClearOtpResult => {

  const mutate = useMutation({
    mutationFn:async (_params: ClearOtpParams) => {
      const verificationBackendUrl = params?.verificationBackendUrl || 'https://api.justaname.id/verifications/v1';
      await axios
        .post(
          `${verificationBackendUrl}/credentials/email/clear`,
          {
            state: _params.state,
          },
          {
            withCredentials: true,
          }
        )
    }
  });

  return {
    clearOtp: mutate.mutateAsync,
    isClearingOtpPending: mutate.isPending,
  }
}