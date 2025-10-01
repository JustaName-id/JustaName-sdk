# useRecords

A React hook for fetching ENS records (text records, addresses, content hash) for a given ENS name.

---

## Usage

```typescript
import { useRecords } from '@justaname.id/react'

function RecordsComponent() {
  const { records, isRecordsLoading, refetchRecords } = useRecords({
    ens: 'alice.eth',
    chainId: 1
  })
  
  if (isRecordsLoading) return <div>Loading records...</div>
  
  return (
    <div>
      <h3>Records for alice.eth</h3>
      <div>
        <h4>Text Records</h4>
        {records?.records?.texts?.map((text, index) => (
          <div key={index}>
            <strong>{text.key}:</strong> {text.value}
          </div>
        ))}
      </div>
      <div>
        <h4>Addresses</h4>
        {records?.records?.coins?.map((coin, index) => (
          <div key={index}>
            <strong>Coin Type {coin.id}:</strong> {coin.value}
          </div>
        ))}
      </div>
      <button onClick={() => refetchRecords()}>Refresh</button>
    </div>
  )
}
```

---

## Returns

An object containing:
- `records`: Records object with:
  - `ens`: The ENS name
  - `isJAN`: Boolean indicating if it's a JustaName subname
  - `records`: Object containing resolver address, text records, addresses, content hash
  - `sanitizedRecords`: Sanitized version of the records
- `isRecordsPending`: Boolean indicating if the query is pending
- `isRecordsFetching`: Boolean indicating if the query is fetching
- `isRecordsLoading`: Boolean indicating if the query is loading
- `getRecords`: Function to manually get records
- `refetchRecords`: Function to manually refetch the records
- `recordsStatus`: Status of the query ('error' | 'success' | 'pending')

## Parameters

Optional parameters:
- `ens?`: The ENS name to fetch records for
- `chainId?`: The chain ID to use (optional, defaults to provider chain ID)
- `enabled?`: Boolean to enable/disable the query (optional, defaults to true)
- `skipQueue?`: Boolean to skip the records queue (optional)

## Defined in

[packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts:68](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts#L68)