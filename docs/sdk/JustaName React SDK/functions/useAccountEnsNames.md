# useAccountEnsNames

A React hook for fetching and managing ENS names associated with a connected account.

---

## Usage

```typescript
import { useAccountEnsNames } from '@justaname.id/react'

function AccountEnsNamesComponent() {
  const { 
    accountEnsNames, 
    isAccountEnsNamesPending, 
    isAccountEnsNamesFetching,
    isAccountEnsNamesLoading,
    refetchAccountEnsNames 
  } = useAccountEnsNames()
  
  if (isAccountEnsNamesLoading) return <div>Loading ENS names...</div>
  
  return (
    <div>
      <h3>Your ENS Names</h3>
      {accountEnsNames?.map((record, index) => (
        <div key={index}>
          <strong>{record.ens}</strong>
          <p>{record.sanitizedRecords?.description}</p>
          <p>Claimed: {record.isClaimed ? 'Yes' : 'No'}</p>
        </div>
      ))}
      <button onClick={refetchAccountEnsNames}>Refresh</button>
    </div>
  )
}
```

---

## Returns

[`UseAccountEnsNamesResult`](../interfaces/UseAccountEnsNamesResult.md) - An object containing:
- `accountEnsNames`: Array of `Records` objects containing ENS name data with `sanitizedRecords` property
- `isAccountEnsNamesPending`: Boolean indicating if the data is being fetched
- `isAccountEnsNamesFetching`: Boolean indicating if the data is being fetched
- `isAccountEnsNamesLoading`: Boolean indicating if the data is loading
- `refetchAccountEnsNames`: Function to manually refetch the data

## Parameters

- **props?**: [`UseAccountEnsNamesParams`](../interfaces/UseAccountEnsNamesParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/account/useAccountEnsNames.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/account/useAccountEnsNames.ts#L19)
