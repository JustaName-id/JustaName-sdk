# JustVerified

If you want to enable the **JustVerified Plugin** for social verification, you can specify which social platforms users must verify with. Supported platforms include:

* Twitter (`'twitter'`)
* Telegram (`'telegram'`)
* GitHub (`'github'`)
* Discord (`'discord'`)
* Email (`'email'`)

You can choose any combination of these platforms based on your needs. For example, to enable verification for **GitHub** and **Discord**, your configuration would look like this:

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
    JustVerifiedPlugin(['github', 'discord']) // Enabling GitHub and Discord verification
  ],
  color: {
    primary: "#FEA801",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)"
  }
};

```

