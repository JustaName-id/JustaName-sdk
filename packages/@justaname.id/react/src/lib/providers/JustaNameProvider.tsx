"use client";

import React, { useMemo } from 'react';
import { ChainId, JustaName, JustaNameConfig, JustaNameConfigDefaults, NetworkWithProvider } from '@justaname.id/sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultRoutes } from '../constants/default-routes';
import { useMountedAccount } from '../hooks/account/useMountedAccount';

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


export type JustaNameConfigWithoutDefaultChainId = Omit<JustaNameConfig, 'defaultChainId'>

export interface JustaNameContextProps extends Omit<JustaNameConfigDefaults, 'defaultChainId'> {
  justaname: JustaName;
  routes: typeof defaultRoutes;
  backendUrl?: string;
  selectedNetwork: NetworkWithProvider;
  selectedEnsDomain: string | undefined;
  chainId: ChainId
}


export const JustaNameContext = React.createContext<JustaNameContextProps | null>(null);

export interface JustaNameProviderProps {
  children: React.ReactNode;
  config: JustaNameProviderConfig
}

export interface JustaNameProviderConfig extends JustaNameConfigWithoutDefaultChainId {
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
    ensDomains,
    config,
    apiKey,
    networks
  },
}: JustaNameProviderProps): React.ReactNode => {

  const { chainId } = useMountedAccount()

  const defaultChain = useMemo(()=> {
    return chainId === 11155111 ? 11155111 : 1
  }, [chainId])


  const [justaname] = React.useState<JustaName>(JustaName.init({
    networks,
    config,
    ensDomains,
    defaultChainId: defaultChain,
    apiKey
  }));

  const selectedEnsDomain = useMemo(() => {
    return ensDomains?.find((ensDomain) => ensDomain.chainId === defaultChain)?.ensDomain
  }, [ensDomains, defaultChain])

  const configuredNetworks = useMemo(() => {
    return JustaName.createNetworks(networks)
  }, [networks])

  const selectedNetwork = useMemo(() => {
    return configuredNetworks.find((network) => network.chainId === defaultChain) as NetworkWithProvider
  }, [configuredNetworks, defaultChain])

  return (
    <QueryClientProvider client={queryClient}>
      <JustaNameContext.Provider value={{
        backendUrl,
        config,
        ensDomains: ensDomains || [],
        selectedEnsDomain,
        networks: configuredNetworks,
        chainId: defaultChain,
        selectedNetwork,
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

