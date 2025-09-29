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
