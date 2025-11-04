# useUpdateSubname

A React hook for updating subname records including text records, addresses, and content hash.

---

## Usage

```typescript
import { useUpdateSubname } from '@justaname.id/react'

function UpdateSubnameComponent() {
  const { updateSubname, isUpdateSubnamePending } = useUpdateSubname()
  
  const handleUpdate = async () => {
    await updateSubname({
      ens: 'alice.justaname.eth',
      text: [
        { key: 'description', value: 'Updated description' },
        { key: 'url', value: 'https://example.com' }
      ],
      addresses: [
        { address: '0x1234567890abcdef...', coinType: 60 }
      ]
    })
  }
  
  return (
    <button onClick={handleUpdate} disabled={isUpdateSubnamePending}>
      {isUpdateSubnamePending ? 'Updating...' : 'Update Subname'}
    </button>
  )
}
```

---

## Returns

An object containing:
- `updateSubname`: Function to update the subname records
- `isUpdateSubnamePending`: Boolean indicating if the update is in progress

## Parameters

- **params?**: Optional configuration object
  - `chainId?`: The chain ID to use (defaults to provider chain ID)

## Update Function Parameters

The `updateSubname` function accepts:
- `ens`: The ENS name to update (e.g., 'alice.justaname.eth')
- `text?`: Array of text records `{ key: string, value: string }[]`
- `addresses?`: Array of address records `{ address: string, coinType: number }[]`
- `contentHash?`: Content hash string (e.g., 'ipfs://QmHash...')
- `chainId?`: Override the chain ID for this operation

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateSubname.ts:43](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateSubname.ts#L43)
