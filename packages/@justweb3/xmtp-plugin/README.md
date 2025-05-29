# @justweb3/xmtp-plugin

The **@justweb3/xmtp-plugin** extends the **JustWeb3 Widget** with **XMTP (Extensible Message Transport Protocol)** functionalities, allowing users to **Chat** directly within your dApp.

---

## Installation

Install the **XMTP Plugin** using your preferred package manager:

```bash
bash
npm install @justweb3/xmtp-plugin

# or

yarn add @justweb3/xmtp-plugin
```

---

## Usage Example

Here’s how to enable the **XMTP Plugin** in your **JustWeb3 Widget** configuration:

```tsx
import { XMTPPlugin } from '@justweb3/xmtp-plugin';

const justweb3Config = {
  config: {
    origin: 'http://localhost:3000/',
    domain: 'localhost',
    signInTtl: 86400000,
  },
  plugins: [
    XMTPPlugin(env), // 'local' | 'production' | 'dev'
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
