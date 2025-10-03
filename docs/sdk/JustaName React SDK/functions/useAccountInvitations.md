# useAccountInvitations

A React hook for fetching subname invitations issued to a connected account. Domain holders can issue subnames to user addresses, and users can fetch and accept these invitations.

---

## Usage

```typescript
import { useAccountInvitations } from '@justaname.id/react'

function AccountInvitationsComponent() {
  const { 
    invitations, 
    isInvitationsPending, 
    refetchInvitations 
  } = useAccountInvitations({
    coinType: 60,
    chainId: 1,
    isClaimed: false
  })
  
  if (isInvitationsPending) return <div>Loading invitations...</div>
  
  return (
    <div>
      <h3>Your Subname Invitations</h3>
      {invitations?.map((invitation, index) => (
        <div key={index}>
          <strong>{invitation.ens}</strong>
          <p>{invitation.sanitizedRecords?.description}</p>
          <p>Claimed: {invitation.isClaimed ? 'Yes' : 'No'}</p>
          <p>JAN: {invitation.isJAN ? 'Yes' : 'No'}</p>
        </div>
      ))}
      <button onClick={refetchInvitations}>Refresh</button>
    </div>
  )
}
```

---

## Returns

[`UseAccountInvitationsResult`](../interfaces/UseAccountInvitationsResult.md) - An object containing:
- `invitations`: Array of `Records` objects containing subname invitation data with `sanitizedRecords` property
- `isInvitationsPending`: Boolean indicating if the data is being fetched
- `refetchInvitations`: Function to manually refetch the data

## Parameters

- **params?**: [`UseAccountInvitationsParams`](../interfaces/UseAccountInvitationsParams.md) - Optional parameters for the hook:
  - `coinType`: `number` - Coin type for the invitation (default: 60 for ETH)
  - `chainId`: `ChainId` - Chain ID for the invitation
  - `isClaimed`: `boolean` - Filter by claimed status
  - `enabled`: `boolean` - Enable/disable the query

## Defined in

[packages/@justaname.id/react/src/lib/hooks/account/useAccountInvitations.ts:31](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/account/useAccountInvitations.ts#L31)
