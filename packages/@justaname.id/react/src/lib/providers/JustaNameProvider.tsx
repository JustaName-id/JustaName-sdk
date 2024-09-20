"use client";

import React from 'react';
import { ChainId, JustaName, JustaNameConfig } from '@justaname.id/sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultRoutes } from '../constants/default-routes';

interface JustaNameConfigWithOptionalApiKey extends Omit<JustaNameConfig, 'apiKey'> {
  apiKey?: string;
}

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
export interface JustaNameContextProps extends JustaNameConfigWithOptionalApiKey {
  justaname: JustaName;
  routes: typeof defaultRoutes;
  backendUrl?: string;
  chainId: ChainId;
}


export const JustaNameContext = React.createContext<JustaNameContextProps | null>(null);

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
export interface JustaNameProviderProps {
  children: React.ReactNode;
  config: JustaNameProviderConfig
}

export interface JustaNameProviderConfig extends JustaNameConfigWithOptionalApiKey {
  routes?: Partial<typeof defaultRoutes>;
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
export const JustaNameProvider: React.FC<JustaNameProviderProps> = ({
  children,
  config: {
    routes,
    backendUrl,
    providerUrl,
    ensDomain,
    config,
    apiKey
  },
}: JustaNameProviderProps): React.ReactNode => {

  const [justaname] = React.useState<JustaName>(JustaName.init({
    config,
    providerUrl,
    ensDomain,
    apiKey,
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <JustaNameContext.Provider value={{
        backendUrl,
        config: {
          origin: config.origin,
          chainId: config.chainId,
          domain: config.domain,
          signIn: config.signIn,
          subnameChallenge: config.subnameChallenge,
        },
        ensDomain,
        chainId: config.chainId,
        providerUrl,
        justaname,
        routes: {
          ...defaultRoutes,
          ...routes,
        },
        apiKey
      }}>
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

