# useAcceptSubname

A React hook for accepting subname invitations and managing the acceptance process.

---

## Usage

```typescript
import { useAcceptSubname } from '@justaname.id/react'

// Basic usage
function AcceptSubnameComponent() {
  const { acceptSubname, isLoading, error } = useAcceptSubname()
  
  const handleAccept = async () => {
    await acceptSubname()
  }
  
  return (
    <button onClick={handleAccept} disabled={isLoading}>
      {isLoading ? 'Accepting...' : 'Accept Subname'}
    </button>
  )
}
```

```typescript
// With parameters
function AcceptSubnameComponent() {
  const { acceptSubname, isLoading, error } = useAcceptSubname({
    subname: 'alice.justaname.eth',
    onSuccess: (result) => {
      console.log('Subname accepted:', result)
    },
    onError: (error) => {
      console.error('Error accepting subname:', error)
    }
  })
  
  return (
    <div>
      <button onClick={acceptSubname} disabled={isLoading}>
        Accept Subname
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}
```

---

## Returns

[`UseAcceptSubnameResult`](../interfaces/UseAcceptSubnameResult.md) - An object containing:
- `acceptSubname`: Function to accept the subname invitation
- `isLoading`: Boolean indicating if the operation is in progress
- `error`: Error object if the operation failed
- `data`: Result data if the operation succeeded

## Parameters

- **params?**: [`UseAcceptSubnameParams`](../type-aliases/UseAcceptSubnameParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useAcceptSubname.ts:27](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useAcceptSubname.ts#L27)
