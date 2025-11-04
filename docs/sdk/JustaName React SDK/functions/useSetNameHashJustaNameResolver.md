# useSetNameHashJustaNameResolver

A React hook for setting the JustaName resolver for ENS names, enabling offchain resolution capabilities.

---

## Usage

```typescript
import { useSetNameHashJustaNameResolver } from '@justaname.id/react'

function SetResolverComponent() {
  const { 
    setNameHashJustaNameResolver, 
    NameHashJustaNameResolverSet, 
    isSetNameHashJustaNameResolverPending, 
    setNameHashJustaNameResolverError 
  } = useSetNameHashJustaNameResolver()
  
  const handleSetResolver = async () => {
    try {
      await setNameHashJustaNameResolver()
    } catch (err) {
      console.error('Failed to set resolver:', err)
    }
  }
  
  return (
    <div>
      <button onClick={handleSetResolver} disabled={isSetNameHashJustaNameResolverPending}>
        {isSetNameHashJustaNameResolverPending ? 'Setting...' : 'Set Resolver'}
      </button>
      {setNameHashJustaNameResolverError && <p>Error occurred</p>}
      {NameHashJustaNameResolverSet && <p>Resolver set successfully!</p>}
    </div>
  )
}
```

---

## Returns

An object containing:
- `setNameHashJustaNameResolver`: Function to set the JustaName resolver (no parameters needed)
- `NameHashJustaNameResolverSet`: Boolean indicating if the resolver is set
- `isSetNameHashJustaNameResolverPending`: Boolean indicating if the operation is in progress
- `setNameHashJustaNameResolverError`: Boolean indicating if an error occurred

## Parameters

Optional parameters:
- `chainId?`: The chain ID to use (optional, defaults to mounted account chain ID)
- `address?`: The address to use (optional, defaults to mounted account address)

## Defined in

[packages/@justaname.id/react/src/lib/hooks/resolver/useSetNameHashJustaNameResolver.ts:135](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/resolver/useSetNameHashJustaNameResolver.ts#L135)