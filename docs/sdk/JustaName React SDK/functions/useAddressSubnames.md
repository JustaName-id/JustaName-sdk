# useAddressSubnames

A React hook for fetching subnames owned by a specific Ethereum address.

---

## Usage

```typescript
import { useAddressSubnames } from '@justaname.id/react'

function AddressSubnamesComponent() {
  const { 
    addressSubnames, 
    isAddressSubnamesPending, 
    isAddressSubnamesFetching,
    isAddressSubnamesLoading,
    refetchAddressSubnames 
  } = useAddressSubnames({
    address: '0x1234567890abcdef1234567890abcdef12345678',
    chainId: 1,
    isClaimed: true,
    coinType: 60
  })
  
  if (isAddressSubnamesLoading) return <div>Loading subnames...</div>
  
  return (
    <div>
      <h3>Subnames for Address</h3>
      {addressSubnames?.map((subname, index) => (
        <div key={index}>
          <strong>{subname.ens}</strong>
          <p>{subname.sanitizedRecords?.description}</p>
          <p>Claimed: {subname.isClaimed ? 'Yes' : 'No'}</p>
          <p>JAN: {subname.isJAN ? 'Yes' : 'No'}</p>
        </div>
      ))}
      <button onClick={refetchAddressSubnames}>Refresh</button>
    </div>
  )
}
```

---

## Returns

[`UseAddressSubnamesResult`](../interfaces/UseAddressSubnamesResult.md) - An object containing:
- `addressSubnames`: Array of `Records` objects containing subname data with `sanitizedRecords` property
- `isAddressSubnamesPending`: Boolean indicating if the data is being fetched
- `isAddressSubnamesFetching`: Boolean indicating if the data is being fetched
- `isAddressSubnamesLoading`: Boolean indicating if the data is loading
- `refetchAddressSubnames`: Function to manually refetch the data

## Parameters

- **params**: [`UseAddressSubnamesParams`](../interfaces/UseAddressSubnamesParams.md) - Required parameters for the hook:
  - `address`: `string` - Ethereum address to fetch subnames for
  - `chainId`: `ChainId` - Chain ID for the query
  - `isClaimed?`: `boolean` - Filter by claimed status (default: true)
  - `coinType?`: `number` - Coin type filter
  - `enabled?`: `boolean` - Enable/disable the query

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useAddressSubnames.ts:43](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useAddressSubnames.ts#L43)
