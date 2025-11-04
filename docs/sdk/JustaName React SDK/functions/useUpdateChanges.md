# useUpdateChanges

A React hook for detecting changes between current and new subname records before updating.

---

## Usage

```typescript
import { useUpdateChanges } from '@justaname.id/react'

function UpdateChangesComponent() {
  const { 
    changes, 
    canUpdateEns,
    isUpdateChangesLoading 
  } = useUpdateChanges({
    ens: 'alice.justaname.eth',
    text: [
      { key: 'description', value: 'New description' }
    ],
    addresses: [
      { address: '0x123...', coinType: 60 }
    ]
  })
  
  if (isUpdateChangesLoading) return <div>Analyzing changes...</div>
  
  return (
    <div>
      <h3>Changes Detected</h3>
      <p>Text Records Changed: {changes?.changedTexts?.length || 0}</p>
      <p>Addresses Changed: {changes?.changedAddresses?.length || 0}</p>
      <p>Content Hash Changed: {changes?.changedContentHash ? 'Yes' : 'No'}</p>
      <p>Can Update: {canUpdateEns ? 'Yes' : 'No'}</p>
    </div>
  )
}
```

---

## Returns

An object containing:
- `changes`: Object with detected changes:
  - `changedTexts`: Array of text records that changed
  - `changedAddresses`: Array of addresses that changed
  - `changedContentHash`: Changed content hash (if any)
- `canUpdateEns`: Boolean indicating if there are any changes to apply
- `isUpdateChangesLoading`: Boolean indicating if analysis is in progress
- `isUpdateChangesPending`: Boolean for pending state
- `isUpdateChangesFetching`: Boolean for fetching state
- `getUpdateChanges`: Function to manually get changes
- `checkIfUpdateIsValid`: Function to check if update is valid
- `refetchUpdateChanges`: Function to refetch changes

## Parameters

Optional configuration object:
- `ens?`: The ENS name to check changes for
- `text?`: Array of new text records `{ key: string, value: string }[]`
- `addresses?`: Array of new address records `{ address: string, coinType: number }[]`
- `contentHash?`: New content hash string
- `chainId?`: The chain ID to use

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:49](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L49)

