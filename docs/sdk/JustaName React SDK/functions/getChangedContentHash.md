# getChangedContentHash

Returns the content hash that has been changed in the subname records.

---

## Usage

```typescript
import { getChangedContentHash } from '@justaname.id/react'

// Example usage
const changedContentHash = getChangedContentHash(contentHash, records)
```

```typescript
// With specific parameters
const contentHash = getChangedContentHash(
  '0x1234567890abcdef...', // contentHash
  { 
    // records object
    contentHash: '0xabcdef1234567890...'
  }
)
```

---

## Returns

`undefined` | `string` - The content hash that has been changed, or undefined if no change was detected.

## Parameters

- **contentHash**: `undefined` | `string` - The content hash to compare against
- **records**: [`Records`](../interfaces/Records.md) - The records object containing content hash data (use [`sanitizeRecords`](../../JustaName%20Core%20SDK/functions/sanitizeRecords.md) to sanitize raw data)

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:179](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L179)
