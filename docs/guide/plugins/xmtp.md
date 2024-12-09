# XMTP

XMTP is a communication protocol designed for Web3, providing a decentralized messaging layer. Its primary goal is to let Ethereum addresses—or any Web3 account—send secure, private messages to one another. Instead of relying on a centralized messaging app, XMTP creates a standardized messaging interface that can be integrated into a variety of wallets, dApps, and services. Key features often include:

* **Decentralized inboxes**: Users maintain their own message history independent of any single service.
* **End-to-end encryption**: Ensuring message privacy and security.
* **Interoperability**: A set of standards that various Web3 projects can adopt, making cross-application messaging seamless.

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
    XMTPPlugin('production') // Enabling XMTP Plugin
  ],
  color: {
    primary: "#FEA801",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)"
  }
};
```

