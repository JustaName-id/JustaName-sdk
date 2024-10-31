# @justverified/plugin

The **@justverified/plugin** integrates easily with the **JustWeb3 Widget** to provide social verification capabilities, enabling your users to verify their identities through platforms like **Twitter**, **GitHub**, **Discord**, **Telegram**, and **Email**. These verifications add a layer of trust and authentication, protecting your dApp from Sybil attacks and ensuring a secure, decentralized user experience.

For complete documentation, visit the [JustaName Documentation](https://docs.justaname.id/).

---

## Features

- **Social Identity Verification:** Allow users to authenticate via their social accounts.
- **Supported Platforms:**
    - Twitter (`twitter`)
    - GitHub (`github`)
    - Discord (`discord`)
    - Telegram (`telegram`)
    - Email (`email`)
    - Coming Soon: Google, LinkedIn, and Proof of Humanity
- **Easy Integration:** Enable the plugin by adding it to the `plugins` array in your **JustWeb3** configuration.
- **Extendable UI:** Customize the verification dialog and components to fit your design needs.

---

## Installation

Install the plugin using your preferred package manager:

```bash
bash
npm install @justverified/plugin

# or

yarn add @justverified/plugin
```

---

## Usage Example

Here’s how to enable social verification for **GitHub** and **Discord** in your widget configuration:

```tsx
tsx
import { JustVerifiedPlugin } from '@justverified/plugin';

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
  plugins: [
    JustVerifiedPlugin(['github', 'discord']) // Enable GitHub and Discord verification
  ],
  color: {
    primary: "#FEA801",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)",
  },
};

```

This configuration ensures that users must verify their **GitHub** and **Discord** identities to access specific features or services within your dApp.