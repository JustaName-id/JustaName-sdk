import {
  JustWeb3Button,
  JustWeb3Provider,
  JustWeb3ProviderConfig,
} from '@justweb3/widget';
import '@rainbow-me/rainbowkit/styles.css';
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const JustaNameConfig: JustWeb3ProviderConfig = {
  config: {
    origin: import.meta.env.VITE_APP_ORIGIN,
    domain: import.meta.env.VITE_APP_DOMAIN,
  },
  backendUrl: import.meta.env.VITE_APP_BACKEND_URL,
  networks: [
    {
      chainId: 1,
      providerUrl: import.meta.env.VITE_APP_MAINNET_PROVIDER_URL,
    },
    {
      chainId: 11155111,
      providerUrl: import.meta.env.VITE_APP_SEPOLIA_PROVIDER_URL,
    },
  ],
  openOnWalletConnect: true,
  allowedEns: 'all',
};

export function App() {
  console.log('rainbow', import.meta.env.VITE_APP_CHAIN_ID);
  const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: import.meta.env.VITE_APP_CHAIN_ID === '1' ? [mainnet] : [sepolia],
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <JustWeb3Provider config={JustaNameConfig}>
            <JustWeb3Button>
              <ConnectButton />
            </JustWeb3Button>
          </JustWeb3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
