import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { EmailEthereumEip712Signature } from '../../types/credentials/email-credential';
import { JustVerifiedResponse } from '../../types';

export type VerifyOtpResponse = JustVerifiedResponse<EmailEthereumEip712Signature>

export interface VerifyOtpParams {
  state: string;
  otp: string;
}

export interface UseVerifyOtpParams {
  verificationBackendUrl?: string;
}

export interface UseVerifyOtpResult {
  verifyOtp: UseMutateAsyncFunction<VerifyOtpResponse, unknown, VerifyOtpParams, unknown>;
  isVerifyOtpPending: boolean;
}

export const useVerifyOtp = (params?: UseVerifyOtpParams) : UseVerifyOtpResult => {

  const mutate = useMutation({
    mutationFn:async (_params: VerifyOtpParams) => {
      const verificationBackendUrl = params?.verificationBackendUrl || 'https://api.justaname.id/verifications/v1';
      const emailVc = await axios
        .post<VerifyOtpResponse>(
          `${verificationBackendUrl}/credentials/email/verify`,
          {
            state: _params.state,
            otp: _params.otp,
          },
          {
            withCredentials: true,
          }
        )
      return emailVc.data;
    }
  });

  return {
    verifyOtp: mutate.mutateAsync,
    isVerifyOtpPending: mutate.isPending,
  }
}