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
    XMTPPlugin('production'),
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

              {/*<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>*/}
              <JustEnsCard addressOrEns={'blockchain.com'} />
              <JustEnsCard addressOrEns={'nick.eth'} />
              <JustEnsCard addressOrEns={'brantly.eth'} />
              <JustEnsCard addressOrEns={'vitalik.eth'} />
              {/*  <JustEnsCard addressOrEns={'dr3a.eth'} />*/}
              {/*  <JustEnsCard addressOrEns={'josh.box'} />*/}
              <JustEnsCard addressOrEns={'justghadi.eth'} />
              <JustEnsCard addressOrEns={'justan.id'} />
              <JustEnsCard addressOrEns={'jesse.base.eth'} />
              {/*  <JustEnsCard addressOrEns={'dave.base.eth'} />*/}
              {/*  <JustEnsCard addressOrEns={'xhris.eth'} />*/}
              <JustEnsCard addressOrEns={'raffy.eth'} />
              <JustEnsCard addressOrEns={'slobo.eth'} />
              {/*  <JustEnsCard addressOrEns={'obi-wan.eth'} />*/}
              <JustEnsCard addressOrEns={'threadgirl.eth'} />
              {/*  <JustEnsCard addressOrEns={'bianc8.eth'} />*/}
              {/*  <JustEnsCard*/}
              {/*    addressOrEns={'justanthony.jaw.eth'}*/}
              {/*    chainId={11155111}*/}
              {/*  />*/}
              <JustEnsCard
                addressOrEns={'0x7Ca2C8acAcf728CeFB6c8cd8E9b2063C8763feB1'}
                chainId={1}
              />
              {/*  <JustEnsCard*/}
              {/*    addressOrEns={'hadikhai.jaw.eth'}*/}
              {/*    chainId={11155111}*/}
              {/*  />*/}
              {/*</div>*/}
              {/*<div*/}
              {/*  style={{*/}
              {/*    marginTop: '100vh',*/}
              {/*    display: 'flex',*/}
              {/*    gap: '10px',*/}
              {/*    flexWrap: 'wrap',*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <JustEnsCard addressOrEns={'mely.eth'} expanded />*/}
              {/*  <JustEnsCard addressOrEns={'nick.eth'} expanded />*/}
              {/*  <JustEnsCard addressOrEns={'brantly.eth'} expanded />*/}
              {/*  <JustEnsCard addressOrEns={'vitalik.eth'} expanded />*/}
              {/*  <JustEnsCard addressOrEns={'dr3a.eth'} expanded />*/}
              {/*  <JustEnsCard*/}
              {/*    addressOrEns={'hadikhai.jaw.eth'}*/}
              {/*    chainId={11155111}*/}
              {/*    expanded*/}
              {/*  />*/}
              {/*</div>*/}
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
