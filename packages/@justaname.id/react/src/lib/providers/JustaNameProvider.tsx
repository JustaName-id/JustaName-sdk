import React from 'react';
import { JustaName } from '@justaname.id/sdk'
import { useMountedAccount } from '../hooks/useMountedAccount';
import { useSubnameSignature } from '../hooks';

export const defaultRoutes = {
  addSubnameRoute: '/api/subnames/add',
  checkSubnameAvailabilityRoute: '/api/subnames/available',
  requestChallengeRoute: '/api/request-challenge',
  updateSubnameRoute: '/api/subnames/update',
}

export interface JustaNameContextProps {
  justaname: JustaName | null;
  routes: typeof defaultRoutes;
  backendUrl: string;
  chainId: 1 | 11155111
}


const JustaNameContext = React.createContext<JustaNameContextProps>({
  justaname: null,
  routes: defaultRoutes,
  chainId: 1,
  backendUrl: ""
})
export interface JustaNameProvider {
  children: React.ReactNode;
  routes?: typeof defaultRoutes;
  chainId?: 1 | 11155111
  backendUrl?: string;
}
export const JustaNameProvider: React.FC<JustaNameProvider> = ({ children,
  routes,
  chainId = 1,
  backendUrl = ""
}) => {

  const [justaname, setJustaName] = React.useState<JustaName | null>(null);
  const { address } = useMountedAccount();
  const { getSignature } = useSubnameSignature({
    backendUrl,
    requestChallengeRoute: routes?.requestChallengeRoute || defaultRoutes.requestChallengeRoute
  })

  React.useEffect(() => {
    const main = async () => {
      const justaname = await JustaName.init({});
      setJustaName(justaname);
    }
    main();
  }, []);


  React.useEffect(() => {

    if(!address) return;
    getSignature()
  }, [address])

  return (
    <JustaNameContext.Provider value={{
      backendUrl,
      chainId,
      justaname,
      routes: {
        ...defaultRoutes,
        ...routes,
      }
    }}>
      {children}
    </JustaNameContext.Provider>
  )
}

export default JustaNameProvider;

export const useJustaName = () => {
  const context = React.useContext(JustaNameContext);
  if (!context) {
    throw new Error('useJustaName must be used within a JustaNameProvider');
  }
  return context;
}