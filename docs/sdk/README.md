# JustWeb3 Widget

**@justweb3/widget** • [**Docs**](<JustWeb3 Widget/globals.md>)

***

## @justweb3/widget

The **@justweb3/widget** library offers a complete identity solution for dApps. In just a few minutes, you can start issuing ENS subnames, authenticating users with SIWENS, managing profiles securely, and preventing Sybil attacks through social verifications and Proof of Personhood. The widget also integrates seamlessly with the **Admin Dashboard** to provide analytics and community engagement tools.

For detailed documentation, visit the official [JustaName Documentation](https://docs.justaname.id/).

### Try it out today on [Demo](https://demo.justaname.id/).

***

### Table of Contents

* [Overview](./#overview)
* [Installation](./#installation)
* [Setup](./#setup)
* [Configuration](./#configuration)
* [Appearance Customization](./#appearance-customization)
* [Network Configuration](./#network-configuration)
* [Features](./#features)
* [License](./#license)

***

### Overview

The **JustWeb3 Widget** is designed to simplify identity management for dApps. It provides:

* **ENS Subname Issuance:** Issue branded subnames for your users.
* **SIWENS Authentication:** Secure user authentication via ENS domains.
* **Profile Management:** Allow users to update and manage their profiles.
* **Social Verifications & Proof of Personhood:** Prevent Sybil attacks with social and zero-knowledge proofs.
* **Plugins:** Extend the widget’s capabilities with custom plugins.
* **Admin Dashboard:** Monitor subname usage and engage with your community.

***

### Installation

Install the widget with your preferred package manager:

```bash
bash
Copy code
npm install @justweb3/widget

```

You will also need additional dependencies:

```bash
bash
Copy code
npm install wagmi @rainbow-me/rainbowkit @tanstack/react-query

```

***

### Setup

Below is a sample setup for **Next.js** or **Vite** projects. The widget works with **RainbowKit** or any other wallet provider like WalletConnect, Privy, or Web3Auth.

#### Example Integration

```tsx
'use client';

import "@rainbow-me/rainbowkit/styles.css";
import '@justweb3/widget/styles.css';
import {
  getDefaultConfig,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JustWeb3Provider, JustWeb3Button } from "@justweb3/widget";
import { mainnet, sepolia } from "wagmi/chains";

const Providers = ({ children }) => {
  const { wallets } = getDefaultWallets();
  const config = getDefaultConfig({
    appName: "Your dApp",
    wallets,
    chains: [mainnet, sepolia],
  });

  const justweb3Config = {
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
        ensDomain: "yourdomain.eth",
        apiKey: "YOUR_API_KEY",
        chainId: 1,
      },
    ],
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

export default Providers;

```

***

### Configuration

#### API Key Setup

1. **Sign Up:** Create an account in the [Admin Dashboard](https://docs.justaname.id/).
2. **Configure ENS Domain:** Set up your domain, or purchase one if needed.
3. **Generate API Key:** Save your API key securely—it will not be retrievable later.

#### Widget Configuration

```tsx
const justweb3Config = {
  config: {
    origin: "http://localhost:3000/",
    domain: "localhost",
    signInTtl: 86400000,
  },
  openOnWalletConnect: true,
  allowedEns: "all",
  logo: "https://yourdomain.com/your-logo.png",
  ensDomains: [
    {
      chainId: 1,
      domain: 'your_ens_domain.eth',
      apiKey: 'your-api-key' // Not recommended for production, use a backend server to protect your API key
    }
  ],
  backendUrl: 'https://your-backend-url.com', // Leave empty for same origin (e.g when using Next.js)
  color: {
    primary: 'hsl(216, 90%, 58%)', // Sky Blue
    background: 'hsl(0, 0%, 100%)', // White
    destructive: 'hsl(0, 100%, 50%)', // Red
  },
};

```

***

### Appearance Customization

The widget supports easy appearance customization to fit your dApp's branding.

* **Primary Color:** Controls buttons, links, and accents.
* **Background Color:** Matches the widget’s background with your design.
* **Destructive Color:** Used for warnings or destructive actions.
* **Logo:** Add a custom logo to enhance branding.

```tsx
const justweb3Config = {
  color: {
    primary: 'hsl(216, 90%, 58%)',
    background: 'hsl(0, 0%, 100%)',
    destructive: 'hsl(0, 100%, 50%)',
  },
  logo: 'https://yourdomain.com/logo.png',
};

```

***

### Network Configuration

The widget supports **Ethereum Mainnet** and **Sepolia Testnet**. Use public RPCs or provide custom URLs.

```tsx
const justweb3Config = {
  networks: [
    { chainId: 1, providerUrl: "YOUR_MAINNET_PROVIDER_URL" },
    { chainId: 11155111, providerUrl: "YOUR_SEPOLIA_PROVIDER_URL" },
  ],
};

```

If no custom provider is specified, the widget defaults to public RPC URLs.

***

### Features

* **Complete ENS Management:** Claim, update, and authenticate ENS subnames.
* **JustEnsCard Component:** Displays detailed ENS data for any name.
* **SIWENS Authentication:** Secure, decentralized sign-in using ENS.
* **Extendable via Plugins:** Add new features with ease.
* **Admin Dashboard Integration:** Monitor user activity and subname management.
* **Flexible Wallet Integration:** Works with RainbowKit, WalletConnect, Privy, and more.

***

### License

This project is licensed under the MIT License. For more details, refer to the official [JustaName Documentation](https://docs.justaname.id/).
