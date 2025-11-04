# useJustaName

A React hook for accessing the JustaName context and service instance within components.

---

## Usage

```typescript
import { useJustaName } from '@justaname.id/react'

function MyComponent() {
  const { justaname, chainId, backendUrl } = useJustaName()
  
  const handleAction = async () => {
    if (justaname) {
      // Use the justaname service instance
      const result = await justaname.subnames.getSubname({
        subname: 'alice.justaname.eth',
        chainId: 1
      })
      console.log('Result:', result)
    }
  }
  
  return (
    <div>
      <h3>JustaName Service</h3>
      <p>Chain ID: {chainId}</p>
      <p>Backend URL: {backendUrl}</p>
      <button onClick={handleAction}>
        Get Subname
      </button>
    </div>
  )
}
```

---

## Returns

An object containing:
- `justaname`: JustaName service instance for API calls
- `justanameConfig`: Configuration object
- `routes`: Available API routes
- `backendUrl`: Backend URL string
- `selectedNetwork`: Selected network configuration
- `selectedEnsDomain`: Selected ENS domain
- `chainId`: Current chain ID
- `ensDomains`: Array of ENS domains
- `networks`: Array of networks
- `dev`: Development mode flag

## Throws

If the hook is used outside a JustaNameProvider, it will throw an error.

## Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:148](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L148)