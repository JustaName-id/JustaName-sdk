import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JustEnsCard, JustWeb3Provider, JustWeb3ProviderConfig } from '../lib';
import '@rainbow-me/rainbowkit/styles.css';
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { Meta, StoryObj } from '@storybook/react';
import { JustWeb3Button } from '../lib/components';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const JustWeb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: import.meta.env.STORYBOOK_APP_ORIGIN,
    domain: import.meta.env.STORYBOOK_APP_DOMAIN,
    signInTtl: 1000 * 60 * 60 * 24,
  },
  backendUrl: import.meta.env.STORYBOOK_APP_BACKEND_URL,
  networks: [
    {
      chainId: 1,
      providerUrl: import.meta.env.STORYBOOK_APP_MAINNET_PROVIDER_URL,
    },
    {
      chainId: 11155111,
      providerUrl: import.meta.env.STORYBOOK_APP_SEPOLIA_PROVIDER_URL,
    },
  ],
  color: {
    background: '#000000',
    primary: '#ff0000',
  },
  openOnWalletConnect: true,
  allowedEns: 'all',
  dev: import.meta.env.STORYBOOK_APP_DEV === 'true',
};

export const Example = () => {
  const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, sepolia],
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <JustWeb3Provider config={JustWeb3Config}>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <JustWeb3Button>
                <ConnectButton />
              </JustWeb3Button>
            </div>
            <JustEnsCard ens={'nick.eth'} />
            <JustEnsCard ens={'vitalik.eth'} />
            <JustEnsCard ens={'dr3a.eth'} />
          </JustWeb3Provider>
        </RainbowKitProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const meta: Meta<typeof Example> = {
  component: Example,
  title: 'Connect/DarkMode',
};
export default meta;
type Story = StoryObj<typeof Example>;
