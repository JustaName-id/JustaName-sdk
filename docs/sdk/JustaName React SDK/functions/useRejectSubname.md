# useRejectSubname

A React hook for rejecting subname invitations and managing the rejection process.

---

## Usage

```typescript
import { useRejectSubname } from '@justaname.id/react'

// Basic usage
function RejectSubnameComponent() {
  const { rejectSubname, isLoading, error, data } = useRejectSubname()
  
  const handleReject = async () => {
    try {
      await rejectSubname({
        subname: 'alice.justaname.eth',
        invitationId: 'invitation-123'
      })
    } catch (err) {
      console.error('Failed to reject subname:', err)
    }
  }
  
  return (
    <div>
      <button onClick={handleReject} disabled={isLoading}>
        {isLoading ? 'Rejecting...' : 'Reject Subname'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Subname rejected: {data.subname}</p>}
    </div>
  )
}
```

```typescript
// With advanced parameters and confirmation
function RejectSubnameComponent() {
  const { rejectSubname, isLoading, error, data } = useRejectSubname({
    onSuccess: (result) => {
      console.log('Subname rejected successfully:', result)
      // Show success notification or redirect
    },
    onError: (error) => {
      console.error('Error rejecting subname:', error)
      // Show error notification
    }
  })
  
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [subnameToReject, setSubnameToReject] = useState('')
  
  const handleRejectClick = (subname) => {
    setSubnameToReject(subname)
    setShowConfirmation(true)
  }
  
  const handleConfirmReject = async () => {
    await rejectSubname({
      subname: subnameToReject,
      invitationId: `invitation-${subnameToReject}`,
      reason: 'Not interested in this subname'
    })
    setShowConfirmation(false)
    setSubnameToReject('')
  }
  
  const invitations = [
    { id: '1', subname: 'alice.justaname.eth', inviter: '0x123...', expiresAt: '2024-01-01' },
    { id: '2', subname: 'bob.justaname.eth', inviter: '0x456...', expiresAt: '2024-01-02' }
  ]
  
  return (
    <div className="reject-subname">
      <h3>Subname Invitations</h3>
      
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Processing rejection...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
        </div>
      )}
      
      {data && (
        <div className="success">
          <p>✅ Successfully rejected {data.subname}</p>
        </div>
      )}
      
      <div className="invitations-list">
        {invitations.map((invitation) => (
          <div key={invitation.id} className="invitation-card">
            <div className="invitation-info">
              <h4>{invitation.subname}</h4>
              <p>Invited by: {invitation.inviter}</p>
              <p>Expires: {invitation.expiresAt}</p>
            </div>
            <div className="invitation-actions">
              <button 
                onClick={() => handleRejectClick(invitation.subname)}
                className="reject-btn"
                disabled={isLoading}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h4>Confirm Rejection</h4>
            <p>Are you sure you want to reject the invitation for <strong>{subnameToReject}</strong>?</p>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                onClick={() => setShowConfirmation(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmReject}
                className="confirm-reject-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Rejecting...' : 'Yes, Reject'}
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

[`UseRejectSubnameResult`](../interfaces/UseRejectSubnameResult.md) - An object containing:
- `rejectSubname`: Function to reject a subname invitation
- `isLoading`: Boolean indicating if the rejection is in progress
- `error`: Error object if the rejection failed
- `data`: Result data if the rejection succeeded

## Parameters

- **params?**: [`UseRejectSubnameParams`](../type-aliases/UseRejectSubnameParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useRejectSubname.ts:32](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useRejectSubname.ts#L32)
