
import { useAccount } from 'wagmi';
import { useMounted } from './useMounted';

/**
 * A custom hook that wraps the `useAccount` hook from wagmi, incorporating a component mount check.
 *
 * @returns {object} An enhanced account object that includes all properties and methods from `useAccount`,
 * along with an improved `isConnected` boolean that also takes the component's mount state into consideration.
 */
export const useMountedAccount = () => {
  const isMounted = useMounted();
  const account = useAccount();

  return {
    ...account,
    isConnected: isMounted && account.isConnected,
  };
};
