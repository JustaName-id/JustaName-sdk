"use client";

import React, { useEffect, useMemo, memo } from 'react';
import { ChainId, JustaName, JustaNameConfig, JustaNameConfigDefaults, NetworkWithProvider } from '@justaname.id/sdk';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { defaultRoutes } from '../constants/default-routes';
import { useMountedAccount } from '../hooks/account/useMountedAccount';
import { useSignMessage } from 'wagmi';
import { isEqual } from 'lodash';

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
  justanameConfig: JustaNameProviderConfig;
  handleJustaNameConfig: (config: JustaNameProviderConfig) => void;
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
  signOnMounted?: boolean;
}

/**
 * Provides JustaName context to child components, allowing them to access and interact
 * with the JustaName service.
 *
 * @component
 * @param {JustaNameProviderProps} props - The props for the JustaNameProvider component.
 * @returns {React.ReactNode} The provider component wrapping children.
 */
export const JustaNameProvider: React.FC<JustaNameProviderProps> = memo((
  { children,
    config : initialConfig
  }) => {

  const { chainId } = useMountedAccount()

  const defaultChain = useMemo(()=> {
    return chainId === 11155111 ? 11155111 : 1
  }, [chainId])

  const [config, setConfig] = React.useState<JustaNameProviderConfig>(initialConfig);
  const [justanameConfig, setJustanameConfig] = React.useState<JustaNameConfig>({
    config: initialConfig.config,
    ensDomains: initialConfig.ensDomains,
    networks: initialConfig.networks,
    apiKey: initialConfig.apiKey,
    defaultChainId: defaultChain
  });
  const [justaname, setJustaName] = React.useState<JustaName>(JustaName.init(justanameConfig));

  const selectedEnsDomain = useMemo(() => {
    return config.ensDomains?.find((ensDomain) => ensDomain.chainId === defaultChain)?.ensDomain
  }, [config.ensDomains, defaultChain])

  const configuredNetworks = useMemo(() => {
    return JustaName.createNetworks(config.networks)
  }, [config.networks])

  const selectedNetwork = useMemo(() => {
    return configuredNetworks.find((network) => network.chainId === defaultChain) as NetworkWithProvider
  }, [configuredNetworks, defaultChain])

  useEffect(() => {
    setJustaName(JustaName.init({
      networks: config.networks,
      config: config.config,
      ensDomains: config.ensDomains,
      defaultChainId: defaultChain,
      apiKey: config.apiKey
    }));
  }, [defaultChain]);

  const handleJustaNameConfig = (_config: JustaNameProviderConfig) => {
    if (isEqual(_config, config)) return;
    setConfig(_config);

    const _justanameConfig: JustaNameConfig = {
      config: _config.config,
      ensDomains: _config.ensDomains,
      networks: _config.networks,
      apiKey: _config.apiKey,
      defaultChainId: defaultChain
    }

    if (!isEqual(_justanameConfig, justanameConfig)) {
      setJustanameConfig(_justanameConfig);
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <JustaNameContext.Provider value={{
        justanameConfig: config,
        handleJustaNameConfig,
        backendUrl: config.backendUrl,
        config: config.config,
        ensDomains: config.ensDomains || [],
        selectedEnsDomain,
        networks: configuredNetworks,
        chainId: defaultChain,
        selectedNetwork,
        justaname,
        routes: {
          ...defaultRoutes,
          ...config.routes
        },
        apiKey: config.apiKey
      }}>
        {children}
        {
          config.signOnMounted && (
            <SignatureOnMounted />
          )
        }
      </JustaNameContext.Provider>
    </QueryClientProvider>
  )
});

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

export const buildSignature = (address: string, chainId: ChainId) => ['SUBNAME_SIGNATURE', address, chainId];

export interface UseSubnameSignatureResult {
  getSignature: () => Promise<{signature: string, message: string, address: string, expirationTime: Date}>,
  isSubnameSignaturePending: boolean;
  isSubnameSignatureFetching: boolean;
}

export const useSubnameSignature = (): UseSubnameSignatureResult => {
  const { justaname, chainId} = useJustaName();
  const { address} = useMountedAccount();
  const queryClient = useQueryClient()
  const { signMessageAsync } = useSignMessage()

  const isWeb = typeof window !== 'undefined';

  const mutation = useMutation({
    mutationFn: async () => {
      if (!address) {
        throw new Error('No address found');
      }
      const message = await justaname.siwe.requestChallenge({
        address,
        chainId
      })

      const signature = await signMessageAsync({
        message: message.challenge,
        account: address
      });

      if(!signature) {
        throw new Error('Message not signed');
      }

      const expirationTime =  new Date(message.challenge.split('Expiration Time: ')[1])

      const signedData    = {
        signature,
        message: message.challenge,
        address,
        expirationTime
      }
      await queryClient.setQueryData(
        buildSignature(address, chainId),
        signedData
      )

      if (isWeb) {
        localStorage.setItem(buildSignature(address, chainId).join('_'), JSON.stringify(signedData));
      }

      return signedData
    },
  });


  const query = useQuery({
    queryKey: buildSignature(address ?? "", chainId),
    queryFn: () => mutation.mutateAsync(),
    enabled: false,
    refetchOnWindowFocus: false,
  })

  const getSignature = async () => {
    const now = new Date();

    if (query.data) {
      if (query.data.expirationTime > now) {
        return query.data
      }
    }

    if (isWeb) {
      const localData = localStorage.getItem(buildSignature(address ?? '', chainId).join('_'));
      if (localData) {
        const parsedData = JSON.parse(localData);
        if (new Date(parsedData.expirationTime) > now) {
          await queryClient.setQueryData(
            buildSignature(address ?? '', chainId),
            parsedData
          )
          return parsedData;
        }
      }
    }

    return await mutation.mutateAsync()
  }
  return {
    getSignature,
    isSubnameSignaturePending: mutation.isPending,
    isSubnameSignatureFetching: query.isFetching,
  }
}

const SignatureOnMounted: React.FC = () => {
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