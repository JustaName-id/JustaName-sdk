import {
  JustWeb3Button,
  JustWeb3Provider,
  JustWeb3ProviderConfig,
} from '@justweb3/widget';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  createConfig,
  CreateConfigParameters,
  http,
  useAccount,
  useConnect,
  useDisconnect,
  WagmiProvider,
} from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EFPPlugin } from '@justweb3/efp-plugin';
import { JustVerifiedPlugin } from '@justverified/plugin';
import { CapsuleWeb, Environment, OAuthMethod } from '@usecapsule/react-sdk';
import { capsuleConnector } from '@usecapsule/wagmi-v2-integration';
import '@usecapsule/react-sdk/styles.css';

const queryClient = new QueryClient();

export const capsuleClient = new CapsuleWeb(
  Environment.BETA,
  import.meta.env.VITE_CAPSULE_API_KEY
);

const connector = capsuleConnector({
  capsule: capsuleClient,
  chains: [sepolia],
  appName: 'JustaName Integration',
  options: {},
  nameOverride: 'Capsule',
  idOverride: 'capsule',
  oAuthMethods: Object.values(OAuthMethod),
  disableEmailLogin: false,
  disablePhoneLogin: false,
  onRampTestMode: false,
});

const config: CreateConfigParameters = {
  chains: [mainnet],
  connectors: [connector],
  transports: {
    [mainnet.id]: http(),
  },
};

const wagmiProviderConfig = createConfig(config);

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
  plugins: [EFPPlugin, JustVerifiedPlugin(['github', 'email', 'discord'])],
  dev: import.meta.env.VITE_APP_DEV === 'true',
  allowedEns: 'all',
};

export const AuthContent = () => {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <h1>AuthWithWagmi</h1>
      {isConnected ? (
        <div>
          <p>Connected as {address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <div>
          {connectors
            .filter((connector) => connector.id === 'capsule')
            .map((connector) => (
              <button key={connector.id} onClick={() => connect({ connector })}>
                Connect with {connector.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <WagmiProvider config={wagmiProviderConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <JustWeb3Provider config={JustaNameConfig}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <JustWeb3Button>
                <AuthContent />
              </JustWeb3Button>
            </div>
          </JustWeb3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
