import { SIWJProvider, SIWJProviderConfig } from '@justaname.id/react-signin'
import '@rainbow-me/rainbowkit/styles.css';
import { http } from 'wagmi';
import {
  mainnet,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ChainId } from '@justaname.id/sdk';
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import {createConfig, WagmiProvider} from '@privy-io/wagmi';
import { useSubnameSession } from '@justaname.id/react';

const queryClient = new QueryClient();

const JustaNameConfig: SIWJProviderConfig = {
  config: {
    chainId: parseInt(import.meta.env.VITE_APP_CHAIN_ID) as ChainId,
    origin: import.meta.env.VITE_APP_ORIGIN,
    domain: import.meta.env.VITE_APP_DOMAIN,
  },
  backendUrl: import.meta.env.VITE_APP_BACKEND_URL,
  providerUrl: import.meta.env.VITE_APP_PROVIDER_URL,
  ensDomain: import.meta.env.VITE_APP_ENS_DOMAIN,
  openOnWalletConnect: true,
  allowedSubnames:'all'
}

const Connect = () => {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { subnameSession} = useSubnameSession();
  if (!ready) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* If the user is not authenticated, show a login button */}
        {/* If the user is authenticated, show the user object and a logout button */}
        {ready && authenticated ? (
          <div>
            <textarea
              readOnly
              value={JSON.stringify(user, null, 2)}
              style={{ width: "600px", height: "250px", borderRadius: "6px" }}
            />
            <br />
            <button onClick={logout} style={{ marginTop: "20px", padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}>
              Log Out
            </button>
          </div>
        ) : (
          <button onClick={login} style={{padding: "12px", backgroundColor: "#069478", color: "#FFF", border: "none", borderRadius: "6px" }}>Log In</button>
        )}
        {
          subnameSession && <div>
            <textarea
              readOnly
              value={JSON.stringify(subnameSession, null, 2)}
              style={{ width: "600px", height: "250px", borderRadius: "6px" }}
            />
          </div>
        }
      </header>
    </div>
  )
}



export function App() {

  const config = createConfig({
    chains: [mainnet, sepolia], // Pass your required chains as an array
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      // For each of your required chains, add an entry to `transports` with
      // a key of the chain's `id` and a value of `http()`
    },
  });

  return (
    <PrivyProvider
      appId={process.env.VITE_APP_PRIVY_APP_ID || ''}
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
        <SIWJProvider config={JustaNameConfig} >
          <Connect />
        </SIWJProvider>
    </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}

export default App;