import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JustWeb3Provider, JustWeb3ProviderConfig, useJustWeb3 } from '../lib';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { Meta, StoryObj } from '@storybook/react';
import { JustWeb3Button } from '../lib/components';
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';

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
  openOnWalletConnect: false,
  allowedEns: 'all',
};

const Privy = () => {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { connectedEns } = useJustWeb3();
  if (!ready) {
    return null;
  }

  return (
    <JustWeb3Button logout={logout}>
      <button
        onClick={() => {
          if (!authenticated) {
            login();
          } else {
            logout().then(() => {
              console.log('Logged out');
              login();
            });
          }
        }}
      >
        Login
      </button>
    </JustWeb3Button>
  );
};

export const Example = () => {
  const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, sepolia],
  });

  return (
    <PrivyProvider
      appId={import.meta.env.STORYBOOK_APP_PRIVY_APP_ID || ''}
      config={{
        embeddedWallets: {
          createOnLogin: 'all-users',
          noPromptOnSignature: false,
        },
        loginMethods: ['email', 'sms'],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <JustWeb3Provider config={JustWeb3Config}>
            <Privy />
          </JustWeb3Provider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

const meta: Meta<typeof Example> = {
  component: Example,
  title: 'Connect/Privy2',
};
export default meta;
type Story = StoryObj<typeof Example>;
