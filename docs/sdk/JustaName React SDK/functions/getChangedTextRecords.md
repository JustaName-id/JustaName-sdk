# getChangedTextRecords

Returns the text records that have been changed in the subname records.

---

## Usage

```typescript
import { getChangedTextRecords } from '@justaname.id/react'

// Example usage
const changedTextRecords = getChangedTextRecords(sanitizedRequestText, records)
```

```typescript
// With specific parameters
const textRecords = getChangedTextRecords(
  [
    { key: 'description', value: 'My description' },
    { key: 'url', value: 'https://example.com' }
  ], // sanitizedRequestText
  { 
    // records object
    text: [
      { key: 'description', value: 'Old description' },
      { key: 'url', value: 'https://old-example.com' }
    ]
  }
)
```

---

## Returns

`TextRecord`[] - The text records that have been changed.

## Parameters

- **sanitizedRequestText**: `undefined` | `TextRecord`[] - The sanitized request text records to compare against (use [`sanitizeRecords`](../../JustaName%20Core%20SDK/functions/sanitizeRecords.md) to sanitize raw data)
- **records**: [`Records`](../interfaces/Records.md) - The records object containing text record data

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:158](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L158)
