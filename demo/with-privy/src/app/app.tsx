import {
  JustWeb3Button,
  JustWeb3Provider,
  JustWeb3ProviderConfig,
} from '@justweb3/widget';
import '@rainbow-me/rainbowkit/styles.css';
import { http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import { createConfig, WagmiProvider } from '@privy-io/wagmi';
import { useEnsAuth } from '@justaname.id/react';

const queryClient = new QueryClient();

const JustaNameConfig: JustWeb3ProviderConfig = {
  config: {
    origin: import.meta.env.VITE_APP_ORIGIN,
    domain: import.meta.env.VITE_APP_DOMAIN,
  },
  backendUrl: import.meta.env.VITE_APP_BACKEND_URL,
  networks: [
    {
      chainId: 1,
      providerUrl: import.meta.env.VITE_APP_MAINNET_PROVIDER_URL,
    },
    {
      chainId: 11155111,
      providerUrl: import.meta.env.VITE_APP_SEPOLIA_PROVIDER_URL,
    },
  ],
  openOnWalletConnect: true,
  allowedEns: 'all',
};

const Connect = () => {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { connectedEns } = useEnsAuth();
  if (!ready) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
        <JustWeb3Button logout={logout}>
          <button
            onClick={() => {
              if (!authenticated) {
                login();
              } else {
                logout().then(() => {
                  login();
                });
              }
            }}
            style={{
              padding: '12px',
              backgroundColor: '#069478',
              color: '#FFF',
              border: 'none',
              borderRadius: '6px',
            }}
          >
            Log In
          </button>
        </JustWeb3Button>
        {connectedEns && (
          <div>
            <textarea
              readOnly
              value={JSON.stringify(connectedEns, null, 2)}
              style={{ width: '600px', height: '250px', borderRadius: '6px' }}
            />
            <textarea
              readOnly
              value={JSON.stringify(user, null, 2)}
              style={{ width: '600px', height: '250px', borderRadius: '6px' }}
            />
          </div>
        )}
      </header>
    </div>
  );
};

export function App() {
  const config = createConfig({
    chains: [mainnet, sepolia], // Pass your required chains as an array
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  });

  return (
    <PrivyProvider
      appId={import.meta.env.VITE_APP_PRIVY_APP_ID || ''}
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
          <JustWeb3Provider config={JustaNameConfig}>
            <Connect />
          </JustWeb3Provider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}

export default App;
