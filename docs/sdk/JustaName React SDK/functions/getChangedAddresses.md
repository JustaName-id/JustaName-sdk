# getChangedAddresses

Returns a list of addresses that have been changed in the subname records.

---

## Usage

```typescript
import { getChangedAddresses } from '@justaname.id/react'

// Example usage
const changedAddresses = getChangedAddresses(sanitizedRequestAddress, records)
```

```typescript
// With specific parameters
const addresses = getChangedAddresses(
  ['0x123...', '0x456...'], // sanitizedRequestAddress
  { 
    // records object
    addresses: {
      '60': '0x789...',
      '0': '0xabc...'
    }
  }
)
```

---

## Returns

`Address[]` - An array of addresses that have been changed in the subname records.

## Parameters

- **sanitizedRequestAddress**: `undefined` | `Address[]` - The sanitized request addresses to compare against
- **records**: [`Records`](../interfaces/Records.md) - The records object containing address mappings

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:138](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L138)
