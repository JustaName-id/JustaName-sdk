# Coinbase Smart Wallet

In this section, we will guide you through setting up the JustWeb3 Widget with the **Coinbase Smart Wallet** using **Wagmi**.

## Create a new React App with Wagmi

Start by creating a new React app using Wagmi's template. Run the following command to scaffold your project:

{% tabs %}
{% tab title="npm" %}
```bash
npm create wagmi
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm create wagmi
```
{% endtab %}
{% endtabs %}

Follow the prompts to set up your React project using Vite.

Once your app is created, install the required dependencies with the following command:

{% tabs %}
{% tab title="npm" %}
```bash
npm install && npm install @justweb3/widget
```
{% endtab %}

{% tab title="pnpm" %}
<pre class="language-bash"><code class="lang-bash"><strong>pnpm install &#x26;&#x26; pnpm install @justweb3/widget
</strong></code></pre>
{% endtab %}
{% endtabs %}

## Setup the Wagmi Configuration with Coinbase Smart Wallet

`src/wagmi.ts` should look something like this:

```tsx
import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [coinbaseWallet()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

```

## Configure the JustWeb3 Widget

Next, you'll configure the JustWeb3 Widget by adding it to your `main.tsx`. This ensures that JustWeb3 manages user authentication and ENS-related functionality within your dApp, while the **Coinbase Wallet** provides a wallet connection.

In your `main.tsx`, you’ll integrate **Wagmi** and the JustWeb3 Widget as shown below:

```tsx
import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { JustWeb3Provider, JustWeb3ProviderConfig, JustWeb3Button } from "@justweb3/widget";

import App from "./App.tsx";
import { config } from "./wagmi.ts";  // Importing Wagmi config

import "./index.css";

// Buffer setup for global compatibility
globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

// JustWeb3 Widget configuration
const justweb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: "http://localhost:5173/",
    domain: "localhost",
    signInTtl: 86400000,
  },
  openOnWalletConnect: true,
  allowedEns: "all",  // Allow all ENS names for sign-in
  logo: "",
  ensDomains: [
    {
      ensDomain: "YOUR ENS DOMAIN",  // Set your ENS domain
      apiKey: "JUSTANAME API KEY",   // Add your JustaName API key
      chainId: 1,
    },
  ],
  color: {
    primary: "hsl(216, 90%, 58%)",   // Custom primary color
    background: "hsl(0, 0%, 100%)",  // Background color
    destructive: "hsl(0, 100%, 50%)",  // Destructive actions color
  },
};

// Render the app with JustWeb3 and Wagmi configuration
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
       <JustWeb3Provider config={justweb3Config}>
          <JustWeb3Button>
            <App />
          </JustWeb3Button>
        </JustWeb3Provider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
```

## Running Your App

Once you've set up the configuration files, you can run your app to test the integration:

{% tabs %}
{% tab title="npm" %}
```bash
npm run dev
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm run dev
```
{% endtab %}
{% endtabs %}

This will start the development server for your React app. You should be able to connect using the **Coinbase Wallet** via Wagmi and leverage the **JustWeb3 Widget** for ENS management, identity verification, and more.
