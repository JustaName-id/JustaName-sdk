import React from 'react';
import { useMountedAccount } from '../hooks/useMountedAccount';
import { useSubnameSignature } from '../hooks/useSubnameSignature';

export const SignatureOnMounted: React.FC = () =>
{
  const { address, isConnected } = useMountedAccount();
  const { getSignature } = useSubnameSignature()

  React.useEffect(() => {

    if(!address || !isConnected) return;
    const main = async () => {
      await getSignature()
    }
    main();
  }, [address, isConnected])

  return null
}