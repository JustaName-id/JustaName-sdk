# useEnsAuth

A React hook for checking ENS-based authentication status and getting connected ENS information.

---

## Usage

```typescript
import { useEnsAuth } from '@justaname.id/react'

// Basic usage
function EnsAuthComponent() {
  const { 
    isLoggedIn, 
    connectedEns, 
    isEnsAuthPending, 
    refreshEnsAuth 
  } = useEnsAuth()
  
  if (isEnsAuthPending) return <div>Loading...</div>
  
  return (
    <div>
      {isLoggedIn && connectedEns ? (
        <div>
          <p>Welcome, {connectedEns.ens}!</p>
          <p>Address: {connectedEns.address}</p>
          <p>Chain ID: {connectedEns.chainId}</p>
          <button onClick={refreshEnsAuth}>Refresh Auth</button>
        </div>
      ) : (
        <div>
          <p>Not authenticated</p>
          <button onClick={refreshEnsAuth}>Check Auth Status</button>
        </div>
      )}
    </div>
  )
}
```

```typescript
// With custom user type and local storage
interface CustomUser {
  bio: string
  website: string
  avatar?: string
}

function EnsAuthComponent() {
  const { 
    isLoggedIn, 
    connectedEns, 
    isEnsAuthPending, 
    isEnsAuthFetching,
    isEnsAuthLoading,
    refreshEnsAuth 
  } = useEnsAuth<CustomUser>({
    backendUrl: 'https://api.justaname.id',
    currentEnsRoute: '/auth/current-ens',
    enabled: true,
    local: false
  })
  
  return (
    <div className="auth-container">
      {isEnsAuthLoading && <div>Checking authentication...</div>}
      
      {isLoggedIn && connectedEns ? (
        <div className="user-profile">
          <h3>Welcome, {connectedEns.ens}!</h3>
          <p>Address: {connectedEns.address}</p>
          <p>Chain ID: {connectedEns.chainId}</p>
          {connectedEns.bio && <p>Bio: {connectedEns.bio}</p>}
          {connectedEns.website && <p>Website: {connectedEns.website}</p>}
          {connectedEns.avatar && (
            <img src={connectedEns.avatar} alt="Avatar" />
          )}
          <button onClick={refreshEnsAuth}>Refresh</button>
        </div>
      ) : (
        <div className="not-authenticated">
          <p>Not authenticated</p>
          <button onClick={refreshEnsAuth}>Check Status</button>
        </div>
      )}
    </div>
  )
}
```

---

## Returns

[`UseEnsAuthReturn`](../interfaces/UseEnsAuthReturn.md)<`T`> - An object containing:
- `isLoggedIn`: Boolean indicating if user is authenticated
- `connectedEns`: ENS authentication data object or null/undefined
- `isEnsAuthPending`: Boolean indicating if the auth check is pending
- `isEnsAuthFetching`: Boolean indicating if the auth check is fetching
- `isEnsAuthLoading`: Boolean indicating if the auth check is loading
- `refreshEnsAuth`: Function to manually refresh the authentication status

## Parameters

- **params?**: [`UseEnsAuthParams`](../interfaces/UseEnsAuthParams.md) - Optional parameters for the hook

## Type Parameters

- **T** *extends* `object` = `object` - Custom user type extending object

## Defined in

[packages/@justaname.id/react/src/lib/hooks/signIn/useEnsAuth.ts:28](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/signIn/useEnsAuth.ts#L28)
