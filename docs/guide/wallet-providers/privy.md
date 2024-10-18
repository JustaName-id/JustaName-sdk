# Privy

**Privy** is an embedded wallet provider that offers a seamless user experience by creating wallets automatically upon login. It supports various login methods, including email and SMS, making it easy for users to interact with blockchain applications. In this section, we'll configure Privy as a wallet provider alongside the JustWeb3 Widget for ENS management and decentralized identity features.

## Installing Required Dependencies

To get started, install the required packages for **Privy**, **JustWeb3**, **wagmi**, and **react-query**:

{% tabs %}
{% tab title="npm" %}
```bash
npm install @privy-io/react-auth @privy-io/wagmi @justweb3/widget @tanstack/react-query wagmi
```
{% endtab %}

{% tab title="pnpm" %}
<pre class="language-bash"><code class="lang-bash"><strong>pnpm install @privy-io/react-auth @privy-io/wagmi @justweb3/widget @tanstack/react-query wagmi
</strong></code></pre>
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @privy-io/react-auth @privy-io/wagmi @justweb3/widget @tanstack/react-query wagmi
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Note you might need to additionly install the `@solana/web3.js` as the `@privy-io/react-auth` package requires it
{% endhint %}

## Initial Code Setup

In your main file (e.g., `App.tsx` or `Providers.tsx`), import the necessary components from **Privy**, **wagmi**, and **JustWeb3**.

```tsx
import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import { JustWeb3Provider, JustWeb3ProviderConfig, JustWeb3Button } from "@justweb3/widget";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { createConfig, WagmiProvider } from "@privy-io/wagmi";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { useEnsAuth } from "@justaname.id/react";
```

## Configuration

In this setup, you can define the configuration for both Privy and JustWeb3. The **PrivyProvider** manages user authentication and wallet creation, while the **JustWeb3Provider** handles ENS-based authentication and identity management.

* The `embeddedWallets` option in Privy’s config specifies how and when wallets should be created.
* The `loginMethods` array defines the available login methods, such as email and SMS.
* The JustWeb3 configuration includes customization for ENS management and color theming.

```tsx
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
      ensDomain: "YOUR ENS DOMAIN",
      apiKey: "YOUR JUSTANAME API KEY",
      chainId: 1,
    },
  ],
  color: {
    primary: "hsl(216, 90%, 58%)",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)",
  },
};

```

For the Privy configuration, you define how users log in and whether embedded wallets are created automatically:

```tsx
<PrivyProvider
  appId={"YOUR PRIVY APP ID"}
  config={{
    embeddedWallets: {
      createOnLogin: "all-users",
      noPromptOnSignature: false,
    },
    loginMethods: ["email", "sms"],
  }}
>

```

{% hint style="info" %}
For additional configuration settings, please refer to the [Privy Documentation](https://docs.privy.io/)
{% endhint %}

### Using Privy for Authentication

The `Connect` component handles the authentication flow using Privy. It displays a login button, and if the user is authenticated, it shows the user object and ENS information.

```tsx
const Connect = () => {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { connectedEns } = useEnsAuth();

  if (!ready) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
         <JustWeb3Button>
          <button
            onClick={login}
            style={{
              padding: "12px",
              backgroundColor: "#069478",
              color: "#FFF",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Log In
          </button>
         </JustWeb3Button>
        )}
        {connectedEns && (
          <div>
            <textarea
              readOnly
              value={JSON.stringify(connectedEns, null, 2)}
              style={{ width: "600px", height: "250px", borderRadius: "6px" }}
            />
          </div>
        )}
      </header>
    </div>
  );
};

```

### Creating Network Configuration with Privy

Configure the blockchain networks (mainnet and sepolia) and specify the RPC URLs using Privy’s `createConfig` function.

```tsx
const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

```

## Full Example Setup

Here's the full implementation combining Privy, and JustWeb3:

```tsx
import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import { JustWeb3Provider, JustWeb3ProviderConfig, JustWeb3Button } from "@justweb3/widget";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { createConfig, WagmiProvider } from "@privy-io/wagmi";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { useEnsAuth } from "@justaname.id/react";

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
      ensDomain: "YOUR ENS DOMAIN",
      apiKey: "JUSTANAME API KEY",
      chainId: 1,
    },
  ],
  color: {
    primary: "hsl(216, 90%, 58%)",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)",
  },
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
        {/* If the user is not authenticated, show a login button */}
        {/* If the user is authenticated, show the user object and a logout button */}
          <JustWeb3Button>
          <button
            onClick={login}
            style={{
              padding: "12px",
              backgroundColor: "#069478",
              color: "#FFF",
              border: "none",
              borderRadius: "6px",
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
              style={{ width: "600px", height: "250px", borderRadius: "6px" }}
            />
          </div>
        )}
      </header>
    </div>
  );
};

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <PrivyProvider
      appId={"YOUR PRIVY APP ID"}
      config={{
        embeddedWallets: {
          createOnLogin: "all-users",
          noPromptOnSignature: false,
        },
        loginMethods: ["email", "sms"],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <JustWeb3Provider config={justweb3Config}>
           <Connect />
          </JustWeb3Provider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

export default App;
```



