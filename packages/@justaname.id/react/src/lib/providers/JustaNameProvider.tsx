"use client";

import React from 'react';
import { JustaName } from '@justaname.id/sdk'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SignatureOnMounted } from '../components/SignatureOnMounted';
import { defaultRoutes } from '../constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      networkMode: "offlineFirst",
      refetchOnWindowFocus: false,
      retry: 0
    },
    mutations: {
      networkMode: "offlineFirst"
    }
  }
});


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

  React.useEffect(() => {
    const main = async () => {
      const justaname = await JustaName.init({});
      setJustaName(justaname);
    }
    main();
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <JustaNameContext.Provider value={{
        backendUrl,
        chainId,
        justaname,
        routes: {
          ...defaultRoutes,
          ...routes,
        }
      }}>
        <SignatureOnMounted
          routes={routes || defaultRoutes}
          backendUrl={backendUrl}
        />
        {children}
      </JustaNameContext.Provider>
    </QueryClientProvider>
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