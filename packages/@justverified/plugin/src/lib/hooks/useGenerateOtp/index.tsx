import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const buildGenerateOtpKey = (
  email: string,
  verificationBackendUrl: string
)=> [
  'GENERATE_OTP',
  email,
  verificationBackendUrl,
]

export const generateOtp = async (
  email: string,
  verificationBackendUrl: string
) => {
  const response = await axios.get<{ state: string}>(
    `${verificationBackendUrl}/credentials/email?email=${email}`,
    {
      withCredentials: true,
    }
  );

  return response.data.state;
}

export interface UseGenerateOtpResult {
  state: string | undefined;
  isGenerateOtpPending: boolean;
  refetchGenerateOtp: () => void;
  clearState: () => void;
}

export interface UseGenerateOtpParams {
  email: string | undefined;
  verificationBackendUrl?: string;
}

export const useGenerateOtp = ({
                                 email,
                                 verificationBackendUrl = "https://api.justaname.id/verifications/v1"
}: UseGenerateOtpParams) : UseGenerateOtpResult => {

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: buildGenerateOtpKey(email || "", verificationBackendUrl),
    queryFn: () => generateOtp(email || "", verificationBackendUrl),
    enabled: false
  })

  const clearState = () => {
    queryClient.removeQueries({
      queryKey: buildGenerateOtpKey(email || "", verificationBackendUrl),
    })
  }

  return {
    state: query.data,
    clearState,
    isGenerateOtpPending: query.isPending || query.isFetching,
    refetchGenerateOtp: query.refetch,
  }
}