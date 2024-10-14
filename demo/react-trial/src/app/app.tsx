import {
  JustWeb3ProviderConfig,
  JustWeb3Provider,
  JustWeb3Button,
} from '@justweb3/widget';
import '@rainbow-me/rainbowkit/styles.css';
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ChainId } from '@justaname.id/sdk';

const queryClient = new QueryClient();

const JustaNameConfig: JustWeb3ProviderConfig = {
  config: {
    origin: import.meta.env.VITE_APP_ORIGIN,
    domain: import.meta.env.VITE_APP_DOMAIN,
  },
  backendUrl: import.meta.env.VITE_APP_BACKEND_URL,
  networks: [
    {
      chainId: parseInt(import.meta.env.VITE_APP_CHAIN_ID) as ChainId,
      providerUrl: import.meta.env.VITE_APP_PROVIDER_URL,
    },
  ],
  ensDomains: [
    {
      ensDomain: import.meta.env.VITE_APP_ENS_DOMAIN,
      chainId: parseInt(import.meta.env.VITE_APP_CHAIN_ID) as ChainId,
    },
  ],
  openOnWalletConnect: true,
  allowedEns: 'all',
};

export function App() {
  const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: import.meta.env.VITE_APP_CHAIN_ID === 1 ? [mainnet] : [sepolia],
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
