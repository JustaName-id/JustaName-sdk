
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { ChainId } from '@justaname.id/sdk';
import { Meta, StoryObj } from '@storybook/react'
import { JustSignInButton, JustSignInProvider, JustSignInProviderConfig,  } from '@justaname.id/react-signin';
import { JustVerifiedPlugin } from '../lib';

const queryClient = new QueryClient();

const JustSignInConfig: JustSignInProviderConfig = {
  config: {
    chainId: parseInt(import.meta.env.STORYBOOK_APP_CHAIN_ID) as ChainId,
    origin: import.meta.env.STORYBOOK_APP_ORIGIN,
    domain: import.meta.env.STORYBOOK_APP_DOMAIN,
    signIn: {
      ttl: 1000 * 60 * 60 * 24
    }
  },
  backendUrl: import.meta.env.STORYBOOK_APP_BACKEND_URL,
  providerUrl: import.meta.env.STORYBOOK_APP_PROVIDER_URL,
  ensDomain: import.meta.env.STORYBOOK_APP_ENS_DOMAIN,
  openOnWalletConnect: true,
  allowedEns: 'all'
};

export const Example = () => {

  const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: import.meta.env.STORYBOOK_APP_CHAIN_ID === '1' ? [mainnet] : [sepolia]
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <JustSignInProvider
            config={JustSignInConfig}
            plugins={[JustVerifiedPlugin(['email','twitter','github', 'discord','telegram'], "http://localhost:3009/verifications/v1")]}
          >
            <JustSignInButton>
              <ConnectButton />
            </JustSignInButton>
          </JustSignInProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const meta: Meta<typeof Example> = {
  component: Example,
  title: 'Connect/SignIn'

};
export default meta;
type Story = StoryObj<typeof Example>

