import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SIWENSProvider, SIWENSProviderConfig, useSignInWithEns } from '../lib';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { ChainId } from '@justaname.id/sdk';
import { Meta, StoryObj } from '@storybook/react';

const queryClient = new QueryClient();

const JustaNameConfig: SIWENSProviderConfig = {
  config: {
    chainId: parseInt(import.meta.env.STORYBOOK_APP_CHAIN_ID) as ChainId,
    origin: import.meta.env.STORYBOOK_APP_ORIGIN,
    domain: import.meta.env.STORYBOOK_APP_DOMAIN,
    signIn:{
      ttl: 1000 * 60 * 60 * 24
    },
  },
  backendUrl: import.meta.env.STORYBOOK_APP_BACKEND_URL,
  providerUrl: import.meta.env.STORYBOOK_APP_PROVIDER_URL,
  ensDomain: import.meta.env.STORYBOOK_APP_ENS_DOMAIN,
  openOnWalletConnect: true,
  allowedSubnames:'all',
}

const Session = () => {
  const { connectedEns, handleOpenSignInDialog, signOut} = useSignInWithEns()
  return (
    <div>
      <h1>Subname Session</h1>
      {
        !connectedEns && <button onClick={() => handleOpenSignInDialog(true)}>Sign In</button>
      }
      {
        connectedEns && <button onClick={signOut}>Sign Out</button>
      }
      <pre>{JSON.stringify(connectedEns, null, 2)}</pre>
    </div>
  )
}

export const Example = () => {

  const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: import.meta.env.STORYBOOK_APP_CHAIN_ID === "1" ? [mainnet] : [sepolia],
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <SIWENSProvider config={JustaNameConfig}>
            <ConnectButton />
            <Session />
          </SIWENSProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

const meta: Meta<typeof Example> = {
  component: Example,
  title: 'Connect/Wallet',
  tags: ['autodocs'],

};
export default meta;
type Story = StoryObj<typeof Example>

export const Primary: Story = {
  args: {},
};

