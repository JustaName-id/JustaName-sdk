# useEnsSignOut

A React hook for handling ENS-based sign-out functionality and session cleanup.

---

## Usage

```typescript
import { useEnsSignOut } from '@justaname.id/react'

// Basic usage
function EnsSignOutComponent() {
  const { signOut, isSignOutPending } = useEnsSignOut()
  
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error('Sign out failed:', err)
    }
  }
  
  return (
    <div>
      <button onClick={handleSignOut} disabled={isSignOutPending}>
        {isSignOutPending ? 'Signing Out...' : 'Sign Out'}
      </button>
    </div>
  )
}
```

```typescript
// With custom backend configuration
function EnsSignOutComponent() {
  const { signOut, isSignOutPending } = useEnsSignOut({
    backendUrl: 'https://api.justaname.id',
    signoutRoute: '/auth/signout',
    currentEnsRoute: '/auth/current-ens',
    signinNonceRoute: '/auth/nonce',
    local: false
  })
  
  const handleSignOut = async () => {
    await signOut()
  }
  
  return (
    <button onClick={handleSignOut} disabled={isSignOutPending}>
      {isSignOutPending ? 'Signing Out...' : 'Sign Out'}
    </button>
  )
}
```

---

## Returns

[`UseEnsSignOutResult`](../interfaces/UseEnsSignOutResult.md) - An object containing:
- `signOut`: Function to initiate the sign-out process
- `isSignOutPending`: Boolean indicating if the sign-out is in progress

## Parameters

- **params?**: [`UseEnsSignOutParams`](../interfaces/UseEnsSignOutParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignOut.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignOut.ts#L19)
