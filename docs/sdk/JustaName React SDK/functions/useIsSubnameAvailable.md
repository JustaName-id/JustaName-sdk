# useIsSubnameAvailable

A React hook for checking if a subname is available for registration.

---

## Usage

```typescript
import { useIsSubnameAvailable } from '@justaname.id/react'

function SubnameAvailabilityComponent() {
  const { isSubnameAvailable, isSubnameAvailableLoading } = useIsSubnameAvailable({
    username: 'alice',
    ensDomain: 'justaname.eth',
    chainId: 1
  })
  
  if (isSubnameAvailableLoading) return <div>Checking availability...</div>
  
  return (
    <div>
      <h3>Subname Availability</h3>
      <p>alice.justaname.eth is {isSubnameAvailable?.isAvailable ? 'available' : 'not available'}</p>
    </div>
  )
}
```

---

## Returns

An object containing:
- `isSubnameAvailable`: Response object with:
  - `isAvailable`: Boolean indicating if the subname is available
- `isSubnameAvailablePending`: Boolean indicating if the query is pending
- `isSubnameAvailableFetching`: Boolean indicating if the query is fetching
- `isSubnameAvailableLoading`: Boolean indicating if the query is loading

## Parameters

Required parameters:
- `username`: The subname to check (e.g., 'alice')

Optional parameters:
- `ensDomain?`: The ENS domain (optional, defaults to provider domain)
- `chainId?`: The chain ID to use (optional, defaults to provider chain ID)
- `enabled?`: Boolean to enable/disable the query (optional, defaults to true)

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useIsSubnameAvailable.ts:28](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useIsSubnameAvailable.ts#L28)