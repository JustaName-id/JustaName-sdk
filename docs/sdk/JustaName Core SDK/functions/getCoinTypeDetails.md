# getCoinTypeDetails

Retrieves detailed information about a specific cryptocurrency coin type, including name, symbol, decimals, and chain information.

---

## Usage

```typescript
import { getCoinTypeDetails } from '@justaname.id/sdk'

// Basic usage
const ethDetails = getCoinTypeDetails('60')
console.log(ethDetails)
// {
//   coinType: '60',
//   name: 'Ethereum',
//   symbol: 'ETH',
//   decimals: 18,
//   chainId: 1,
//   network: 'Ethereum Mainnet'
// }
```

```typescript
// Getting details for different cryptocurrencies
const coinTypes = ['0', '60', '137', '42161', '1'] // BTC, ETH, MATIC, ARB, USDC

coinTypes.forEach(coinType => {
  const details = getCoinTypeDetails(coinType)
  console.log(`${details.symbol} (${details.name}): ${details.decimals} decimals`)
})

// Output:
// BTC (Bitcoin): 8 decimals
// ETH (Ethereum): 18 decimals
// MATIC (Polygon): 18 decimals
// ARB (Arbitrum): 18 decimals
// USDC (USD Coin): 6 decimals
```

```typescript
// Processing address records with coin type details
function processAddressRecords(addresses) {
  return addresses.map(address => {
    const coinDetails = getCoinTypeDetails(address.coinType)
    
    return {
      ...address,
      ...coinDetails,
      displayName: `${coinDetails.symbol} (${coinDetails.name})`,
      formattedAddress: formatAddress(address.address, coinDetails.symbol),
      explorerUrl: getExplorerUrl(address.address, coinDetails.chainId)
    }
  })
}

function formatAddress(address, symbol) {
  if (symbol === 'BTC') {
    return address // Bitcoin addresses are already formatted
  }
  // Ethereum-style addresses
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function getExplorerUrl(address, chainId) {
  const explorers = {
    1: `https://etherscan.io/address/${address}`,
    137: `https://polygonscan.com/address/${address}`,
    42161: `https://arbiscan.io/address/${address}`
  }
  return explorers[chainId] || `https://etherscan.io/address/${address}`
}

// Usage with subname address data
const subnameAddresses = [
  { coinType: '60', address: '0x1234567890abcdef1234567890abcdef12345678' },
  { coinType: '0', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
  { coinType: '137', address: '0xabcdef1234567890abcdef1234567890abcdef12' }
]

const processedAddresses = processAddressRecords(subnameAddresses)
console.log(processedAddresses)
// [
//   {
//     coinType: '60',
//     address: '0x1234567890abcdef1234567890abcdef12345678',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     decimals: 18,
//     chainId: 1,
//     network: 'Ethereum Mainnet',
//     displayName: 'ETH (Ethereum)',
//     formattedAddress: '0x1234...5678',
//     explorerUrl: 'https://etherscan.io/address/0x1234567890abcdef1234567890abcdef12345678'
//   },
//   // ... more addresses
// ]
```

```typescript
// Building a cryptocurrency selector
function buildCryptoSelector() {
  const popularCoins = ['0', '60', '137', '42161', '1', '43114'] // BTC, ETH, MATIC, ARB, USDC, AVAX
  
  return popularCoins.map(coinType => {
    const details = getCoinTypeDetails(coinType)
    return {
      value: coinType,
      label: `${details.symbol} - ${details.name}`,
      symbol: details.symbol,
      name: details.name,
      decimals: details.decimals,
      chainId: details.chainId
    }
  })
}

const cryptoOptions = buildCryptoSelector()
console.log(cryptoOptions)
// [
//   { value: '0', label: 'BTC - Bitcoin', symbol: 'BTC', name: 'Bitcoin', decimals: 8, chainId: null },
//   { value: '60', label: 'ETH - Ethereum', symbol: 'ETH', name: 'Ethereum', decimals: 18, chainId: 1 },
//   { value: '137', label: 'MATIC - Polygon', symbol: 'MATIC', name: 'Polygon', decimals: 18, chainId: 137 },
//   // ... more options
// ]
```

---

## Returns

[`CoinType`](../interfaces/CoinType.md) - An object containing:
- `coinType`: The coin type identifier
- `name`: The full name of the cryptocurrency
- `symbol`: The symbol of the cryptocurrency
- `decimals`: The number of decimal places
- `chainId`: The blockchain chain ID (if applicable)
- `network`: The network name

## Parameters

- **cointype**: `"2147483658"` | `"2147483673"` | ... | `"5741564"` - The coin type identifier string

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/cointypes/index.ts:30](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/cointypes/index.ts#L30)
