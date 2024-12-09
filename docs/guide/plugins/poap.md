# POAP

Proof of Attendance Protocol allows event organizers—physical or virtual—to issue digital badges (NFTs) as proof that someone attended or participated in a specific event. These badges are ERC-721 tokens minted on Ethereum (often issued on Ethereum mainnet or side-chains for lower cost). POAPs have become popular at crypto conferences, online meetups, and community calls to:

* Mark attendance and involvement.
* Build personal onchain histories.
* Reward loyal community members.

Since POAPs are NFTs, they’re collectible and can be displayed as on-chain credentials that reflect a user’s engagement and interests over time.

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
    POAPPlugin({ apiKey: '<YOUR_POAP_API_KEY>' }) // Enabling POAP Plugin
  ],
  color: {
    primary: "#FEA801",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)"
  }
};
```

