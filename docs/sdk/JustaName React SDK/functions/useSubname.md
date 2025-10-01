# useSubname

A React hook for fetching detailed information about a specific subname.

---

## Usage

```typescript
import { useSubname } from '@justaname.id/react'

function SubnameComponent() {
  const { subname, isSubnameLoading, refetchSubname } = useSubname({
    subname: 'alice.justaname.eth',
    chainId: 1
  })
  
  if (isSubnameLoading) return <div>Loading subname...</div>
  
  return (
    <div>
      <h3>Subname Details</h3>
      <p>ENS: {subname?.ens}</p>
      <p>Is JAN: {subname?.isJAN ? 'Yes' : 'No'}</p>
      <p>Resolver: {subname?.records?.resolverAddress}</p>
      <button onClick={() => refetchSubname()}>Refresh</button>
    </div>
  )
}
```

---

## Returns

An object containing:
- `subname`: Records object with subname information:
  - `ens`: The full ENS name
  - `isJAN`: Boolean indicating if it's a JustaName subname
  - `records`: Object containing resolver address, text records, addresses, content hash
  - `sanitizedRecords`: Sanitized version of the records
- `isSubnamePending`: Boolean indicating if the query is pending
- `isSubnameFetching`: Boolean indicating if the query is fetching
- `isSubnameLoading`: Boolean indicating if the query is loading
- `refetchSubname`: Function to manually refetch the subname data

## Parameters

Required parameters:
- `subname`: The full subname to fetch (e.g., 'alice.justaname.eth')
- `chainId?`: The chain ID to use (optional, defaults to provider chain ID)
- `enabled?`: Boolean to enable/disable the query (optional, defaults to true)

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useSubname.ts:38](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useSubname.ts#L38)