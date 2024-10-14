import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JustWeb3Provider, JustWeb3ProviderConfig, useJustWeb3 } from '../lib';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { ChainId, SupportedCoins } from '@justaname.id/sdk';
import { Meta, StoryObj } from '@storybook/react';
import { useRecords } from '@justaname.id/react';
import { useState } from 'react';
import { Button } from '@justweb3/ui';
import { JustWeb3Button } from '../lib/components';

const queryClient = new QueryClient();

const JustWeb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: import.meta.env.STORYBOOK_APP_ORIGIN,
    domain: import.meta.env.STORYBOOK_APP_DOMAIN,

  },
  ensDomains: [
    {
      ensDomain:  import.meta.env.STORYBOOK_APP_ENS_DOMAIN,
      chainId: parseInt(import.meta.env.STORYBOOK_APP_CHAIN_ID) as ChainId
    }
  ],
  networks:[{
    chainId: parseInt(import.meta.env.STORYBOOK_APP_CHAIN_ID) as ChainId,
    providerUrl: import.meta.env.STORYBOOK_APP_PROVIDER_URL
  }],
  backendUrl: import.meta.env.STORYBOOK_APP_BACKEND_URL,
  openOnWalletConnect: true,
  allowedEns: 'all'
};

const Session = () => {
  const { connectedEns, handleOpenSignInDialog, signOut, updateRecords } = useJustWeb3();
  const { records } = useRecords({
    ens: connectedEns?.ens
  });
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [coinType, setCoinType] = useState('')
  const [address, setAddress] = useState('');
  const [contentHash, setContentHash] = useState('');
  const [contentHashProtocol, setContentHashProtocol] = useState('');
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
          <input type="text" placeholder="key" value={key} onChange={(e) => setKey(e.target.value)} />
          <input type="text" placeholder="value" value={value} onChange={(e) => setValue(e.target.value)} />
          <input type="text" placeholder="coinType" value={coinType} onChange={(e) => setCoinType(e.target.value)} />
          <input type="text" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <select value={contentHashProtocol} onChange={(e) => setContentHashProtocol(e.target.value)}>
            <option value="">Select Content Hash Protocol</option>
            <option value="ipfs">IPFS</option>
            <option value="swarm">Swarm</option>
            <option value="onion">Onion</option>
            <option value="skynet">Skynet</option>
            <option value="arweave">Arweave</option>
          </select>
          <input type="text" placeholder="contentHash" value={contentHash} onChange={(e) => setContentHash(e.target.value)} />
          <Button onClick={() => {
            updateRecords({
              text: [{ key, value }],
              addresses: [{
                address,
                coinType: coinType as SupportedCoins
              }],
              contentHash: {
                protocolType: contentHashProtocol,
                decoded: contentHash
              }
            });
          }}>Update</Button>
          {/*<UpdateRecordDialog*/}
          {/*  text={[{ key, value }]}*/}
          {/*  addresses={[{*/}
          {/*    address,*/}
          {/*    coinType: coinType as SupportedCoins*/}
          {/*  }]}*/}
          {/*  contentHash={{*/}
          {/*    protocolType: contentHashProtocol,*/}
          {/*    decoded: contentHash*/}
          {/*  }}*/}
          {/*  onCompleted={() => {*/}
          {/*    setKey('');*/}
          {/*    setValue('');*/}
          {/*    setCoinType('');*/}
          {/*    setAddress('');*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {(canUpdate) => {*/}
          {/*    return <Button disabled={!canUpdate}>*/}
          {/*      Update*/}
          {/*    </Button>;*/}
          {/*  }}*/}
          {/*</UpdateRecordDialog>*/}
        </div>
      }
      <pre>{JSON.stringify(connectedEns, null, 2)}</pre>
      <pre>{JSON.stringify(records, null, 2)}</pre>
    </div>
  );
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
          <JustWeb3Provider config={JustWeb3Config}>
            <JustWeb3Button>
              <ConnectButton />
            </JustWeb3Button>
            <Session />
          </JustWeb3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const meta: Meta<typeof Example> = {
  component: Example,
  title: 'Connect/Session'

};
export default meta;
type Story = StoryObj<typeof Example>

