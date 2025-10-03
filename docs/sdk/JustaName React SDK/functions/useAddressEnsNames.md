# useAddressEnsNames

A React hook for fetching ENS names and their records associated with a specific Ethereum address.

---

## Usage

```typescript
import { useAddressEnsNames } from '@justaname.id/react'

// Basic usage
function AddressEnsNamesComponent() {
  const { 
    addressEnsNames, 
    isAddressEnsNamesPending, 
    refetchAddressEnsNames 
  } = useAddressEnsNames({
    address: '0x1234567890abcdef1234567890abcdef12345678'
  })
  
  if (isAddressEnsNamesPending) return <div>Loading ENS names...</div>
  
  return (
    <div>
      <h3>ENS Names for Address</h3>
      {addressEnsNames?.map((record, index) => (
        <div key={index}>
          <strong>{record.ens}</strong>
          <p>Avatar: {record.sanitizedRecords?.avatar}</p>
          <p>Description: {record.sanitizedRecords?.description}</p>
        </div>
      ))}
      <button onClick={() => refetchAddressEnsNames()}>Refresh</button>
    </div>
  )
}
```

---

## Returns

[`UseAddressEnsNamesResult`](../interfaces/UseAddressEnsNamesResult.md) - An object containing:
- `addressEnsNames`: Array of [`Records`](../interfaces/Records.md) objects containing ENS names and their records
- `isAddressEnsNamesPending`: Boolean indicating if the data is being fetched
- `isAddressEnsNamesFetching`: Boolean indicating if the data is being refetched
- `isAddressEnsNamesLoading`: Boolean indicating if the data is loading for the first time
- `getEnsNamesForAddress`: Function to manually fetch ENS names for an address
- `refetchAddressEnsNames`: Function to manually refetch the data

## Parameters

- **params?**: [`UseAddressEnsNamesParams`](../interfaces/UseAddressEnsNamesParams.md) - Optional parameters:
  - `address`: Ethereum address to fetch ENS names for
  - `chainId`: Chain ID (defaults to provider's chainId)
  - `enabled`: Whether to enable the query (defaults to true)

## Defined in

[packages/@justaname.id/react/src/lib/hooks/ens/useAddressEnsNames.ts:35](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/ens/useAddressEnsNames.ts#L35)
