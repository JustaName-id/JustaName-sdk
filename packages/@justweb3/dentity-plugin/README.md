# @justweb3/dentity-plugin

The **@justweb3/dentity-plugin** extends the **JustWeb3 Widget** with **Dentity** functionalities, allowing users to **view verifications** for ENS domain owners directly within your dApp.

---

## Installation

Install the **Dentity Plugin** using your preferred package manager:

```bash
bash
npm install @justweb3/dentity-plugin

# or

yarn add @justweb3/dentity-plugin
```

---

## Usage Example

Here’s how to enable the **Dentity Plugin** in your **JustWeb3 Widget** configuration:

```tsx
tsx;
import { DentityPlugin } from '@justweb3/dentity-plugin';

const justweb3Config = {
  config: {
    origin: 'http://localhost:3000/',
    domain: 'localhost',
    signInTtl: 86400000,
  },
  plugins: [
    DentityPlugin, // Enable the Dentity Plugin
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
