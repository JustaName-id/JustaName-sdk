# createAddresses

Creates detailed address information from coin data by enriching coin objects with coin type details.

---

## Usage

```typescript
import { createAddresses } from '@justaname.id/sdk'

const addresses = createAddresses([
  { id: 60, name: 'ETH', value: '0x1234567890abcdef...' },
  { id: 0, name: 'BTC', value: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' }
])
```

---

## Returns

[`CoinAndDetails`](../type-aliases/CoinAndDetails.md)[] - An array of objects containing:
- `id`: The coin type identifier (number)
- `name`: The original name from the coin object
- `value`: The cryptocurrency address
- `coin`: The full name of the cryptocurrency
- `symbol`: The symbol of the cryptocurrency
- `coinType`: The coin type as a string

## Parameters

- **coins**: [`Coin`](../interfaces/Coin.md)[] - Array of coin objects with id, name, and value

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts:42](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L42)
