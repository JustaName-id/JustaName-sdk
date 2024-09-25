import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JustSignInProvider, JustSignInProviderConfig, useSignInWithJustaName } from '../lib';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { ChainId } from '@justaname.id/sdk';
import { Meta, StoryObj } from '@storybook/react';
import { useRecords, useUpdateSubname } from '@justaname.id/react';
import { useState } from 'react';
import { Button } from '@justaname.id/react-ui';

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
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [address, setAddress] = useState('')

  const { updateSubname, isUpdateSubnamePending } = useUpdateSubname()
  return (
    <div>
      <h1>Subname Session</h1>
      {
        !connectedEns && <button onClick={() => handleOpenSignInDialog(true)}>Sign In</button>
      }
      {
        connectedEns && <button onClick={signOut}>Sign Out</button>
      }
      {
        connectedEns &&
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="key" onChange={(e) => setKey(e.target.value)} />
          <input type="text" placeholder="value" onChange={(e) => setValue(e.target.value)} />
          <Button onClick={() => {
            if (key) {
              updateSubname({
                fullEnsDomain: connectedEns.ens,
                text: [{ key, value }],
              })
            }
          }}
            disabled={isUpdateSubnamePending || !key}
          >Update Subname</Button>
          <input type="text" placeholder="address" onChange={(e) => setAddress(e.target.value)} />
          <Button onClick={() => {
              updateSubname({
                fullEnsDomain: connectedEns.ens,
                addresses: [{ coinType: "0", address }],
              })

          }}
            disabled={isUpdateSubnamePending || !address}
          >
            Update Address
          </Button>

          <Button onClick={() => {
              updateSubname({
                fullEnsDomain: connectedEns.ens,
                addresses: [{ coinType: "0", address }],
                text: [{ key, value }],
              })

          }}
            disabled={isUpdateSubnamePending }
                  >
            Update All
          </Button>
        </div>
      }
      <pre>{JSON.stringify(connectedEns, null, 2)}</pre>
      <pre>{JSON.stringify(records, null, 2)}</pre>
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
  title: 'Connect/Wallet',

};
export default meta;
// @ts-ignore
type Story = StoryObj<typeof Example>

