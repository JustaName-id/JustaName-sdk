# sanitizeAddresses

Converts address data from object or array format into a standardized array of address objects with numeric coin types.

---

## Usage

```typescript
import { sanitizeAddresses } from '@justaname.id/sdk'

// Object format
const addresses = sanitizeAddresses({
  '60': '0x1234567890abcdef1234567890abcdef12345678',
  '0': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
})

console.log(addresses)
// [
//   { coinType: 60, address: '0x1234567890abcdef1234567890abcdef12345678' },
//   { coinType: 0, address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' }
// ]

// Array format
const addresses2 = sanitizeAddresses([
  { coinType: '60', address: '0x1234567890abcdef1234567890abcdef12345678' },
  { coinType: '0', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' }
])
```

---

## Returns

`undefined` | [`Address`](../interfaces/Address.md)[] - An array of address objects with numeric coin types, or undefined if no addresses provided

## Parameters

- **addresses**: `undefined` | `Partial<object>` | [`AddressWithTypedCoins`](../interfaces/AddressWithTypedCoins.md)[] - Address data in object or array format

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/transformJsonToRecord/index.ts:13](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/transformJsonToRecord/index.ts#L13)
