# getChangedContentHash

Compares a content hash with current records and returns the content hash if it has changed.

---

## Usage

```typescript
import { getChangedContentHash } from '@justaname.id/react'

// Example usage
const changedContentHash = getChangedContentHash(
  'ipfs://QmHash1234567890abcdef',
  records
)

console.log(changedContentHash)
// 'ipfs://QmHash1234567890abcdef' (if changed)
// undefined (if no change)
```

---

## Returns

`undefined` | `string` - The content hash if it has changed, empty string if content hash is being cleared, or undefined if no change was detected

## Parameters

- **contentHash**: `undefined` | `string` - The content hash to compare against (in format `protocolType://decoded`)
- **records**: [`Records`](../interfaces/Records.md) - The records object containing current content hash data

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:181](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L181)
