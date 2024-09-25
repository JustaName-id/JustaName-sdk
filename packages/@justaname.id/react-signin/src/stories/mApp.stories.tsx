import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JustSignInProvider, JustSignInProviderConfig, useSignInWithJustaName } from '../lib';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import { WagmiProvider } from 'wagmi';
import { ChainId } from '@justaname.id/sdk';
import { useMApp } from '../lib/hooks';
import { Button } from '@justaname.id/react-ui'
import { useRecords } from '@justaname.id/react';
const queryClient = new QueryClient();

const JustSignInConfig: JustSignInProviderConfig = {
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
  allowedEns:'all',
}

const Session = () => {
  const { connectedEns, handleOpenSignInDialog, signOut} = useSignInWithJustaName()
  const { records } = useRecords({
    fullName: connectedEns?.ens,
  });
  const {
    handleOpenMAppDialog,
    revokeMAppPermission,
    isMAppEnabled,
    canOpenMAppDialog
  } = useMApp({
    mApp: "justverified.eth"
  })

  return (
    <div>
      <h1>Subname Session</h1>
      <Button
        onClick={() => handleOpenMAppDialog(true)}
        disabled={!canOpenMAppDialog}
      >Open MApp</Button>
      {
        !connectedEns && <button onClick={() => handleOpenSignInDialog(true)}>Sign In</button>
      }
      {
        connectedEns && <button onClick={signOut}>Sign Out</button>
      }
      <pre>{JSON.stringify(connectedEns, null, 2)}</pre>
      <pre>{JSON.stringify(records, null, 2)}</pre>
      {
        isMAppEnabled && <Button
          onClick={() => revokeMAppPermission({
            ens: connectedEns?.ens || ''
          })}
        >Remove Permission</Button>
      }
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
          <JustSignInProvider config={JustSignInConfig}>
            <ConnectButton />
            <Session />
          </JustSignInProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

const meta: Meta<typeof Example> = {
  component: Example,
  title: 'Connect/MAppDialog',
};

export default meta;
// @ts-ignore
type Story = StoryObj<typeof Example>
