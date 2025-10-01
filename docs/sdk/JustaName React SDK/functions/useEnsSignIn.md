# useEnsSignIn

A React hook for handling ENS-based sign-in authentication with message signing.

---

## Usage

```typescript
import { useEnsSignIn } from '@justaname.id/react'

// Basic usage
function EnsSignInComponent() {
  const { signIn, isSignInPending } = useEnsSignIn()
  
  const handleSignIn = async () => {
    try {
      await signIn({
        ens: 'alice.justaname.eth',
        ttl: 3600,
        uri: 'https://app.justaname.id',
        domain: 'justaname.id'
      })
    } catch (err) {
      console.error('Sign in failed:', err)
    }
  }
  
  return (
    <div>
      <button onClick={handleSignIn} disabled={isSignInPending}>
        {isSignInPending ? 'Signing In...' : 'Sign In with ENS'}
      </button>
    </div>
  )
}
```

```typescript
// With custom backend configuration
function EnsSignInComponent() {
  const { signIn, isSignInPending } = useEnsSignIn({
    backendUrl: 'https://api.justaname.id',
    signinRoute: '/auth/signin',
    signinNonceRoute: '/auth/nonce',
    currentEnsRoute: '/auth/current-ens',
    local: false
  })
  
  const handleSignIn = async () => {
    await signIn({
      ens: 'bob.justaname.eth',
      ttl: 7200,
      uri: 'https://myapp.com',
      domain: 'myapp.com'
    })
  }
  
  return (
    <button onClick={handleSignIn} disabled={isSignInPending}>
      {isSignInPending ? 'Signing In...' : 'Sign In with ENS'}
    </button>
  )
}
```

---

## Returns

[`UseEnsSignInResult`](../interfaces/UseEnsSignInResult.md) - An object containing:
- `signIn`: Function to initiate the sign-in process
- `isSignInPending`: Boolean indicating if the sign-in is in progress

## Parameters

- **params?**: [`UseEnsSignInParams`](../interfaces/UseEnsSignInParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignIn.ts:34](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignIn.ts#L34)
