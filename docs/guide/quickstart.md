---
icon: gauge-max
description: >-
  The JustWeb3 Widget is the easiest way to get the best digital identity suite
  in your dApp.
---

# Quickstart

In under 5 minutes of setup and customization, you can start:

* Issuing free branded subnames to your userbase
* Authenticating your users with SIWENS
* Enabling them to edit and manage their profile in a cryptographically secured way
* Freeing your dApp from sybil actors with the use of social verifications and ZK-KYC

While we take care of setting up your admin dashboard in the background, to provide you with the best analytics, enabling you to learn about your community and start engaging them via our trusted decentralized mediums.

### 0. Prerequisites

In order to Integrate the JustWeb3 Widget, your project must run on:

* a [minimum react version of 18](https://react.dev/learn/start-a-new-react-project)
* a minimun typescript version of 4

### 1. Install the JustWeb3 Widget

Install the latest version of the [JustWeb3 Widget ](https://www.npmjs.com/package/@justweb3/widget)using your package manager of choice:

{% tabs %}
{% tab title="npm" %}
```bash
npm install @justweb3/widget
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm install @justweb3/widget
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @justweb3/widget
```
{% endtab %}
{% endtabs %}

### 2. Create an Account

#### 2.1. Sign Up:

Navigate to the [Admin Dashboard](https://dashboard.justaname.id/) and follow the simple sign-up process to create your account.

#### 2.2. Configure ENS Domain:

* Once your workspace is set up, configure your ENS domain.
* If you don’t own an ENS domain, you can purchase one during this step.

### 3. Generate an API Key

After having set up your account, you can now issue an api key:

* In the dashboard, go to the API Key section.
* Generate your API key and make sure to **save it securely**—we won't be able to retrieve it for you later if it’s lost.

**Congratulations!**\
You're all set. Now, you can move forward with configuring the widget.

### 4. Widget Configuration

In your project, import the JustWeb3Provider component and wrap your app with it.

An example set up for a [NextJs](https://nextjs.org/) or a [React Vite](https://vite.dev/guide/) project, can be found below:\


{% hint style="info" %}
Please note the below example uses [RainbowKit](https://www.rainbowkit.com/). You can replace it with any web3 wallet provider. ([WalletConnect](https://explorer.walletconnect.com/), [Web3Auth](https://web3auth.io/), [Privy](https://www.privy.io/) ...)
{% endhint %}

{% tabs %}
{% tab title="NextJS" %}
```tsx
'use client';

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

export default function Providers({children}: {children: React.ReactNode}) {
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
            {children}
          </JustWeb3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
```
{% endtab %}

{% tab title="React" %}
```tsx
import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
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

export const App: React.FC = () => {
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
};

```
{% endtab %}
{% endtabs %}

To install the required dependencies, run the following command in your terminal:

{% tabs %}
{% tab title="npm" %}
```bash
npm install wagmi @rainbow-me/rainbowkit @tanstack/react-query
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm install wagmi @rainbow-me/rainbowkit @tanstack/react-query
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add wagmi @rainbow-me/rainbowkit @tanstack/react-query
```
{% endtab %}
{% endtabs %}

### 5. You're all set!  🎉

You can find more information on how to customize your widget in the configuration section

{% content-ref url="configuration/overview.md" %}
[overview.md](configuration/overview.md)
{% endcontent-ref %}

