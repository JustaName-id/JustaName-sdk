# Para

Para is a cross-app embedded wallet provider. It supports OAuth methods (e.g., Google, Apple) and other modern authentication mechanisms, making it an excellent choice for onboarding Web2 users into Web3.

## Installing Required Dependencies:

Run the following command to install the necessary packages:

{% tabs %}
{% tab title="npm" %}
<pre class="language-bash"><code class="lang-bash"><strong>npm install @justweb3/widget @getpara/react-sdk @getpara/wagmi-v2-integration wagmi @tanstack/react-query ethers
</strong></code></pre>
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm install @justweb3/widget @getpara/react-sdk @getpara/wagmi-v2-integration wagmi @tanstack/react-query ethers
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @justweb3/widget @getpara/react-sdk @getpara/wagmi-v2-integration wagmi @tanstack/react-query ethers
```
{% endtab %}
{% endtabs %}

## Environment Variables

Set up environment variables in a `.env` file:

```bash
VITE_JUSTANAME_API_KEY=your-justaname-api-key
VITE_JUSTANAME_ENS_DOMAIN=your-ens-domain.eth
VITE_PARA_API_KEY=your-para-api-key
```

To configure your ens domain and get your JustaName api key, head over to the [Dashboard](https://dashboard.justaname.id)

To configure your para api key, head over to the [Developer Dashboard](https://developer.getpara.com/)

## Project Configuration

### Para Configuration

Import and initialize Para with your `VITE_PARA_API_KEY`:

```tsx
import ParaWeb, { Environment } from "@getpara/react-sdk";

export const paraClient = new ParaWeb(
  Environment.BETA,
  import.meta.env.VITE_PARA_API_KEY
);
```

Configure the Para connector for Wagmi:

```tsx
import { paraConnector } from "@getpara/wagmi-v2-integration";
import { sepolia } from "wagmi/chains";

const connector = paraConnector({
  para: paraClient,
  chains: [sepolia],
  appName: "JustaName Integration",
  options: {},
  nameOverride: "Para",
  idOverride: "Para",
  oAuthMethods: Object.values(OAuthMethod),
  disableEmailLogin: false,
  disablePhoneLogin: false,
  onRampTestMode: false,
});
```

### JustWeb3 Configuration

Configure JustWeb3 with your API key and ENS domain:

```tsx
import { JustWeb3ProviderConfig } from "@justweb3/widget";

const justweb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: "http://localhost:3000/",
    domain: "localhost",
    signInTtl: 86400000,
  },
  openOnWalletConnect: true,
  allowedEns: "all",
  logo: "",
  ensDomains: [
    {
      ensDomain: import.meta.env.VITE_JUSTANAME_ENS_DOMAIN,
      apiKey: import.meta.env.VITE_JUSTANAME_API_KEY,
      chainId: 11155111, // Sepolia chain ID
    },
  ],
  color: {
    primary: "hsl(216, 90%, 58%)",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)",
  },
  backendUrl: "http://localhost:3333",
};
```

### Setting Up Wagmi and Providers

Integrate Para and JustWeb3 with Wagmi:

```tsx
import { createConfig, WagmiProvider } from "wagmi";
import { http } from "wagmi";

const config = {
  chains: [sepolia],
  connectors: [connector],
  transports: {
    [sepolia.id]: http(),
  },
};

const wagmiProviderConfig = createConfig(config);
```

### Component Setup

Create an authentication component to handle connections:

```tsx
import { useAccount, useConnect, useDisconnect } from "wagmi";

const AuthContent = () => {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <h1>Para 🤝 JustaName</h1>
      {isConnected ? (
        <div>
          <p>Connected as {address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <div>
          {connectors
            .filter((connector) => connector.id === "para")
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
```

Wrap the application with providers:

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JustWeb3Provider, JustWeb3Button } from "@justweb3/widget";

const queryClient = new QueryClient();

const AuthWithWagmi = () => {
  return (
    <WagmiProvider config={wagmiProviderConfig}>
      <QueryClientProvider client={queryClient}>
        <JustWeb3Provider config={justweb3Config}>
          <JustWeb3Button>
            <AuthContent />
          </JustWeb3Button>
        </JustWeb3Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default AuthWithWagmi;
```

## Additional Resources

[Example Integration Repository](https://github.com/JustaName-Integrations/justaname-capsule-example)
