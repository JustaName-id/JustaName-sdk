# useAccountSubnames

A React hook for fetching subnames owned by a connected account.

---

## Usage

```typescript
import { useAccountSubnames } from '@justaname.id/react'

function AccountSubnamesComponent() {
  const { 
    accountSubnames, 
    isAccountSubnamesPending, 
    isAccountSubnamesFetching,
    isAccountSubnamesLoading,
    refetchAccountSubnames 
  } = useAccountSubnames()
  
  if (isAccountSubnamesLoading) return <div>Loading subnames...</div>
  
  return (
    <div>
      <h3>Your Subnames</h3>
      {accountSubnames?.map((record, index) => (
        <div key={index}>
          <strong>{record.ens}</strong>
          <p>{record.sanitizedRecords?.description}</p>
          <p>Claimed: {record.isClaimed ? 'Yes' : 'No'}</p>
        </div>
      ))}
      <button onClick={refetchAccountSubnames}>Refresh</button>
    </div>
  )
}
```

---

## Returns

[`UseAccountSubnamesResult`](../interfaces/UseAccountSubnamesResult.md) - An object containing:
- `accountSubnames`: Array of `Records` objects containing subname data with `sanitizedRecords` property
- `isAccountSubnamesPending`: Boolean indicating if the data is being fetched
- `isAccountSubnamesFetching`: Boolean indicating if the data is being fetched
- `isAccountSubnamesLoading`: Boolean indicating if the data is loading
- `refetchAccountSubnames`: Function to manually refetch the data

## Parameters

- **params?**: [`UseConnectedWalletSubnamesOptions`](../interfaces/UseConnectedWalletSubnamesOptions.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/account/useAccountSubnames.ts:27](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/account/useAccountSubnames.ts#L27)
