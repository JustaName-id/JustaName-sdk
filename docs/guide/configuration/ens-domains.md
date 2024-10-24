# ENS Domains

In the JustWeb3 Widget configuration, you can specify which ENS domains will be used for your platform. By default, if no ENS domain is passed in the configuration, the following domains are used:

* **Mainnet**: `justan.id`
* **Testnet (Sepolia)**: `justan.eth`

However, if you have your own ENS domain and want to use it, you can configure it by adding the domain and the corresponding **API key**. This allows your platform to issue and manage subnames under the specified ENS domain.

**Example Configuration:**

{% hint style="info" %}
For security reasons and to follow best practices, it's important to avoid exposing your **API key** directly in the frontend configuration. Always refer to the [Backend Configuration ](broken-reference)section for guidance on securely managing API keys and handling sensitive operations.
{% endhint %}

```tsx
const justweb3Config: JustWeb3ProviderConfig = {
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
      ensDomain: "YOUR ENS DOMAIN",  // Replace with your custom ENS domain
      apiKey: "YOUR JUSTANAME API KEY",  // API key for JustaName
      chainId: 1,  // Ethereum mainnet chain ID
    },
  ],
  color: {
    primary: "hsl(216, 90%, 58%)",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)",
  },
};
```

This configuration allows you to manage subnames under your custom ENS domain and ensures your platform's users can claim and use subnames within that domain.
