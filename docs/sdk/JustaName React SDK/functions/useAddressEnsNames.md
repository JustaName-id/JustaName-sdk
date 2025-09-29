# useAddressEnsNames

A React hook for fetching ENS names associated with a specific Ethereum address.

---

## Usage

```typescript
import { useAddressEnsNames } from '@justaname.id/react'

// Basic usage
function AddressEnsNamesComponent() {
  const { ensNames, isLoading, error, refetch } = useAddressEnsNames({
    address: '0x1234567890abcdef...'
  })
  
  if (isLoading) return <div>Loading ENS names...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>ENS Names for Address</h3>
      {ensNames?.map((name, index) => (
        <div key={index}>{name}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}
```

```typescript
// With additional parameters
function AddressEnsNamesComponent() {
  const { ensNames, isLoading, error } = useAddressEnsNames({
    address: '0x1234567890abcdef...',
    enabled: true,
    onSuccess: (names) => {
      console.log('ENS names loaded:', names)
    },
    onError: (error) => {
      console.error('Error loading ENS names:', error)
    }
  })
  
  return (
    <div>
      <h3>ENS Names</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {ensNames && (
        <ul>
          {ensNames.map((name, index) => (
            <li key={index} className="ens-name">
              <strong>{name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

---

## Returns

[`UseAddressEnsNamesResult`](../interfaces/UseAddressEnsNamesResult.md) - An object containing:
- `ensNames`: Array of ENS names associated with the address
- `isLoading`: Boolean indicating if the data is being fetched
- `error`: Error object if the operation failed
- `refetch`: Function to manually refetch the data

## Parameters

- **params?**: [`UseAddressEnsNamesParams`](../interfaces/UseAddressEnsNamesParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/ens/useAddressEnsNames.ts:33](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/ens/useAddressEnsNames.ts#L33)
