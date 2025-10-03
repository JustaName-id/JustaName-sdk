# JustaNameProvider

Provides JustaName context to child components, allowing them to access and interact with the JustaName service.

---

## Usage

```typescript
import { JustaNameProvider } from '@justaname.id/react'

function App() {
  return (
    <JustaNameProvider 
      config={{
        // Core configuration
        config: {
          domain: 'justaname.eth',
          origin: 'https://your-app.com',
          subnameChallengeTtl: 300,
          signInTtl: 3600
        },
        // Network configuration
        networks: [
          {
            chainId: 1,
            providerUrl: 'https://mainnet.infura.io/v3/your-key'
          },
          {
            chainId: 11155111,
            providerUrl: 'https://sepolia.infura.io/v3/your-key'
          }
        ],
        // ENS domains configuration
        ensDomains: [
          {
            chainId: 1,
            ensDomain: 'justaname.eth',
            apiKey: 'your-api-key'
          }
        ],
        // Optional settings
        dev: false,
        backendUrl: 'https://api.justaname.id',
        signOnMounted: true,
        // Custom routes
        routes: {
          addSubnameRoute: '/api/subnames/add',
          revokeSubnameRoute: '/api/subnames/revoke',
          signinRoute: '/api/signin',
          signinNonceRoute: '/api/signin/nonce',
          signoutRoute: '/api/signout',
          currentEnsRoute: '/api/current'
        }
      }}
    >
      <YourAppComponents />
    </JustaNameProvider>
  )
}
```

---

## Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `config` | `Configuration` | Core configuration object |
| `config.domain` | `string` | Default ENS domain |
| `config.origin` | `string` | Your app's origin URL |
| `config.subnameChallengeTtl` | `number` | Subname challenge TTL in seconds |
| `config.signInTtl` | `number` | Sign-in TTL in seconds |
| `networks` | `Network[]` | Array of supported networks |
| `networks[].chainId` | `ChainId` | Network chain ID (1, 11155111) |
| `networks[].providerUrl` | `string` | RPC provider URL |
| `ensDomains` | `EnsDomainByChainId[]` | ENS domains per chain |
| `ensDomains[].chainId` | `ChainId` | Chain ID for the domain |
| `ensDomains[].ensDomain` | `string` | ENS domain name |
| `ensDomains[].apiKey` | `string` | Optional API key for the domain |
| `dev` | `boolean` | Enable development mode |
| `backendUrl` | `string` | Backend API URL |
| `signOnMounted` | `boolean` | Auto-sign on component mount |
| `routes` | `Partial<Routes>` | Custom API routes |

---

## Returns

`ReactNode` - The provider component wrapping children.

## Parameters

- **props**: [`JustaNameProviderProps`](../interfaces/JustaNameProviderProps.md) - The props for the JustaNameProvider component

## Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:84](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L84)
