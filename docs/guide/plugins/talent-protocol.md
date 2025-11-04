# Talent Protocol

Talent Protocol is a platform that helps emerging professionals bootstrap their careers by building communities around their professional growth. It fosters a unique incentive structure, where supporters—such as fans, mentors, and colleagues—gain closer connections, receive updates, and may enjoy unique benefits tied to the talent’s achievements. By establishing an onchain reputation and professional track record, Talent Protocol aims to create a more transparent, community-backed professional network, where success and value creation are shared more equitably between emerging talent and their early supporters.

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
    TalentProtocolPlugin({ apiKey: '<YOUR_TALENT_PROTOCOL_API_KEY>' }) // Enabling Talent Protocol Plugin
  ],
  color: {
    primary: "#FEA801",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)"
  }
};
```

