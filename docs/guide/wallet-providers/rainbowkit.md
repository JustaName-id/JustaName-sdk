# RainbowKit

**RainbowKit** is a popular wallet connection library that simplifies the integration of various wallet providers into your dApp. It offers a highly customizable user experience for wallet connections, making it an excellent choice to use alongside the JustWeb3 Widget.

Here’s how to set up **RainbowKit** as a wallet provider in your project, along with the JustWeb3 Widget for ENS management and other features.

## Install Required Dependencies

To get started, you’ll need to install the necessary packages for RainbowKit, Wagmi, and JustWeb3. You can use the package manager of your choice:

{% tabs %}
{% tab title="npm" %}
```bash
npm install @rainbow-me/rainbowkit wagmi @tanstack/react-query @justweb3/widget
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm install @rainbow-me/rainbowkit wagmi @tanstack/react-query @justweb3/widget
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @rainbow-me/rainbowkit wagmi @tanstack/react-query @justweb3/widget
```
{% endtab %}
{% endtabs %}

## Initial Code Setup

In your main provider file (e.g., `Providers.tsx` or `App.tsx`), import the necessary components from RainbowKit, Wagmi, and JustWeb3:

```tsx
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import {
  JustWeb3Provider,
  JustWeb3ProviderConfig,
  JustWeb3Button,
} from "@justweb3/widget";
import { ConnectButton } from "@rainbow-me/rainbowkit";

```

This setup allows you to use **RainbowKit** for wallet connections, while **JustWeb3** handles ENS subname issuance, social verification, and other features.

## Configuration

You can configure RainbowKit and JustWeb3 to handle wallet connections and ENS management. In the code example below, RainbowKit is configured to work with **mainnet** and **sepolia** chains, and several wallets like **Argent**, **Trust Wallet**, and **Ledger** are added to the wallet options.

The JustWeb3 widget is set up to allow any ENS name for sign-in and provides the capability to issue subnames under a specified ENS domain.

{% hint style="info" %}
Note: Every dApp that relies on WalletConnect now needs to obtain a `projectId` from [WalletConnect Cloud](https://cloud.walletconnect.com/). This is absolutely free and only takes a few minutes.
{% endhint %}

```tsx
export default function Providers({ children }: { children: React.ReactNode }) {
  const { wallets } = getDefaultWallets();

  const config = getDefaultConfig({
    appName: "RainbowKit demo",
    projectId: "YOUR_PROJECT_ID",
    wallets: [
      ...wallets,
      {
        groupName: "Other",
        wallets: [argentWallet, trustWallet, ledgerWallet],
      },
    ],
    chains: [mainnet, sepolia],
    ssr: true,
  });

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

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <JustWeb3Provider config={justweb3Config}>
             <JustWeb3Button>
                <ConnectButton />
              </JustWeb3Button>
          </JustWeb3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

```

## Additional Wallet Configuration

In the example above, we’ve included **Argent**, **Trust Wallet**, and **Ledger** as additional wallet providers. You can easily add or remove wallets based on your dApp’s needs.

```typescript
wallets: [
  argentWallet,
  trustWallet,
  ledgerWallet,
],
```

You can also configure other wallet providers by replacing the `wallets` array with your desired wallet providers.
