# JustVerified

JustWeb3 Widget supports social verification through the **JustVerified Plugin**. This allows your users to verify their social identities (such as GitHub, Discord, Twitter, and others) in a decentralized and secure manner, adding a layer of trust and authentication to your dApp.

## Enabling JustVerified Plugin

To enable the **JustVerified Plugin**, include it within the `plugins` array in your JustWeb3 configuration. You can specify which social platforms you want your users to verify through. Currently, the following platforms are supported:

* **Twitter** (`'twitter'`)
* **Telegram** (`'telegram'`)
* **GitHub** (`'github'`)
* **Discord** (`'discord'`)
* **Email** (`'email'`)

You can choose any combination of these platforms based on your needs. For example, to enable verification for Twitter, GitHub, and Telegram:

```typescript
plugins: [
  JustVerifiedPlugin(['twitter', 'github', 'telegram'])
]
```



## Example Configuration with Github and Discord

In this example, we’ll show how to configure JustVerified with both **GitHub** and **Discord** as the required social platforms for verification.

```tsx
import { 
  JustVerifiedPlugin 
} from '@justverified/plugin';

const justweb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: "http://localhost:3000/",
    domain: "localhost",
    signInTtl: 86400000
  },
  openOnWalletConnect: true,
  allowedEns: "all",
  logo: "",
  ensDomains: [
    {
      ensDomain: "your ens domain",
      apiKey: "YOUR_API_KEY",
      chainId: 1
    }
  ],
  plugins: [
    JustVerifiedPlugin(['github', 'discord']) // Enabling GitHub and Discord verification
  ],
  color: {
    primary: "#FEA801",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)"
  }
};

```

This will enforce verification for the specified platforms, ensuring your users are authenticated with their social identities before accessing certain features or services in your dApp.
