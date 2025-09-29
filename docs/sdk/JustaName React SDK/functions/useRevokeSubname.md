# useRevokeSubname

A React hook for revoking subname ownership and managing the revocation process.

---

## Usage

```typescript
import { useRevokeSubname } from '@justaname.id/react'

// Basic usage
function RevokeSubnameComponent() {
  const { revokeSubname, isLoading, error, data } = useRevokeSubname()
  
  const handleRevoke = async () => {
    try {
      await revokeSubname({
        subname: 'alice.justaname.eth',
        reason: 'No longer needed'
      })
    } catch (err) {
      console.error('Failed to revoke subname:', err)
    }
  }
  
  return (
    <div>
      <button onClick={handleRevoke} disabled={isLoading}>
        {isLoading ? 'Revoking...' : 'Revoke Subname'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Subname revoked: {data.subname}</p>}
    </div>
  )
}
```

```typescript
// With advanced parameters and confirmation
function RevokeSubnameComponent() {
  const { revokeSubname, isLoading, error, data } = useRevokeSubname({
    onSuccess: (result) => {
      console.log('Subname revoked successfully:', result)
      // Show success notification or redirect
    },
    onError: (error) => {
      console.error('Error revoking subname:', error)
      // Show error notification
    }
  })
  
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [subnameToRevoke, setSubnameToRevoke] = useState('')
  const [revokeReason, setRevokeReason] = useState('')
  
  const handleRevokeClick = (subname) => {
    setSubnameToRevoke(subname)
    setShowConfirmation(true)
  }
  
  const handleConfirmRevoke = async () => {
    await revokeSubname({
      subname: subnameToRevoke,
      reason: revokeReason || 'No reason provided'
    })
    setShowConfirmation(false)
    setSubnameToRevoke('')
    setRevokeReason('')
  }
  
  const ownedSubnames = [
    { id: '1', subname: 'alice.justaname.eth', createdAt: '2023-01-01', status: 'active' },
    { id: '2', subname: 'bob.justaname.eth', createdAt: '2023-01-02', status: 'active' }
  ]
  
  return (
    <div className="revoke-subname">
      <h3>My Subnames</h3>
      
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Processing revocation...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
        </div>
      )}
      
      {data && (
        <div className="success">
          <p>✅ Successfully revoked {data.subname}</p>
        </div>
      )}
      
      <div className="subnames-list">
        {ownedSubnames.map((subname) => (
          <div key={subname.id} className="subname-card">
            <div className="subname-info">
              <h4>{subname.subname}</h4>
              <p>Created: {subname.createdAt}</p>
              <p>Status: {subname.status}</p>
            </div>
            <div className="subname-actions">
              <button 
                onClick={() => handleRevokeClick(subname.subname)}
                className="revoke-btn"
                disabled={isLoading}
              >
                Revoke
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h4>Confirm Revocation</h4>
            <p>Are you sure you want to revoke <strong>{subnameToRevoke}</strong>?</p>
            <p>This will permanently remove your ownership of this subname.</p>
            
            <div className="reason-input">
              <label htmlFor="revoke-reason">Reason (optional):</label>
              <textarea
                id="revoke-reason"
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="Why are you revoking this subname?"
                rows={3}
              />
            </div>
            
            <div className="modal-actions">
              <button 
                onClick={() => setShowConfirmation(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmRevoke}
                className="confirm-revoke-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Revoking...' : 'Yes, Revoke'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## Returns

[`UseRevokeSubnameResult`](../interfaces/UseRevokeSubnameResult.md) - An object containing:
- `revokeSubname`: Function to revoke a subname
- `isLoading`: Boolean indicating if the revocation is in progress
- `error`: Error object if the revocation failed
- `data`: Result data if the revocation succeeded

## Parameters

- **params?**: [`UseRevokeSubnameParams`](../interfaces/UseRevokeSubnameParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useRevokeSubname.ts:28](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useRevokeSubname.ts#L28)
