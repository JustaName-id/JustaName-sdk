# useAddressSubnames

A React hook for fetching subnames owned by a specific Ethereum address.

---

## Usage

```typescript
import { useAddressSubnames } from '@justaname.id/react'

// Basic usage
function AddressSubnamesComponent() {
  const { subnames, isLoading, error, refetch } = useAddressSubnames({
    address: '0x1234567890abcdef...'
  })
  
  if (isLoading) return <div>Loading subnames...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Subnames for Address</h3>
      {subnames?.map((subname, index) => (
        <div key={index}>
          <p>Name: {subname.name}</p>
          <p>Parent: {subname.parentDomain}</p>
        </div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}
```

```typescript
// With additional parameters
function AddressSubnamesComponent() {
  const { subnames, isLoading, error } = useAddressSubnames({
    address: '0x1234567890abcdef...',
    parentDomain: 'justaname.eth',
    includeExpired: false,
    onSuccess: (subnames) => {
      console.log('Subnames loaded:', subnames)
    },
    onError: (error) => {
      console.error('Error loading subnames:', error)
    }
  })
  
  return (
    <div>
      <h3>Subnames for Address</h3>
      {isLoading && <p>Loading subnames...</p>}
      {error && <p>Error: {error.message}</p>}
      {subnames && (
        <div className="subnames-grid">
          {subnames.map((subname, index) => (
            <div key={index} className="subname-card">
              <h4>{subname.name}</h4>
              <p>Parent: {subname.parentDomain}</p>
              <p>Created: {subname.createdAt}</p>
              <p>Status: {subname.status}</p>
              <p>Expires: {subname.expiresAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## Returns

`UseAddressSubnamesResult` - An object containing:
- `subnames`: Array of subnames owned by the address
- `isLoading`: Boolean indicating if the data is being fetched
- `error`: Error object if the operation failed
- `refetch`: Function to manually refetch the data

## Parameters

- **params**: [`UseAddressSubnamesParams`](../interfaces/UseAddressSubnamesParams.md) - Required parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useAddressSubnames.ts:43](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useAddressSubnames.ts#L43)
