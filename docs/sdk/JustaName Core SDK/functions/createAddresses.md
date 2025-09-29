# createAddresses

Creates detailed address information from coin data, including coin type details and validation.

---

## Usage

```typescript
import { createAddresses } from '@justaname.id/sdk'

// Basic usage
const addresses = createAddresses([
  { coinType: '60', address: '0x1234567890abcdef...' },
  { coinType: '0', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' }
])
```

```typescript
// With multiple coin types
const addresses = createAddresses([
  { coinType: '60', address: '0x1234567890abcdef...' }, // Ethereum
  { coinType: '0', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' }, // Bitcoin
  { coinType: '137', address: '0xabcdef1234567890...' }, // Polygon
  { coinType: '42161', address: '0x9876543210fedcba...' } // Arbitrum
])

console.log(addresses)
// [
//   {
//     coinType: '60',
//     address: '0x1234567890abcdef...',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     decimals: 18,
//     chainId: 1
//   },
//   {
//     coinType: '0',
//     address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
//     name: 'Bitcoin',
//     symbol: 'BTC',
//     decimals: 8,
//     chainId: null
//   },
//   // ... more addresses with details
// ]
```

```typescript
// Processing subname records
function processSubnameAddresses(records) {
  const coins = records.coins || {}
  const coinArray = Object.entries(coins).map(([coinType, address]) => ({
    coinType,
    address
  }))
  
  const addressesWithDetails = createAddresses(coinArray)
  
  // Filter for specific networks
  const ethereumAddresses = addressesWithDetails.filter(addr => addr.coinType === '60')
  const bitcoinAddresses = addressesWithDetails.filter(addr => addr.coinType === '0')
  
  return {
    all: addressesWithDetails,
    ethereum: ethereumAddresses,
    bitcoin: bitcoinAddresses
  }
}

// Usage with subname data
const subnameData = {
  records: {
    coins: {
      '60': '0x1234567890abcdef...',
      '0': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      '137': '0xabcdef1234567890...'
    }
  }
}

const processedAddresses = processSubnameAddresses(subnameData.records)
console.log('Ethereum addresses:', processedAddresses.ethereum)
console.log('Bitcoin addresses:', processedAddresses.bitcoin)
```

---

## Returns

[`CoinAndDetails`](../type-aliases/CoinAndDetails.md)[] - An array of objects containing:
- `coinType`: The coin type identifier
- `address`: The cryptocurrency address
- `name`: The full name of the cryptocurrency
- `symbol`: The symbol of the cryptocurrency
- `decimals`: The number of decimal places
- `chainId`: The blockchain chain ID (if applicable)

## Parameters

- **coins**: [`Coin`](../interfaces/Coin.md)[] - Array of coin objects with coinType and address

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts:42](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L42)
