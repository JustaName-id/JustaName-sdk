import React from 'react';
import { JustaName } from '@justaname.id/sdk'

export const defaultRoutes = {
  claimSubnameRoute: '/api/subnames/claim',
  checkSubnameAvailabilityRoute: '/api/subnames/available',
  requestChallengeRoute: '/api/request-challenge',
}

export interface JustaNameContextProps {
  justaname: JustaName | null;
  routes: typeof defaultRoutes;
  backendUrl?: string;
  chainId: 1 | 11155111
}


const JustaNameContext = React.createContext<JustaNameContextProps>({
  justaname: null,
  routes: defaultRoutes,
  chainId: 1,
})
interface JustaNameProvider {
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

  React.useEffect(() => {
    const main = async () => {
      const justaname = await JustaName.init({});
      setJustaName(justaname);
    }
    main();
  }, []);
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