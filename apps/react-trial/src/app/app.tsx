import { SIWENSProvider, SIWENSProviderConfig } from '@justaname.id/react-signin'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { Home } from './pages/Home';
import { ChainId } from '@justaname.id/sdk';

const queryClient = new QueryClient();

const JustaNameConfig: SIWENSProviderConfig = {
  config: {
    chainId: parseInt(import.meta.env.VITE_APP_CHAIN_ID) as ChainId,
    origin: import.meta.env.VITE_APP_ORIGIN,
    domain: import.meta.env.VITE_APP_DOMAIN,
  },
  backendUrl: import.meta.env.VITE_APP_BACKEND_URL,
  providerUrl: import.meta.env.VITE_APP_PROVIDER_URL,
  ensDomain: import.meta.env.VITE_APP_ENS_DOMAIN,
  openOnWalletConnect: true,
  allowedSubnames:'all'
}

export function App() {

  const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: import.meta.env.VITE_APP_CHAIN_ID === 1 ? [mainnet] : [sepolia],
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <SIWENSProvider config={JustaNameConfig} >
              <Home />
          </SIWENSProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;