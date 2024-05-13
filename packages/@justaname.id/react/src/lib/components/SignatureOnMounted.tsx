import React from 'react';
import { useMountedAccount } from '../hooks/useMountedAccount';
import { useSubnameSignature } from '../hooks/useSubnameSignature';
import { defaultRoutes } from '../constants/default-routes';

export const SignatureOnMounted: React.FC<{
  routes: typeof defaultRoutes,
  backendUrl: string
}> = ({
                                         routes,
                                         backendUrl
  }) =>
{
  const { address, isConnected } = useMountedAccount();
  const { getSignature } = useSubnameSignature({
    backendUrl,
    requestChallengeRoute: routes?.requestChallengeRoute || defaultRoutes.requestChallengeRoute
  })

  React.useEffect(() => {

    if(!address || !isConnected) return;
    const main = async () => {
      await getSignature()
    }
    main();
  }, [address, isConnected])

  return null
}