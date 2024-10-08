
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
    origin: import.meta.env.STORYBOOK_APP_ORIGIN,
    domain: import.meta.env.STORYBOOK_APP_DOMAIN,
    signInTtl: 1000 * 60 * 60 * 24
  },
  backendUrl: import.meta.env.STORYBOOK_APP_BACKEND_URL,
  networks:[{
    providerUrl: import.meta.env.STORYBOOK_APP_PROVIDER_URL,
    chainId: parseInt(import.meta.env.STORYBOOK_APP_CHAIN_ID) as ChainId,
  }],
  ensDomains:[{
    ensDomain: import.meta.env.STORYBOOK_APP_ENS_DOMAIN,
    chainId: parseInt(import.meta.env.STORYBOOK_APP_CHAIN_ID) as ChainId,
  }],
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
            plugins={[JustVerifiedPlugin(['email','twitter','github', 'discord','telegram'], "https://api-staging.justaname.id/verifications/v1")]}
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
