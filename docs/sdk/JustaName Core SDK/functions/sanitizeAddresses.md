# sanitizeAddresses

Sanitizes and normalizes address data from various formats into a standardized array of address objects.

---

## Usage

```typescript
import { sanitizeAddresses } from '@justaname.id/sdk'

// Basic usage with object format
const addresses = sanitizeAddresses({
  '60': '0x1234567890abcdef...',
  '0': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
})
```

```typescript
// With array format
const addresses = sanitizeAddresses([
  { coinType: '60', address: '0x1234567890abcdef...' },
  { coinType: '0', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' }
])
```

```typescript
// Processing subname address records
function processSubnameAddresses(subnameData) {
  const rawAddresses = subnameData.records?.coins || {}
  
  // Sanitize the addresses
  const sanitizedAddresses = sanitizeAddresses(rawAddresses)
  
  if (!sanitizedAddresses) {
    return { addresses: [], count: 0 }
  }
  
  // Group by coin type
  const addressesByType = sanitizedAddresses.reduce((acc, addr) => {
    if (!acc[addr.coinType]) acc[addr.coinType] = []
    acc[addr.coinType].push(addr)
    return acc
  }, {})
  
  return {
    addresses: sanitizedAddresses,
    count: sanitizedAddresses.length,
    byType: addressesByType,
    ethereum: addressesByType['60'] || [],
    bitcoin: addressesByType['0'] || []
  }
}

// Usage with subname data
const subnameData = {
  records: {
    coins: {
      '60': '0x1234567890abcdef1234567890abcdef12345678',
      '0': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      '137': '0xabcdef1234567890abcdef1234567890abcdef12'
    }
  }
}

const processed = processSubnameAddresses(subnameData)
console.log('Total addresses:', processed.count)
console.log('Ethereum addresses:', processed.ethereum)
console.log('Bitcoin addresses:', processed.bitcoin)
```

```typescript
// Validating and filtering addresses
function validateAddresses(addresses) {
  const sanitized = sanitizeAddresses(addresses)
  
  if (!sanitized) {
    return { valid: [], invalid: [], errors: ['No addresses provided'] }
  }
  
  const valid = []
  const invalid = []
  
  sanitized.forEach(addr => {
    try {
      // Basic validation based on coin type
      if (addr.coinType === '60' && addr.address.startsWith('0x') && addr.address.length === 42) {
        valid.push(addr)
      } else if (addr.coinType === '0' && addr.address.length >= 26 && addr.address.length <= 35) {
        valid.push(addr)
      } else {
        invalid.push({ ...addr, reason: 'Invalid format' })
      }
    } catch (error) {
      invalid.push({ ...addr, reason: error.message })
    }
  })
  
  return { valid, invalid, errors: invalid.map(addr => addr.reason) }
}

// Usage
const rawAddresses = {
  '60': '0x1234567890abcdef1234567890abcdef12345678', // Valid ETH
  '0': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', // Valid BTC
  '137': 'invalid-address' // Invalid
}

const validation = validateAddresses(rawAddresses)
console.log('Valid addresses:', validation.valid)
console.log('Invalid addresses:', validation.invalid)
```

```typescript
// Building address display components
function buildAddressDisplay(addresses) {
  const sanitized = sanitizeAddresses(addresses)
  
  if (!sanitized || sanitized.length === 0) {
    return { components: [], summary: 'No addresses found' }
  }
  
  const components = sanitized.map(addr => ({
    coinType: addr.coinType,
    address: addr.address,
    displayAddress: formatAddressForDisplay(addr.address, addr.coinType),
    explorerUrl: getExplorerUrl(addr.address, addr.coinType),
    copyText: addr.address
  }))
  
  const summary = `${sanitized.length} address${sanitized.length === 1 ? '' : 'es'} found`
  
  return { components, summary }
}

function formatAddressForDisplay(address, coinType) {
  if (coinType === '60' || coinType === '137') {
    // Ethereum-style addresses
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  } else if (coinType === '0') {
    // Bitcoin addresses
    return `${address.slice(0, 8)}...${address.slice(-8)}`
  }
  return address
}

function getExplorerUrl(address, coinType) {
  const explorers = {
    '60': `https://etherscan.io/address/${address}`,
    '137': `https://polygonscan.com/address/${address}`,
    '0': `https://blockstream.info/address/${address}`
  }
  return explorers[coinType] || '#'
}

// Usage
const addresses = {
  '60': '0x1234567890abcdef1234567890abcdef12345678',
  '0': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
}

const display = buildAddressDisplay(addresses)
console.log(display.summary) // "2 addresses found"
console.log(display.components)
// [
//   {
//     coinType: '60',
//     address: '0x1234567890abcdef1234567890abcdef12345678',
//     displayAddress: '0x1234...5678',
//     explorerUrl: 'https://etherscan.io/address/0x1234567890abcdef1234567890abcdef12345678',
//     copyText: '0x1234567890abcdef1234567890abcdef12345678'
//   },
//   // ... more addresses
// ]
```

---

## Returns

`undefined` | [`Address`](../interfaces/Address.md)[] - An array of sanitized address objects or undefined if no valid addresses

## Parameters

- **addresses**: `undefined` | `Partial<object>` | [`AddressWithTypedCoins`](../interfaces/AddressWithTypedCoins.md)[] - Address data in various formats

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/transformJsonToRecord/index.ts:13](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/transformJsonToRecord/index.ts#L13)
