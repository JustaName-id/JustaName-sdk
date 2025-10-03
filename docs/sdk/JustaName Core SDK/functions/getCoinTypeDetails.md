# getCoinTypeDetails

Retrieves detailed information about a specific cryptocurrency coin type from the supported coin types.

---

## Usage

```typescript
import { getCoinTypeDetails } from '@justaname.id/sdk'

// Basic usage
const ethDetails = getCoinTypeDetails('60')
console.log(ethDetails)
// {
//   coin: 'Ethereum',
//   symbol: 'eth',
//   coinType: '60'
// }

const btcDetails = getCoinTypeDetails('0')
console.log(btcDetails)
// {
//   coin: 'Bitcoin',
//   symbol: 'btc',
//   coinType: '0'
// }
```

---

## Supported Coin Types

The SDK supports all coin types from the [ENS address-encoder supported cryptocurrencies list](https://github.com/ensdomains/address-encoder/blob/master/docs/supported-cryptocurrencies.md). For unsupported coin types, returns `{ coin: 'NON', symbol: 'NON', coinType: '-1' }`.

---

## Returns

[`CoinType`](../interfaces/CoinType.md) - An object containing:
- `coin`: The full name of the cryptocurrency
- `symbol`: The symbol of the cryptocurrency  
- `coinType`: The coin type identifier

## Parameters

- **cointype**: `string` - The coin type identifier string

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/cointypes/index.ts:34](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/cointypes/index.ts#L34)
