# useEnsAvatar

A React hook for fetching and managing ENS avatar images associated with ENS names.

---

## Usage

```typescript
import { useEnsAvatar } from '@justaname.id/react'

// Basic usage
function EnsAvatarComponent() {
  const { avatar, isLoading, error, refetch } = useEnsAvatar({
    ensName: 'alice.justaname.eth'
  })
  
  if (isLoading) return <div>Loading avatar...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Avatar for alice.justaname.eth</h3>
      {avatar ? (
        <img src={avatar} alt="ENS Avatar" className="avatar" />
      ) : (
        <div className="no-avatar">No avatar set</div>
      )}
      <button onClick={refetch}>Refresh Avatar</button>
    </div>
  )
}
```

```typescript
// With advanced parameters and fallback handling
function EnsAvatarComponent() {
  const { avatar, isLoading, error, refetch } = useEnsAvatar({
    ensName: 'bob.justaname.eth',
    enabled: true,
    onSuccess: (avatarUrl) => {
      console.log('Avatar loaded:', avatarUrl)
    },
    onError: (error) => {
      console.error('Error loading avatar:', error)
    }
  })
  
  const handleImageError = () => {
    console.log('Failed to load avatar image')
  }
  
  return (
    <div className="avatar-container">
      <h3>Profile Picture</h3>
      
      {isLoading && (
        <div className="avatar-loading">
          <div className="spinner"></div>
          <p>Loading avatar...</p>
        </div>
      )}
      
      {error && (
        <div className="avatar-error">
          <p>Error: {error.message}</p>
          <button onClick={refetch}>Retry</button>
        </div>
      )}
      
      {avatar && !isLoading && !error && (
        <div className="avatar-display">
          <img 
            src={avatar} 
            alt="ENS Avatar" 
            className="avatar-image"
            onError={handleImageError}
          />
          <button onClick={refetch} className="refresh-btn">
            Refresh
          </button>
        </div>
      )}
      
      {!avatar && !isLoading && !error && (
        <div className="no-avatar">
          <div className="default-avatar">
            <span>👤</span>
          </div>
          <p>No avatar set for this ENS name</p>
          <button onClick={refetch}>Check Again</button>
        </div>
      )}
    </div>
  )
}
```

---

## Returns

[`UseEnsAvatarResult`](../interfaces/UseEnsAvatarResult.md) - An object containing:
- `avatar`: URL string of the ENS avatar image
- `isLoading`: Boolean indicating if the avatar is being fetched
- `error`: Error object if the operation failed
- `refetch`: Function to manually refetch the avatar

## Parameters

- **params?**: [`UseEnsAvatarParams`](../interfaces/UseEnsAvatarParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/records/useAvatar.ts:35](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/records/useAvatar.ts#L35)
