import React from 'react';
import { useMountedAccount } from '../../hooks/account/useMountedAccount';
import { useSubnameSignature } from '../../hooks/subname/useSubnameSignature';

export const SignatureOnMounted: React.FC = () => {
  const { address, isConnected } = useMountedAccount();
  const { getSignature, isSubnameSignaturePending} = useSubnameSignature()

  React.useEffect(() => {

    if (!address || !isConnected || isSubnameSignaturePending) return;
    const main = async () => {
      await getSignature()
    }
    main();
  }, [address, isConnected, isSubnameSignaturePending])

  return null
}