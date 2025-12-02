# Quickstart

0\. Prerequisites

In order to integrate the JustaName React SDK, your project must run on:

* A minimum React version of **18**
* A minimum TypeScript version of **4** (optional but recommended)

***

### 1. Install the React SDK

Install the latest version of the JustaName React SDK using your package manager of choice:

{% tabs %}
{% tab title="npm" %}
```bash
npm install @justaname.id/react
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @justaname.id/react
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm install @justaname.id/react
```
{% endtab %}
{% endtabs %}

***

### 2. Create an Account

#### 2.1. Sign Up

Navigate to the [Admin Dashboard](https://dashboard.justaname.id/) and follow the simple sign-up process to create your account.

#### 2.2. Configure ENS Domain

Once your workspace is set up, configure your ENS domain.\
If you don't own an ENS domain, you can purchase one during this step.

***

### 3. Generate an API Key

After setting up your account, you can now issue an API key:

1. In the dashboard, go to the **API Key** section.
2. Generate your API key and make sure to save it securely, we won't be able to retrieve it for you later if it's lost.

**Congratulations!**\
You're all set. Now, you can move forward with configuring the SDK.

### 4. SDK Configuration

To use the JustaName React SDK, wrap your application with the `JustaNameProvider`. This component provides all child components access to the JustaName context, enabling seamless interaction with ENS services.

**Setup with `JustaNameProvider`**

Wrap your application with `JustaNameProvider` to enable ENS services across all child components.

```tsx
'use client';
import "@rainbow-me/rainbowkit/styles.css";
import '@justweb3/widget/styles.css';
import {
  getDefaultConfig,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import {
  JustWeb3Provider,
  JustWeb3ProviderConfig,
} from "@justweb3/widget";
import { JustaNameProvider } from '@justaname.id/react';
import type { JustaNameProviderConfig } from "@justaname.id/react";
import { JustVerifiedPlugin } from '@justverified/plugin';
import { ChainId } from '@justaname.id/sdk';
import { AddSubname } from './AddSubname';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'JustaName Console',
  projectId: 'YOUR_PROJECT_ID',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [mainnet, sepolia],
  ssr: true,
});


const justanameConfig: JustaNameProviderConfig = {
        config: {
            origin,
            domain: domain || 'localhost',
        },
        networks: [
            {
                chainId: 1,
                providerUrl: mainnetProviderUrl || '',
            },
        ],
        ensDomains:[{
            ensDomain: mainnetEnsDomain,
            chainId: 1,
            apiKey:  mainnetApiKey,
        }],
    };


const queryClient = new QueryClient();

export const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <JustaNameProvider config={justnameConfig}>
              <AddSubname />
          </JustaNameProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

```

### 5. You're all set! 🎉

You now have access to all the React SDK hooks. Continue to the next sections to learn about:

* Checking subname availability
* Issuing subnames
* Updating records
* ENS resolution
* Reverse resolution
* Fetching subnames by owner
