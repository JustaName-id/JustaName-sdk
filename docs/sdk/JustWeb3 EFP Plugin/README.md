**@justweb3/efp-plugin** 

***

# @justweb3/efp-plugin

The **@justweb3/efp-plugin** extends the **JustWeb3 Widget** with **Ethereum Follow Protocol (EFP)** functionalities, allowing users to **follow** others, **view followers**, and **following** directly within your dApp.

---

## Installation

Install the **EFP Plugin** using your preferred package manager:

```bash
bash
npm install @justweb3/efp-plugin

# or

yarn add @justweb3/efp-plugin
```

---

## Usage Example

Here’s how to enable the **EFP Plugin** in your **JustWeb3 Widget** configuration:

```tsx
tsx
import { EFPPlugin } from '@justweb3/efp-plugin';

const justweb3Config = {
  config: {
    origin: "http://localhost:3000/",
    domain: "localhost",
    signInTtl: 86400000,
  },
  plugins: [
    EFPPlugin, // Enable the EFP Plugin
  ],
  ensDomains: [
    {
      ensDomain: "yourdomain.eth",
      apiKey: "YOUR_API_KEY",
      chainId: 1,
    },
  ],
  color: {
    primary: "#FEA801",
    background: "hsl(0, 0%, 100%)",
    destructive: "hsl(0, 100%, 50%)",
  },
};

```

### Contributing
Contributions are welcome! If you have suggestions or find issues, please open an issue or submit a pull request on the GitHub repository.