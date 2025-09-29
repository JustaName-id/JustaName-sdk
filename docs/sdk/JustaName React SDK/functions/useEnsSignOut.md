# useEnsSignOut

A React hook for handling ENS-based sign-out functionality and session cleanup.

---

## Usage

```typescript
import { useEnsSignOut } from '@justaname.id/react'

// Basic usage
function EnsSignOutComponent() {
  const { signOut, isLoading, error, data } = useEnsSignOut()
  
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error('Sign out failed:', err)
    }
  }
  
  return (
    <div>
      <button onClick={handleSignOut} disabled={isLoading}>
        {isLoading ? 'Signing Out...' : 'Sign Out'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Successfully signed out</p>}
    </div>
  )
}
```

```typescript
// With advanced parameters and callbacks
function EnsSignOutComponent() {
  const { signOut, isLoading, error, data } = useEnsSignOut({
    onSuccess: (result) => {
      console.log('Sign out successful:', result)
      // Clear user data, redirect to login, or update app state
    },
    onError: (error) => {
      console.error('Sign out error:', error)
      // Show error notification to user
    }
  })
  
  const handleSignOut = async () => {
    await signOut({
      clearCache: true,
      redirectTo: '/login'
    })
  }
  
  return (
    <div className="sign-out-container">
      <div className="user-menu">
        <h3>Account Menu</h3>
        <p>Currently signed in</p>
        
        <button 
          onClick={handleSignOut} 
          disabled={isLoading}
          className="sign-out-button"
        >
          {isLoading ? (
            <>
              <div className="spinner"></div>
              Signing Out...
            </>
          ) : (
            'Sign Out'
          )}
        </button>
        
        {error && (
          <div className="error-message">
            <p>❌ {error.message}</p>
            <button onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        )}
        
        {data && (
          <div className="success-message">
            <p>✅ Successfully signed out</p>
            <p>Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## Returns

[`UseEnsSignOutResult`](../interfaces/UseEnsSignOutResult.md) - An object containing:
- `signOut`: Function to initiate the sign-out process
- `isLoading`: Boolean indicating if the sign-out is in progress
- `error`: Error object if the sign-out failed
- `data`: Result data if the sign-out succeeded

## Parameters

- **params?**: [`UseEnsSignOutParams`](../interfaces/UseEnsSignOutParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignOut.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignOut.ts#L19)
