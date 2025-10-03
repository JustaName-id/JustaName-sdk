# getChangedTextRecords

Compares sanitized request text records with current records and returns text records that have been changed.

---

## Usage

```typescript
import { getChangedTextRecords } from '@justaname.id/react'

// Example usage
const changedTextRecords = getChangedTextRecords(
  [
    { key: 'description', value: 'My new description' },
    { key: 'url', value: 'https://example.com' }
  ],
  records
)

console.log(changedTextRecords)
// [
//   { key: 'description', value: 'My new description' }
// ]
```

---

## Returns

[`TextRecord`](../interfaces/TextRecord.md)[] - An array of text records that have been changed, filtered to only include records with valid keys

## Parameters

- **sanitizedRequestText**: `undefined` | [`TextRecord`](../interfaces/TextRecord.md)[] - The sanitized request text records to compare against
- **records**: [`Records`](../interfaces/Records.md) - The records object containing current text record data

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:160](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L160)
