# sanitizeRecords

Transforms subname response data into a structured format with organized text records, addresses, and metadata.

---

## Usage

```typescript
import { sanitizeRecords } from '@justaname.id/sdk'

// Sample subname response
const subnameResponse = {
  name: 'alice.justaname.eth',
  owner: '0x1234567890abcdef1234567890abcdef12345678',
  records: {
    texts: [
      { key: 'description', value: 'Web3 developer and designer' },
      { key: 'url', value: 'https://alice.eth' },
      { key: 'email', value: 'alice@example.com' },
      { key: 'avatar', value: 'https://example.com/avatar.jpg' },
      { key: 'com.twitter', value: '@alice_dev' },
      { key: 'com.github', value: 'alice-dev' }
    ],
    coins: [
    { id: 60, name: 'ETH', value: '0x1234567890abcdef1234567890abcdef12345678' },
    { id: 0, name: 'BTC', value: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' }
  ],
    contentHash: {
      protocolType: 'ipfs',
      decoded: 'QmHash1234567890abcdef'
    }
  }
}

const sanitized = sanitizeRecords(subnameResponse)

console.log(sanitized)
// {
//   avatar: 'https://example.com/avatar.jpg',
//   description: 'Web3 developer and designer',
//   url: 'https://alice.eth',
//   email: 'alice@example.com',
//   ethAddress: { id: 60, name: 'ETH', value: '0x1234...', ... },
//   generals: [
//     { key: 'description', value: 'Web3 developer and designer' },
//     { key: 'url', value: 'https://alice.eth' },
//     { key: 'email', value: 'alice@example.com' },
//     { key: 'avatar', value: 'https://example.com/avatar.jpg' }
//   ],
//   socials: [
//     { key: 'com.twitter', value: '@alice_dev', name: 'Twitter' },
//     { key: 'com.github', value: 'alice-dev', name: 'Github' }
//   ],
//   otherAddresses: [{ id: 0, name: 'BTC', value: '1A1z...', ... }],
//   allAddresses: [...],
//   allTexts: [...],
//   contentHash: { protocolType: 'ipfs', decoded: 'QmHash1234567890abcdef' },
//   contentHashUri: 'ipfs://QmHash1234567890abcdef'
// }
```

---

## Returns

[`SanitizedRecords`](../interfaces/SanitizedRecords.md) - A structured object containing:
- `avatar`, `banner`, `header`, `display`, `email`, `description`, `url` - Extracted profile fields
- `ethAddress` - Ethereum address with coin details
- `otherAddresses` - Non-ETH addresses with coin details
- `generals` - General text records (avatar, description, url, etc.)
- `socials` - Social media records with platform names
- `allTexts` - All text records
- `contentHash` - Content hash information
- `contentHashUri` - Formatted content hash URI

## Parameters

- **subnameResponse**: `undefined` | [`SubnameResponse`](../interfaces/SubnameResponse.md) - The subname response data to sanitize

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts:84](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L84)
