# Networks

The JustWeb3 Widget allows you to customize the blockchain networks that users can connect to by specifying the **chainId** and a **providerUrl**. Currently, the widget supports **mainnet** (Ethereum Mainnet) and **sepolia** (Ethereum Testnet). You can configure either one or both networks.

If no network is specified, the widget will use default public RPC URLs for both networks.

## Specifying Custom Network Options

To specify a custom network provider, you need to pass the `networks` array in the widget configuration. Each network should be defined with its **chainId** and a corresponding **providerUrl**.

* **Mainnet** has a chainId of `1`.
* **Sepolia** has a chainId of `11155111`.

Here’s an example where both **mainnet** and **sepolia** are specified with custom provider URLs:

```typescript
const justweb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: "http://localhost:3000/",
    domain: "localhost",
    signInTtl: 86400000
  },
  networks: [
    { chainId: 1, providerUrl: "YOUR_MAINNET_PROVIDER_URL" },   // Custom Mainnet provider
    { chainId: 11155111, providerUrl: "YOUR_SEPOLIA_PROVIDER_URL" }  // Custom Sepolia provider
  ],
  ...
};

```

## Using Default Network Providers

If you don't specify a network in the configuration, the JustWeb3 Widget will default to public RPC URLs for both **mainnet** and **sepolia**. This allows your dApp to function out-of-the-box without requiring a custom provider but might be impacted by the limitations of publoc rpc endpoints.

```typescript
const justweb3Config: JustWeb3ProviderConfig = {
  config: {
    origin: "http://localhost:3000/",
    domain: "localhost",
    signInTtl: 86400000
  },
  // No networks specified, so the widget will default to public RPC URLs
  ...
};

```
