# useEnsSignIn

A React hook for handling ENS-based sign-in authentication with message signing.

---

## Usage

```typescript
import { useEnsSignIn } from '@justaname.id/react'

// Basic usage
function EnsSignInComponent() {
  const { signIn, isLoading, error, data } = useEnsSignIn()
  
  const handleSignIn = async () => {
    try {
      await signIn({
        ensName: 'alice.justaname.eth',
        message: 'Sign in to access the application'
      })
    } catch (err) {
      console.error('Sign in failed:', err)
    }
  }
  
  return (
    <div>
      <button onClick={handleSignIn} disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In with ENS'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Signed in as: {data.ensName}</p>}
    </div>
  )
}
```

```typescript
// With advanced parameters and callbacks
function EnsSignInComponent() {
  const { signIn, isLoading, error, data } = useEnsSignIn({
    onSuccess: (result) => {
      console.log('Sign in successful:', result)
      // Redirect to dashboard or update app state
    },
    onError: (error) => {
      console.error('Sign in error:', error)
      // Show error notification to user
    }
  })
  
  const handleSignIn = async () => {
    await signIn({
      ensName: 'bob.justaname.eth',
      message: 'Please sign this message to authenticate with our service',
      nonce: Date.now().toString(),
      domain: 'justaname.id',
      statement: 'Sign in to access your account'
    })
  }
  
  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <h3>Sign In with ENS</h3>
        <p>Connect your ENS name to access the application</p>
        
        <button 
          onClick={handleSignIn} 
          disabled={isLoading}
          className="sign-in-button"
        >
          {isLoading ? (
            <>
              <div className="spinner"></div>
              Signing In...
            </>
          ) : (
            'Connect ENS Name'
          )}
        </button>
        
        {error && (
          <div className="error-message">
            <p>❌ {error.message}</p>
            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        )}
        
        {data && (
          <div className="success-message">
            <p>✅ Successfully signed in as {data.ensName}</p>
            <p>Address: {data.address}</p>
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## Returns

[`UseEnsSignInResult`](../interfaces/UseEnsSignInResult.md) - An object containing:
- `signIn`: Function to initiate the sign-in process
- `isLoading`: Boolean indicating if the sign-in is in progress
- `error`: Error object if the sign-in failed
- `data`: Result data if the sign-in succeeded

## Parameters

- **params?**: [`UseEnsSignInParams`](../interfaces/UseEnsSignInParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignIn.ts:34](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignIn.ts#L34)
