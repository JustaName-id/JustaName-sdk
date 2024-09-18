import React from 'react';
import { useMountedAccount } from '../../hooks/account/useMountedAccount';
import { useSubnameSignature } from '../../hooks/subname/useSubnameSignature';

export const Index: React.FC = () =>
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