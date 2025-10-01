# usePrimaryName

A React hook for fetching the primary ENS name for a given address.

---

## Usage

```typescript
import { usePrimaryName } from '@justaname.id/react'

function PrimaryNameComponent() {
  const { primaryName, isPrimaryNameLoading, refetchPrimaryName } = usePrimaryName({
    address: '0x1234567890abcdef...',
    chainId: 1
  })
  
  if (isPrimaryNameLoading) return <div>Loading primary name...</div>
  
  return (
    <div>
      <h3>Primary Name</h3>
      <p>Name: {primaryName || 'No primary name set'}</p>
      <button onClick={() => refetchPrimaryName()}>Refresh</button>
    </div>
  )
}
```

---

## Returns

An object containing:
- `primaryName`: The primary ENS name for the address (string or undefined)
- `isPrimaryNamePending`: Boolean indicating if the query is pending
- `isPrimaryNameFetching`: Boolean indicating if the query is fetching
- `isPrimaryNameLoading`: Boolean indicating if the query is loading
- `getPrimaryName`: Function to manually get the primary name
- `refetchPrimaryName`: Function to manually refetch the primary name

## Parameters

Optional parameters:
- `address?`: The address to get the primary name for (optional)
- `chainId?`: The chain ID to use (optional, defaults to provider chain ID)
- `enabled?`: Boolean to enable/disable the query (optional, defaults to true)
- `priority?`: Priority for name resolution ('onChain' | 'offChain', defaults to 'offChain')

## Defined in

[packages/@justaname.id/react/src/lib/hooks/primaryName/usePrimaryName.ts:40](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/primaryName/usePrimaryName.ts#L40)