import {
  JustEnsCard,
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
import { EFPPlugin } from '@justweb3/efp-plugin';
import { XMTPPlugin } from '@justweb3/xmtp-plugin';
import { JustVerifiedPlugin } from '@justverified/plugin';

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
  plugins: [
    XMTPPlugin,
    EFPPlugin,
    JustVerifiedPlugin(['github', 'email', 'discord']),
  ],
  dev: import.meta.env.VITE_APP_DEV === 'true',
  allowedEns: 'all',
};

export function App() {
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <JustWeb3Button>
                <ConnectButton />
              </JustWeb3Button>

              <JustEnsCard addressOrEns={'justhadi.eth'} />
              <JustEnsCard addressOrEns={'mely.eth'} />
              <JustEnsCard addressOrEns={'nick.eth'} />
            </div>
          </JustWeb3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
