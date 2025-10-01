# useEnsAvatar

A React hook for fetching and managing ENS avatar images associated with ENS names.

---

## Usage

```typescript
import { useEnsAvatar } from '@justaname.id/react'

// Basic usage
function EnsAvatarComponent() {
  const { avatar, isLoading, getEnsAvatar, sanitizeEnsImage } = useEnsAvatar({
    ens: 'alice.justaname.eth'
  })
  
  if (isLoading) return <div>Loading avatar...</div>
  
  return (
    <div>
      <h3>Avatar for alice.justaname.eth</h3>
      {avatar ? (
        <img src={avatar} alt="ENS Avatar" className="avatar" />
      ) : (
        <div className="no-avatar">No avatar set</div>
      )}
    </div>
  )
}
```

```typescript
// With custom chain and manual avatar fetching
function EnsAvatarComponent() {
  const { avatar, isLoading, getEnsAvatar, sanitizeEnsImage } = useEnsAvatar({
    ens: 'bob.justaname.eth',
    chainId: 1,
    enabled: true
  })
  
  const handleManualFetch = async () => {
    const avatarUrl = await getEnsAvatar({
      name: 'bob.justaname.eth',
      chainId: 1
    })
    console.log('Avatar URL:', avatarUrl)
  }
  
  const handleSanitizeImage = () => {
    const sanitizedUrl = sanitizeEnsImage({
      name: 'bob.justaname.eth',
      image: 'ipfs://QmHash...',
      chainId: 1
    })
    console.log('Sanitized URL:', sanitizedUrl)
  }
  
  return (
    <div>
      <h3>Profile Picture</h3>
      
      {isLoading && <div>Loading avatar...</div>}
      
      {avatar && (
        <img src={avatar} alt="ENS Avatar" />
      )}
      
      {!avatar && !isLoading && (
        <div>No avatar set</div>
      )}
      
      <button onClick={handleManualFetch}>Fetch Avatar Manually</button>
      <button onClick={handleSanitizeImage}>Sanitize Image URL</button>
    </div>
  )
}
```

---

## Returns

[`UseEnsAvatarResult`](../interfaces/UseEnsAvatarResult.md) - An object containing:
- `avatar`: URL string of the ENS avatar image
- `isLoading`: Boolean indicating if the avatar is being fetched
- `getEnsAvatar`: Function to manually fetch avatar for a given ENS name
- `sanitizeEnsImage`: Function to sanitize image URLs (handles IPFS and EIP formats)

## Parameters

- **params?**: [`UseEnsAvatarParams`](../interfaces/UseEnsAvatarParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/records/useAvatar.ts:35](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/records/useAvatar.ts#L35)
