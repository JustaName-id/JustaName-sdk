# useAccountSubnames

A React hook for fetching and managing subnames owned by a connected account.

---

## Usage

```typescript
import { useAccountSubnames } from '@justaname.id/react'

// Basic usage
function AccountSubnamesComponent() {
  const { subnames, isLoading, error, refetch } = useAccountSubnames()
  
  if (isLoading) return <div>Loading subnames...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Your Subnames</h3>
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
// With parameters
function AccountSubnamesComponent() {
  const { subnames, isLoading, error } = useAccountSubnames({
    account: '0x1234567890abcdef...',
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
      {isLoading && <p>Loading subnames...</p>}
      {error && <p>Error: {error.message}</p>}
      {subnames && (
        <div>
          <h4>Your Subnames ({subnames.length})</h4>
          <div className="subnames-grid">
            {subnames.map((subname, index) => (
              <div key={index} className="subname-card">
                <h5>{subname.name}</h5>
                <p>Parent: {subname.parentDomain}</p>
                <p>Created: {subname.createdAt}</p>
                <p>Status: {subname.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## Returns

`UseAccountSubnamesResult` - An object containing:
- `subnames`: Array of subnames owned by the account
- `isLoading`: Boolean indicating if the data is being fetched
- `error`: Error object if the operation failed
- `refetch`: Function to manually refetch the data

## Parameters

- **params?**: [`UseConnectedWalletSubnamesOptions`](../interfaces/UseConnectedWalletSubnamesOptions.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/account/useAccountSubnames.ts:27](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/account/useAccountSubnames.ts#L27)
