# getChangedAddresses

Compares sanitized request addresses with current records and returns addresses that have been changed.

---

## Usage

```typescript
import { getChangedAddresses } from '@justaname.id/react'

// Example usage
const changedAddresses = getChangedAddresses(
  [
    { coinType: 60, address: '0x1234567890abcdef1234567890abcdef12345678' },
    { coinType: 0, address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' }
  ],
  records
)

console.log(changedAddresses)
// [
//   { coinType: 60, address: '0x1234567890abcdef1234567890abcdef12345678' }
// ]
```

---

## Returns

[`Address`](../interfaces/Address.md)[] - An array of addresses that have been changed, filtered to only include addresses with `coinType >= 0`

## Parameters

- **sanitizedRequestAddress**: `undefined` | [`Address`](../interfaces/Address.md)[] - The sanitized request addresses to compare against
- **records**: [`Records`](../interfaces/Records.md) - The records object containing current address mappings

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:140](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L140)
