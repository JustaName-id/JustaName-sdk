import {
  JustEnsCard,
  JustWeb3Button,
  JustWeb3Provider,
  JustWeb3ProviderConfig,
} from '@justweb3/widget';
import '@justweb3/widget/styles.css';
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { XMTPPlugin } from '../lib';
import { EFPPlugin } from '@justweb3/efp-plugin';
import { TalentProtocolPlugin } from '@justweb3/talent-protocol-plugin';
import { POAPPlugin } from '@justweb3/poap-plugin';

const queryClient = new QueryClient();

const JustWeb3Config: JustWeb3ProviderConfig = {
  // config: {
  //   origin: import.meta.env.STORYBOOK_APP_ORIGIN,
  //   domain: import.meta.env.STORYBOOK_APP_DOMAIN,
  //   signInTtl: 1000 * 60 * 60 * 24,
  // },
  // backendUrl: import.meta.env.STORYBOOK_APP_BACKEND_URL,
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
  // ensDomains: [
  //   {
  //     ensDomain: import.meta.env.STORYBOOK_APP_ENS_DOMAIN,
  //     chainId: parseInt(import.meta.env.STORYBOOK_APP_CHAIN_ID) as ChainId,
  //   },
  // ],
  // openOnWalletConnect: false,
  // // allowedEns: 'all',
  // // dev: import.meta.env.STORYBOOK_APP_DEV === 'true',
  plugins: [
    XMTPPlugin('dev'),
    EFPPlugin,
    POAPPlugin({
      apiKey: import.meta.env.STORYBOOK_APP_POAP_KEY,
    }),
    TalentProtocolPlugin({
      apiKey: import.meta.env.STORYBOOK_APP_TALENT_PROTOCOL_API_KEY,
    }),
    // JustVerifiedPlugin(['email', 'telegram', 'twitter', 'discord']),
  ],
  // color: {
  //   primary: '#FF00FF',
  //   background: '#000000',
  // },
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
            <h1>JustWeb3 Sign In</h1>

            <div
              style={{
                gap: '20px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <JustWeb3Button>
                  <ConnectButton />
                </JustWeb3Button>
              </div>
            </div>
          </JustWeb3Provider>
        </RainbowKitProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const meta: Meta<typeof Example> = {
  component: Example,
  title: 'Connect/XMTP',
};
export default meta;
type Story = StoryObj<typeof Example>;
