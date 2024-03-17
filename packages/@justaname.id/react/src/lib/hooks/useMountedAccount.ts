
import { useAccount } from 'wagmi';
import { useMounted } from './useMounted';

export const useMountedAccount = () => {
  const isMounted = useMounted();
  const account = useAccount();

  return {
    ...account,
    isConnected: isMounted && account.isConnected,
  };
};
