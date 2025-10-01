# useRejectSubname

A React hook for rejecting subname invitations.

---

## Usage

```typescript
import { useRejectSubname } from '@justaname.id/react'

function RejectSubnameComponent() {
  const { rejectSubname, isRejectSubnamePending } = useRejectSubname()
  
  const handleReject = async () => {
    try {
      await rejectSubname({
        ens: 'alice.justaname.eth',
        chainId: 1
      })
    } catch (err) {
      console.error('Failed to reject subname:', err)
    }
  }
  
  return (
    <button onClick={handleReject} disabled={isRejectSubnamePending}>
      {isRejectSubnamePending ? 'Rejecting...' : 'Reject Subname'}
    </button>
  )
}
```

---

## Returns

An object containing:
- `rejectSubname`: Function to reject a subname invitation
- `isRejectSubnamePending`: Boolean indicating if the rejection is in progress

## Parameters

Optional parameters:
- `chainId?`: The chain ID to use (optional, defaults to provider chain ID)

## Reject Function Parameters

The `rejectSubname` function accepts:
- `ens`: The full ENS name to reject (e.g., 'alice.justaname.eth')
- `chainId?`: The chain ID (optional, defaults to provider chain ID)

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useRejectSubname.ts:32](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useRejectSubname.ts#L32)