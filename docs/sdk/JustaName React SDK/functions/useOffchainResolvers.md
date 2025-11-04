# useOffchainResolvers

A React hook for fetching offchain resolvers for ENS names.

---

## Usage

```typescript
import { useOffchainResolvers } from '@justaname.id/react'

function OffchainResolversComponent() {
  const { offchainResolvers, isOffchainResolversPending } = useOffchainResolvers()
  
  if (isOffchainResolversPending) return <div>Loading resolvers...</div>
  
  return (
    <div>
      <h3>Offchain Resolvers</h3>
      {offchainResolvers?.offchainResolvers?.map((resolver, index) => (
        <div key={index}>
          <p>Resolver: {resolver.name}</p>
          <p>URL: {resolver.url}</p>
        </div>
      ))}
    </div>
  )
}
```

---

## Returns

An object containing:
- `offchainResolvers`: Object with array of offchain resolver configurations
- `isOffchainResolversPending`: Boolean indicating if the data is being fetched

## Defined in

[packages/@justaname.id/react/src/lib/hooks/offchainResolver/useOffchainResolvers.ts:13](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/offchainResolver/useOffchainResolvers.ts#L13)