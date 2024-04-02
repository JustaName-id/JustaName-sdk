import React from 'react';
import { JustaName } from '@justaname.id/sdk'
import { useMountedAccount } from '../hooks/useMountedAccount';
import { useSubnameSignature } from '../hooks';

/**
 * Defines the default routes for interacting with the JustaName API.
 */
export const defaultRoutes = {
  addSubnameRoute: '/api/subnames/add',
  acceptSubnameRoute: '/api/subnames/accept',
  checkSubnameAvailabilityRoute: '/api/subnames/available',
  requestChallengeRoute: '/api/request-challenge',
  updateSubnameRoute: '/api/subnames/update',
}

/**
 * Type definition for the properties available in the JustaNameContext.
 * 
 * @typedef JustaNameContextProps
 * @type {object}
 * @property {JustaName | null} justaname - The JustaName SDK instance.
 * @property {object} routes - An object containing route definitions.
 * @property {string} [backendUrl] - The backend URL for JustaName API requests.
 * @property {1 | 11155111} chainId - The blockchain network identifier.
 */
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

/**
 * Props for the JustaNameProvider component.
 * 
 * @typedef JustaNameProvider
 * @type {object}
 * @property {React.ReactNode} children - The child components.
 * @property {object} [routes] - Optional custom API routes.
 * @property {1 | 11155111} [chainId] - Optional blockchain network identifier.
 * @property {string} [backendUrl] - Optional backend URL for API requests.
 */
export interface JustaNameProvider {
  children: React.ReactNode;
  routes?: typeof defaultRoutes;
  chainId?: 1 | 11155111
  backendUrl?: string;
}

/**
 * Provides JustaName context to child components, allowing them to access and interact
 * with the JustaName service.
 * 
 * @component
 * @param {JustaNameProviderProps} props - The props for the JustaNameProvider component.
 * @returns {React.ReactNode} The provider component wrapping children.
 */
export const JustaNameProvider: React.FC<JustaNameProvider> = ({ children,
  routes,
  chainId = 1,
  backendUrl = ""
}) => {

  const [justaname, setJustaName] = React.useState<JustaName | null>(null);
  const { address, isConnected } = useMountedAccount();
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

    if(!address || !isConnected) return;
    const main = async () => {
      console.log('getting signature')
      await getSignature()
    }
    main();
  }, [address, isConnected])

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

/**
 * Custom hook for accessing the JustaNameContext.
 * 
 * @hook
 * @returns {JustaNameContextProps} The context value with JustaName service instance and configuration.
 * @throws {Error} If the hook is used outside a JustaNameProvider.
 */
export const useJustaName = (): JustaNameContextProps => {
  const context = React.useContext(JustaNameContext);
  if (!context) {
    throw new Error('useJustaName must be used within a JustaNameProvider');
  }
  return context;
}