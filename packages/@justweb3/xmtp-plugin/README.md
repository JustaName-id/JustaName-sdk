# @justweb3/xmtp-plugin

The **@justweb3/xmtp-plugin** extends the **JustWeb3 Widget** with **Builder Score (Talent Protocol)** functionalities, allowing users to **view Talent Protocol Credentials and Builder Score** directly within your dApp.

---

## Installation

Install the **Talent Protocol Plugin** using your preferred package manager:

```bash
bash
npm install @justweb3/xmtp-plugin

# or

yarn add @justweb3/xmtp-plugin
```

---

## Usage Example

Here’s how to enable the **Talent Protocol Plugin** in your **JustWeb3 Widget** configuration:

```tsx
import { TalentProtocolPlugin } from '@justweb3/xmtp-plugin';

const justweb3Config = {
  config: {
    origin: 'http://localhost:3000/',
    domain: 'localhost',
    signInTtl: 86400000,
  },
  plugins: [
    TalentProtocolPlugin({
      apiKey: "<YOUR_API_KEY>", // # Optional: Calls the Talent Protocol API from the client side
      backendUrl: "<YOUR_BACKEND_URL>", // # Optional: Calls the Talent Protocol API from the backend, best for production
    })
  ],
  ensDomains: [
    {
      ensDomain: 'yourdomain.eth',
      apiKey: 'YOUR_API_KEY',
      chainId: 1,
    },
  ],
  color: {
    primary: '#FEA801',
    background: 'hsl(0, 0%, 100%)',
    destructive: 'hsl(0, 100%, 50%)',
  },
};
```

### Contributing

Contributions are welcome! If you have suggestions or find issues, please open an issue or submit a pull request on the GitHub repository.
