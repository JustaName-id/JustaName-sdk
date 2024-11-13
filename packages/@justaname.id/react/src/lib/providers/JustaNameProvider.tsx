'use client';

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {
  ChainId,
  JustaName,
  JustaNameConfig,
  JustaNameConfigDefaults,
  NetworkWithProvider,
} from '@justaname.id/sdk';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { defaultRoutes } from '../constants/default-routes';
import { useMountedAccount } from '../hooks/account/useMountedAccount';
import { useSignMessage } from 'wagmi';

export type JustaNameConfigWithoutDefaultChainId = Omit<
  JustaNameConfig,
  'defaultChainId'
>;

export interface JustaNameContextProps
  extends Omit<JustaNameConfigDefaults, 'defaultChainId'> {
  justanameConfig: JustaNameProviderConfig;
  // handleJustaNameConfig: (config: JustaNameProviderConfig) => void
  justaname: JustaName;
  routes: typeof defaultRoutes;
  backendUrl: string;
  selectedNetwork: NetworkWithProvider;
  selectedEnsDomain: string | undefined;
  chainId: ChainId | undefined;
}

export const JustaNameContext = createContext<JustaNameContextProps | null>(
  null
);

export interface JustaNameProviderProps {
  children: ReactNode;
  config: JustaNameProviderConfig;
}

export interface JustaNameProviderConfig
  extends JustaNameConfigWithoutDefaultChainId {
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
 * @returns {ReactNode} The provider component wrapping children.
 */
export const JustaNameProvider: FC<JustaNameProviderProps> = ({
  children,
  config: initialConfig,
}) => {
  const { chainId } = useMountedAccount();

  const defaultChain = useMemo(() => {
    return !chainId
      ? undefined
      : chainId !== 1 && chainId !== 11155111
      ? 1
      : chainId;
  }, [chainId]);

  // const [config, setConfig] = useState<JustaNameProviderConfig>(initialConfig);
  const config: JustaNameProviderConfig = useMemo(
    () => initialConfig,
    [initialConfig]
  );
  const justanameConfig: JustaNameConfig = useMemo(
    () => ({
      config: config.config,
      ensDomains: config.ensDomains,
      networks: config.networks,
      defaultChainId: defaultChain,
      dev: config.dev,
    }),
    [config, defaultChain]
  );
  const justaname = useMemo(() => {
    return JustaName.init(justanameConfig);
  }, [justanameConfig]);

  const selectedEnsDomain = useMemo(() => {
    return justanameConfig.ensDomains?.find(
      (ensDomain) => ensDomain.chainId === defaultChain
    )?.ensDomain;
  }, [justanameConfig.ensDomains, defaultChain]);

  const configuredNetworks = useMemo(() => {
    return JustaName.createNetworks(justanameConfig.networks);
  }, [justanameConfig.networks]);

  const selectedNetwork = useMemo(() => {
    return configuredNetworks.find(
      (network) => network.chainId === defaultChain
    ) as NetworkWithProvider;
  }, [configuredNetworks, defaultChain]);

  return (
    <JustaNameContext.Provider
      value={{
        justanameConfig: justanameConfig,
        // handleJustaNameConfig,
        backendUrl: config.backendUrl || '',
        config: justanameConfig.config,
        dev: justanameConfig.dev,
        ensDomains: justanameConfig.ensDomains || [],
        selectedEnsDomain,
        networks: configuredNetworks,
        chainId: defaultChain,
        selectedNetwork,
        justaname,
        routes: {
          ...defaultRoutes,
          ...config.routes,
        },
      }}
    >
      {children}
      {config.signOnMounted && <SignatureOnMounted />}
    </JustaNameContext.Provider>
  );
};

export default JustaNameProvider;

/**
 * Custom hook for accessing the JustaNameContext.
 *
 * @hook
 * @returns {JustaNameContextProps} The context value with JustaName service instance and configuration.
 * @throws {Error} If the hook is used outside a JustaNameProvider.
 */
export const useJustaName = (): JustaNameContextProps => {
  const context = useContext(JustaNameContext);
  if (!context) {
    throw new Error('useJustaName must be used within a JustaNameProvider');
  }
  return context;
};

export const buildSignature = (
  address: string,
  chainId: ChainId | undefined
) => ['SUBNAME_SIGNATURE', address, chainId];

export interface UseSubnameSignatureResult {
  getSignature: () => Promise<{
    signature: string;
    message: string;
    address: string;
    expirationTime: Date;
  }>;
  isSubnameSignaturePending: boolean;
  isSubnameSignatureFetching: boolean;
}

export const useSubnameSignature = (): UseSubnameSignatureResult => {
  const { justaname, chainId } = useJustaName();
  const { address } = useMountedAccount();
  const queryClient = useQueryClient();
  const { signMessageAsync } = useSignMessage();

  const isWeb = typeof window !== 'undefined';

  const mutation = useMutation({
    mutationFn: async () => {
      if (!address) {
        throw new Error('No address found');
      }

      if (!chainId) {
        throw new Error('No chainId found');
      }

      const message = justaname.siwe.requestChallenge({
        address,
        chainId,
      });

      const signature = await signMessageAsync({
        message: message.challenge,
        account: address,
      });

      if (!signature) {
        throw new Error('Message not signed');
      }

      const expirationTime = new Date(
        message.challenge.split('Expiration Time: ')[1]
      );

      const signedData = {
        signature,
        message: message.challenge,
        address,
        expirationTime,
      };
      await queryClient.setQueryData(
        buildSignature(address, chainId),
        signedData
      );

      if (isWeb) {
        localStorage.setItem(
          buildSignature(address, chainId).join('_'),
          JSON.stringify(signedData)
        );
      }

      return signedData;
    },
  });

  const query = useQuery({
    queryKey: buildSignature(address ?? '', chainId ?? 1),
    queryFn: () => mutation.mutateAsync(),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const getSignature = async () => {
    const now = new Date();

    if (query.data) {
      if (query.data.expirationTime > now) {
        return query.data;
      }
    }

    if (isWeb) {
      const localData = localStorage.getItem(
        buildSignature(address ?? '', chainId).join('_')
      );
      if (localData) {
        const parsedData = JSON.parse(localData);
        if (new Date(parsedData.expirationTime) > now) {
          await queryClient.setQueryData(
            buildSignature(address ?? '', chainId),
            parsedData
          );
          return parsedData;
        }
      }
    }

    return await mutation.mutateAsync();
  };
  return {
    getSignature,
    isSubnameSignaturePending: mutation.isPending,
    isSubnameSignatureFetching: query.isFetching,
  };
};

const SignatureOnMounted: FC = () => {
  const { address, isConnected } = useMountedAccount();
  const { getSignature, isSubnameSignaturePending } = useSubnameSignature();

  useEffect(() => {
    if (!address || !isConnected || isSubnameSignaturePending) return;
    const main = async () => {
      await getSignature();
    };
    main();
  }, [address, isConnected, isSubnameSignaturePending]);

  return null;
};
