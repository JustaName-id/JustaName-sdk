import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { ChainId } from '@justaname.id/sdk';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '@justweb3/ui';
import {
  JustEnsCard,
  JustWeb3Button,
  JustWeb3Provider,
  JustWeb3ProviderConfig,
  useJustWeb3,
} from '@justweb3/widget';
import '@justweb3/widget/styles.css';
import { JustVerifiedPlugin } from '../lib';

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
      providerUrl: import.meta.env.STORYBOOK_APP_PROVIDER_URL,
      chainId: parseInt(import.meta.env.STORYBOOK_APP_CHAIN_ID) as ChainId,
    },
  ],
  ensDomains: [
    {
      ensDomain: import.meta.env.STORYBOOK_APP_ENS_DOMAIN,
      chainId: parseInt(import.meta.env.STORYBOOK_APP_CHAIN_ID) as ChainId,
    },
  ],
  openOnWalletConnect: true,
  allowedEns: 'all',
  dev: import.meta.env.STORYBOOK_APP_DEV === 'true',
  disableOverlay: true,
  plugins: [
    JustVerifiedPlugin(
      ['email', 'twitter', 'github', 'discord', 'telegram'],
      // 'http://localhost:3009/verifications/v1'
      'https://api-staging.justaname.id/verifications/v1'
    ),
  ],
};

const UpdateButton = () => {
  const { updateRecords } = useJustWeb3();

  return (
    <Button
      onClick={() => {
        updateRecords({
          ens: 'hadikhai.jaw.eth',
          chainId: 11155111,
          text: [
            {
              key: 'com.twitter',
              value: 'justhadi_eth',
            },
          ],
          contentHash:
            'ipns://k51qzi5uqu5dgccx524mfjv7znyfsa6g013o6v4yvis9dxnrjbwojc62pt0430',
        });
      }}
    >
      Update
    </Button>
  );
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

              <UpdateButton />

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <JustEnsCard addressOrEns={'mely.eth'} />
                <JustEnsCard addressOrEns={'nick.eth'} />
                <JustEnsCard addressOrEns={'brantly.eth'} />
                <JustEnsCard addressOrEns={'vitalik.eth'} />
                <JustEnsCard addressOrEns={'dr3a.eth'} />
                <JustEnsCard addressOrEns={'jaw.eth'} chainId={11155111} />
                <JustEnsCard
                  addressOrEns={'hadikhai.jaw.eth'}
                  chainId={11155111}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <JustEnsCard addressOrEns={'mely.eth'} expanded />
                <JustEnsCard addressOrEns={'nick.eth'} expanded />
                <JustEnsCard addressOrEns={'brantly.eth'} expanded />
                <JustEnsCard addressOrEns={'vitalik.eth'} expanded />
                <JustEnsCard addressOrEns={'dr3a.eth'} expanded />
                <JustEnsCard
                  addressOrEns={'hadikhai.jaw.eth'}
                  chainId={11155111}
                  expanded
                />
              </div>
            </div>
          </JustWeb3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const meta: Meta<typeof Example> = {
  component: Example,
  title: 'Connect/SignIn',
};
export default meta;
type Story = StoryObj<typeof Example>;
