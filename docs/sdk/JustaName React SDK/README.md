**@justaname.id/react** • [**Docs**](globals.md)

***

# JustaName React SDK

The **JustaName React SDK** makes it easy to integrate Ethereum Name Service (ENS) functionalities, including subname management, and user authentication via ENS into React applications. It simplifies interacting with ENS off-chain operations while ensuring secure and easy integration with your dApps.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Setup with `JustaNameProvider`](#setup-with-justanameprovider)
    - [Example: Add a Subname](#example-add-a-subname)
- [Hooks](#hooks)
    - [Account and ENS Management](#account-and-ens-management)
    - [Subname Management](#subname-management)
    - [Authentication](#authentication)
    - [Other Hooks](#other-hooks)
---

## Installation

Install the JustaName React SDK using npm or yarn:

```bash
npm install @justaname.id/react

# or

yarn add @justaname.id/react
```

---

## Usage

### Setup with `JustaNameProvider`

To use the JustaName React SDK, wrap your application with the `JustaNameProvider`. This component provides all child components access to the JustaName context, enabling seamless interaction with ENS services.

### Example: Setup with `JustaNameProvider`

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

const justaNameConfig = {
     config: {
      origin: "http://localhost:3000/",
      domain: "localhost",
      signInTtl: 86400000,
    },
  networks: [{ chainId: 1, providerUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY' }],
  ensDomains: [
    { 
      chainId: 1, 
      domain: 'your_ens_domain.eth',
      apiKey: 'your-api-key' // Not recommended for production, use a backend server to protect your API key
    }
  ],
  backendUrl: 'https://your-backend-url.com' // Leave empty for same origin (e.g when using Next.js)
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

---

## Example: Add a Subname

Below is a complete example of a React component where users can claim a subname using the `useAddSubname` hook. It also checks subname availability with `useIsSubnameAvailable`.

```tsx
import { useAddSubname, useIsSubnameAvailable } from '@justaname.id/react';
import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export const AddSubname = () => {
  const { isConnected } = useAccount();
  const [username, setUsername] = useState<string>('');
  const debouncedUsername = useDebounce(username, 500);
  const { isSubnameAvailable } = useIsSubnameAvailable({ 
    username: debouncedUsername 
  });
  const { addSubname } = useAddSubname();

  return (
    <div>
      <h1>Claim your subdomain</h1>
      <ConnectButton />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter a subdomain"
      />
      <button
        onClick={() => addSubname({ username })}
        disabled={!isSubnameAvailable || !isConnected || !debouncedUsername}
      >
        Claim
      </button>
    </div>
  );
};

```

---

## Hooks

The SDK offers various hooks for managing ENS accounts, subnames, and authentication.

### Account and ENS Management

- **`useAccountEnsNames`**: Fetch ENS names associated with the user's account.
- **`useAddressEnsNames`**: Fetch ENS names for a given Ethereum address.
- **`usePrimaryName`**: Get the primary ENS name of an address.
- **`useAccountInvitations`**: Get pending invitations for the connected account.
- **`useAccountSubnames`**: Fetch all subnames for the connected account.

### Subname Management

- **`useIsSubnameAvailable`**: Check if a subname is available.
- **`useAddSubname`**: Add a new subname off-chain.
- **`useAcceptSubname`**: Accept an invitation for a subname.
- **`useRejectSubname`**: Reject a subname invitation.
- **`useRevokeSubname`**: Revoke an issued subname.
- **`useUpdateSubname`**: Update an ens metadata (off-chain and on-chain).
- **`useSearchSubnames`**: Search for subnames based on given parameters.
- **`useSubname`**: Get the details of a specific subname.
- **`useRecords`**: Fetch records associated with any ENS name.


### Authentication

- **`useEnsSignIn`**: Authenticate users with their ENS name.
- **`useEnsSignOut`**: Sign out the connected user.
- **`useEnsAvatar`**: Fetch the avatar of an ENS name.
- **`useEnsAuth`**: Manage authentication state with ENS.

### Other Hooks

- **`useJustaName`**: Access the JustaName context directly.
- **`useMounted`**: Check if the component is mounted.
- **`useMountedAccount`**: Get the mounted account details.
- **`useOffchainResolvers`**: Fetch off-chain resolvers.
- **`useUpdateChanges`**: Check for changes in the ENS metadata before updating.
- **`useUploadMedia`**: Upload media for ENS metadata.

### Contributing
Contributions are welcome! If you have suggestions or find issues, please open an issue or submit a pull request on the GitHub repository.
