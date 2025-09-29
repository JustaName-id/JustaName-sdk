# sanitizeRecords

Transforms and sanitizes subname response data into a structured format with organized text records, addresses, and metadata.

---

## Usage

```typescript
import { sanitizeRecords } from '@justaname.id/sdk'

// Basic usage
const sanitized = sanitizeRecords(subnameResponse)
```

```typescript
// With subname response data
const sanitized = sanitizeRecords({
  records: {
    texts: [
      { key: 'description', value: 'My description' },
      { key: 'url', value: 'https://example.com' },
      { key: 'com.twitter', value: '@username' }
    ],
    coins: {
      '60': '0x1234567890abcdef...',
      '0': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
    },
    contentHash: {
      protocolType: 'ipfs',
      decoded: 'QmHash...'
    }
  }
})
```

```typescript
// Processing complete subname data
function processSubnameData(subnameResponse) {
  const sanitized = sanitizeRecords(subnameResponse)
  
  if (!sanitized) {
    return { error: 'No valid records found' }
  }
  
  // Extract specific data
  const profile = {
    description: sanitized.generals?.find(g => g.key === 'description')?.value,
    website: sanitized.generals?.find(g => g.key === 'url')?.value,
    email: sanitized.generals?.find(g => g.key === 'email')?.value,
    avatar: sanitized.generals?.find(g => g.key === 'avatar')?.value,
    location: sanitized.generals?.find(g => g.key === 'location')?.value
  }
  
  const socials = sanitized.socials?.map(social => ({
    platform: social.platform,
    username: social.value,
    url: social.url,
    verified: social.verified || false
  })) || []
  
  const addresses = {
    ethereum: sanitized.ethAddress,
    others: sanitized.otherAddresses?.map(addr => ({
      coinType: addr.coinType,
      address: addr.address,
      name: addr.name,
      symbol: addr.symbol
    })) || []
  }
  
  return {
    profile,
    socials,
    addresses,
    contentHash: sanitized.contentHash,
    allTexts: sanitized.allTexts,
    metadata: {
      totalTexts: sanitized.allTexts?.length || 0,
      totalAddresses: (addresses.ethereum ? 1 : 0) + addresses.others.length,
      totalSocials: socials.length
    }
  }
}

// Usage with complete subname response
const subnameResponse = {
  name: 'alice.justaname.eth',
  owner: '0x1234567890abcdef...',
  records: {
    texts: [
      { key: 'description', value: 'Web3 developer and designer' },
      { key: 'url', value: 'https://alice.eth' },
      { key: 'email', value: 'alice@example.com' },
      { key: 'avatar', value: 'https://example.com/avatar.jpg' },
      { key: 'location', value: 'San Francisco, CA' },
      { key: 'com.twitter', value: '@alice_dev' },
      { key: 'com.github', value: 'alice-dev' },
      { key: 'com.discord', value: 'alice#1234' }
    ],
    coins: {
      '60': '0x1234567890abcdef1234567890abcdef12345678',
      '0': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      '137': '0xabcdef1234567890abcdef1234567890abcdef12'
    },
    contentHash: {
      protocolType: 'ipfs',
      decoded: 'QmHash1234567890abcdef...'
    }
  }
}

const processed = processSubnameData(subnameResponse)
console.log('Profile:', processed.profile)
console.log('Socials:', processed.socials)
console.log('Addresses:', processed.addresses)
console.log('Metadata:', processed.metadata)
```

```typescript
// Building a profile display component
function buildProfileDisplay(subnameResponse) {
  const sanitized = sanitizeRecords(subnameResponse)
  
  if (!sanitized) {
    return { error: 'Unable to process subname data' }
  }
  
  const display = {
    header: {
      name: subnameResponse.name,
      description: sanitized.generals?.find(g => g.key === 'description')?.value,
      avatar: sanitized.generals?.find(g => g.key === 'avatar')?.value
    },
    contact: {
      website: sanitized.generals?.find(g => g.key === 'url')?.value,
      email: sanitized.generals?.find(g => g.key === 'email')?.value,
      location: sanitized.generals?.find(g => g.key === 'location')?.value
    },
    socials: sanitized.socials?.map(social => ({
      platform: social.platform,
      displayName: social.displayName,
      username: social.value,
      url: social.url,
      verified: social.verified || false
    })) || [],
    addresses: {
      ethereum: sanitized.ethAddress ? {
        address: sanitized.ethAddress.address,
        displayAddress: `${sanitized.ethAddress.address.slice(0, 6)}...${sanitized.ethAddress.address.slice(-4)}`,
        explorerUrl: `https://etherscan.io/address/${sanitized.ethAddress.address}`
      } : null,
      others: sanitized.otherAddresses?.map(addr => ({
        name: addr.name,
        symbol: addr.symbol,
        address: addr.address,
        displayAddress: addr.address.length > 20 ? `${addr.address.slice(0, 8)}...${addr.address.slice(-8)}` : addr.address
      })) || []
    },
    content: {
      hash: sanitized.contentHash?.decoded,
      protocol: sanitized.contentHash?.protocolType
    },
    stats: {
      totalTexts: sanitized.allTexts?.length || 0,
      totalSocials: sanitized.socials?.length || 0,
      totalAddresses: (sanitized.ethAddress ? 1 : 0) + (sanitized.otherAddresses?.length || 0)
    }
  }
  
  return display
}

// Usage
const profileDisplay = buildProfileDisplay(subnameResponse)
console.log('Profile Display:', profileDisplay)
```

---

## Returns

[`SanitizedRecords`](../interfaces/SanitizedRecords.md) - A structured object containing:
- `generals`: General text records
- `ethAddress`: Ethereum address details
- `otherAddresses`: Non-ETH addresses
- `socials`: Social media records
- `allTexts`: All text records
- `contentHash`: Content hash information
- And other organized metadata

## Parameters

- **subnameResponse**: `undefined` | [`SubnameResponse`](../interfaces/SubnameResponse.md) - The subname response data to sanitize

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts:84](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L84)
