import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';


export interface ResendOtpParams {
  state: string;
}

export interface UseResendOtpResult {
  resendOtp: UseMutateAsyncFunction<void, unknown, ResendOtpParams, unknown>;
  isResendOtpPending: boolean;
  timeLeft: number;
  resetTimeLeft: () => void;
  startCountdown: () => void;
}

export interface UseResendOtpParams {
  minutesForResend?: number;
  initialMinutesLeft?: number;
  verificationBackendUrl?: string;
}

export const useResendOtp = (params?: UseResendOtpParams) : UseResendOtpResult => {
  const minutesForResend = params?.minutesForResend ?? 1;
  const [timeLeft, setTimeLeft] = useState((params?.initialMinutesLeft || minutesForResend) * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mutate = useMutation({
    mutationFn:async (_params: ResendOtpParams) => {
      if(timeLeft > 0) {
        return;
      }
      const verificationBackendUrl = params?.verificationBackendUrl || 'https://api.justaname.id/verifications/v1';
      await axios
        .post(
          `${verificationBackendUrl}/credentials/email/resend`,
          {
            state: _params.state,
          },
          {
            withCredentials: true,
          }
        )

      startCountdown();
    },
  })

  const startCountdown = () => {
    resetTimeLeft();
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const resetTimeLeft = () => {
    setTimeLeft(minutesForResend * 60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  return {
    timeLeft,
    resendOtp: mutate.mutateAsync,
    isResendOtpPending: mutate.isPending,
    resetTimeLeft,
    startCountdown
  }
}

