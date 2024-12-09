# EFP

EthFollow is a decentralized follow protocol built on Ethereum that allows users to track and subscribe to updates and activities of Ethereum addresses or entities. This approach enables on-chain “followers” and “followed” relationships, facilitating the creation of social graphs directly on the blockchain. Such functionality can be integrated into social dApps, enabling curated feeds, trust networks, and reputation systems without relying on traditional centralized platforms.

```tsx
import { JustVerifiedPlugin } from '@justverified/plugin';

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
      ensDomain: "YOUR ENS DOMAIN",
      apiKey: "JUSTANAME API KEY",
      chainId: 1
    }
  ],
  plugins: [
    EFPPlugin // Enabling EFP Plugin
  ],
  color: {
    primary: "#FEA801",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)"
  }
};
```

