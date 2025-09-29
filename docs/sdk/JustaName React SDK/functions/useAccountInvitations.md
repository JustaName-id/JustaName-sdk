# useAccountInvitations

A React hook for fetching and managing subname invitations for a connected account.

---

## Usage

```typescript
import { useAccountInvitations } from '@justaname.id/react'

// Basic usage
function AccountInvitationsComponent() {
  const { invitations, isLoading, error, refetch } = useAccountInvitations()
  
  if (isLoading) return <div>Loading invitations...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Your Invitations</h3>
      {invitations?.map((invitation, index) => (
        <div key={index}>
          <p>Subname: {invitation.subname}</p>
          <p>Status: {invitation.status}</p>
        </div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}
```

```typescript
// With parameters
function AccountInvitationsComponent() {
  const { invitations, isLoading, error } = useAccountInvitations({
    account: '0x1234567890abcdef...',
    status: 'pending',
    onSuccess: (invitations) => {
      console.log('Invitations loaded:', invitations)
    },
    onError: (error) => {
      console.error('Error loading invitations:', error)
    }
  })
  
  return (
    <div>
      {isLoading && <p>Loading invitations...</p>}
      {error && <p>Error: {error.message}</p>}
      {invitations && (
        <div>
          <h4>Pending Invitations ({invitations.length})</h4>
          {invitations.map((invitation, index) => (
            <div key={index} className="invitation-card">
              <h5>{invitation.subname}</h5>
              <p>Invited by: {invitation.inviter}</p>
              <p>Expires: {invitation.expiresAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## Returns

`UseAccountInvitationsResult` - An object containing:
- `invitations`: Array of subname invitations for the account
- `isLoading`: Boolean indicating if the data is being fetched
- `error`: Error object if the operation failed
- `refetch`: Function to manually refetch the data

## Parameters

- **params?**: [`UseAccountInvitationsParams`](../type-aliases/UseAccountInvitationsParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/account/useAccountInvitations.ts:31](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/account/useAccountInvitations.ts#L31)
