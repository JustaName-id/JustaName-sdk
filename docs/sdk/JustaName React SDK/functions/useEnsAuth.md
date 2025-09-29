# useEnsAuth

A React hook for ENS-based authentication and signing in with ENS names.

---

## Usage

```typescript
import { useEnsAuth } from '@justaname.id/react'

// Basic usage
function EnsAuthComponent() {
  const { 
    signIn, 
    signOut, 
    isAuthenticated, 
    isLoading, 
    error, 
    user 
  } = useEnsAuth()
  
  const handleSignIn = async () => {
    try {
      await signIn({
        ensName: 'alice.justaname.eth',
        message: 'Sign in to access the app'
      })
    } catch (err) {
      console.error('Sign in failed:', err)
    }
  }
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.ensName}!</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleSignIn}>Sign In with ENS</button>
          {error && <p>Error: {error.message}</p>}
        </div>
      )}
    </div>
  )
}
```

```typescript
// With custom user type and advanced parameters
interface CustomUser {
  ensName: string
  address: string
  avatar?: string
  profile: {
    bio: string
    website: string
  }
}

function EnsAuthComponent() {
  const { 
    signIn, 
    signOut, 
    isAuthenticated, 
    isLoading, 
    error, 
    user 
  } = useEnsAuth<CustomUser>({
    onSignIn: (user) => {
      console.log('User signed in:', user)
      // Redirect to dashboard or update app state
    },
    onSignOut: () => {
      console.log('User signed out')
      // Clear app state or redirect to login
    },
    onError: (error) => {
      console.error('Auth error:', error)
      // Show error notification
    }
  })
  
  const handleSignIn = async () => {
    await signIn({
      ensName: 'bob.justaname.eth',
      message: 'Please sign this message to authenticate',
      nonce: Date.now().toString()
    })
  }
  
  return (
    <div className="auth-container">
      {isLoading && <div className="loading">Authenticating...</div>}
      
      {isAuthenticated && user ? (
        <div className="user-profile">
          <div className="user-info">
            <h3>Welcome, {user.ensName}!</h3>
            <p>Address: {user.address}</p>
            {user.avatar && (
              <img src={user.avatar} alt="Avatar" className="avatar" />
            )}
            <div className="profile">
              <p>Bio: {user.profile.bio}</p>
              <p>Website: {user.profile.website}</p>
            </div>
          </div>
          <button onClick={signOut} className="sign-out-btn">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="sign-in">
          <h3>Sign In with ENS</h3>
          <button onClick={handleSignIn} className="sign-in-btn">
            Connect ENS Name
          </button>
          {error && (
            <div className="error">
              <p>Error: {error.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

---

## Returns

[`UseEnsAuthReturn`](../interfaces/UseEnsAuthReturn.md)<`T`> - An object containing:
- `signIn`: Function to authenticate with ENS name
- `signOut`: Function to sign out the user
- `isAuthenticated`: Boolean indicating if user is authenticated
- `isLoading`: Boolean indicating if authentication is in progress
- `error`: Error object if authentication failed
- `user`: User object with ENS name and profile data

## Parameters

- **params?**: [`UseEnsAuthParams`](../interfaces/UseEnsAuthParams.md) - Optional parameters for the hook

## Type Parameters

- **T** *extends* `object` = `object` - Custom user type extending object

## Defined in

[packages/@justaname.id/react/src/lib/hooks/signIn/useEnsAuth.ts:28](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/signIn/useEnsAuth.ts#L28)
