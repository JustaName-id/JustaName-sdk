import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@walletconnect/react-native-compat';
import { Web3Modal, createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi-react-native';
import * as Linking from 'expo-linking';
import 'react-native-url-polyfill/auto';
import { arbitrum, mainnet, polygon } from 'viem/chains';
import { WagmiConfig } from 'wagmi';

import { JustaNameProvider } from '@justaname.id/react/src';
import HomeScreen from './screens/Home';

const projectId = process.env.EXPO_PUBLIC_PROJECT_ID ?? ""

const metadata = {
  name: 'JAN Expo Demo',
  description: 'JAN Expo Demo',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: Linking.createURL('/'),
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}

const chains = [mainnet, polygon, arbitrum]

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig
})

export default function App() {
  const queryClient = new QueryClient();

  const chainId = process.env.EXPO_PUBLIC_CHAIN_ID ? parseInt(process.env.EXPO_PUBLIC_CHAIN_ID) as 1 | 11155111 : undefined;

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <JustaNameProvider
          backendUrl={process.env.EXPO_PUBLIC_API_URL}
          chainId={chainId}>
          <HomeScreen />
          <Web3Modal />
        </JustaNameProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

