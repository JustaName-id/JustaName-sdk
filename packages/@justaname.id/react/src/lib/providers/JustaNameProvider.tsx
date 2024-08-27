"use client";

import React from 'react';
import { ChainId, JustaName, JustaNameConfig } from '@justaname.id/sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultRoutes } from '../constants/default-routes';

interface JustaNameConfigWithouthApiKey extends Omit<JustaNameConfig, 'apiKey'> {}

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
export interface JustaNameContextProps extends JustaNameConfigWithouthApiKey {
  justaname: JustaName;
  routes: typeof defaultRoutes;
  backendUrl?: string;
  chainId: ChainId;
}


const JustaNameContext = React.createContext<JustaNameContextProps | null>(null);

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
export interface JustaNameProvider extends JustaNameConfigWithouthApiKey{
  children: React.ReactNode;
  routes?: typeof defaultRoutes;
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
export const JustaNameProvider: React.FC<JustaNameProvider> = ({
  children,
  routes,
  config,
  backendUrl,
  providerUrl,
}) => {

  const [justaname] = React.useState<JustaName>(JustaName.init({
    config,
    providerUrl
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <JustaNameContext.Provider value={{
        backendUrl,
        config: {
            siwe: config.siwe
        },
        chainId: config.siwe.chainId,
        providerUrl,
        justaname,
        routes: {
          ...defaultRoutes,
          ...routes,
        }
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