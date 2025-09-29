# useAccountEnsNames

A React hook for fetching and managing ENS names associated with a connected account.

---

## Usage

```typescript
import { useAccountEnsNames } from '@justaname.id/react'

// Basic usage
function AccountEnsNamesComponent() {
  const { ensNames, isLoading, error, refetch } = useAccountEnsNames()
  
  if (isLoading) return <div>Loading ENS names...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Your ENS Names</h3>
      {ensNames?.map((name, index) => (
        <div key={index}>{name}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}
```

```typescript
// With parameters
function AccountEnsNamesComponent() {
  const { ensNames, isLoading, error } = useAccountEnsNames({
    account: '0x1234567890abcdef...',
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
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {ensNames && (
        <ul>
          {ensNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

---

## Returns

[`UseAccountEnsNamesResult`](../interfaces/UseAccountEnsNamesResult.md) - An object containing:
- `ensNames`: Array of ENS names associated with the account
- `isLoading`: Boolean indicating if the data is being fetched
- `error`: Error object if the operation failed
- `refetch`: Function to manually refetch the data

## Parameters

- **props?**: [`UseAccountEnsNamesParams`](../interfaces/UseAccountEnsNamesParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/account/useAccountEnsNames.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/account/useAccountEnsNames.ts#L19)
