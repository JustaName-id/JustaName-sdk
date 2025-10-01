# useRevokeSubname

A React hook for revoking subname ownership.

---

## Usage

```typescript
import { useRevokeSubname } from '@justaname.id/react'

function RevokeSubnameComponent() {
  const { revokeSubname, isRevokeSubnamePending } = useRevokeSubname()
  
  const handleRevoke = async () => {
    try {
      await revokeSubname({
        username: 'alice',
        ensDomain: 'justaname.eth',
        chainId: 1
      })
    } catch (err) {
      console.error('Failed to revoke subname:', err)
    }
  }
  
  return (
    <button onClick={handleRevoke} disabled={isRevokeSubnamePending}>
      {isRevokeSubnamePending ? 'Revoking...' : 'Revoke Subname'}
    </button>
  )
}
```

---

## Returns

An object containing:
- `revokeSubname`: Function to revoke a subname
- `isRevokeSubnamePending`: Boolean indicating if the revocation is in progress

## Parameters

Optional parameters:
- `ensDomain?`: The ENS domain to revoke from (optional, defaults to provider domain)
- `chainId?`: The chain ID to use (optional, defaults to provider chain ID)
- `backendUrl?`: Custom backend URL (optional)
- `revokeSubnameRoute?`: Custom revoke route (optional)
- `apiKey?`: API key for authentication (optional)

## Revoke Function Parameters

The `revokeSubname` function accepts:
- `username`: The subname to revoke (e.g., 'alice')
- `ensDomain`: The ENS domain (e.g., 'justaname.eth')
- `chainId`: The chain ID
- `apiKey?`: Optional API key

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useRevokeSubname.ts:28](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useRevokeSubname.ts#L28)