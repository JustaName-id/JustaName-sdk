import '@walletconnect/react-native-compat';
import 'react-native-url-polyfill/auto';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Web3Modal, createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi-react-native';
import * as Linking from 'expo-linking';
import { arbitrum, mainnet, polygon } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import HomeScreen from '../screens/Home';
import { Connector } from 'wagmi';
import { JustaNameProvider } from '@justaname.id/react'

const projectId = process.env.EXPO_PUBLIC_PROJECT_ID ?? ""

const metadata = {
  name: 'JAN Wallet Test',
  description: 'JAN Wallet Test',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: Linking.createURL('/'),
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}

const chains = [mainnet, polygon, arbitrum]

const defaultConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Copy the readonly connectors into a new mutable array
const mutableConnectors = [...defaultConfig.connectors] as Connector[];

// Create a compatible wagmiConfig object
const wagmiConfig = {
  ...defaultConfig,
  connectors: mutableConnectors,
};
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig
})

export default function App() {
  const queryClient = new QueryClient();

  const chainId = process.env.EXPO_PUBLIC_CHAIN_ID ? parseInt(process.env.EXPO_PUBLIC_CHAIN_ID) as 1 | 11155111 : undefined;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <JustaNameProvider backendUrl={process.env.EXPO_PUBLIC_API_URL} chainId={chainId}>
          <HomeScreen />
          <Web3Modal />
        </JustaNameProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

