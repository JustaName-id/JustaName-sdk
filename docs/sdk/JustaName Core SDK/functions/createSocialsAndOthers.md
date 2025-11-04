# createSocialsAndOthers

Separates supported social media records from other text records, returning social records with platform names and remaining non-general text records.

---

## Usage

```typescript
import { createSocialsAndOthers } from '@justaname.id/sdk'

// Basic usage
const [socials, others] = createSocialsAndOthers([
  { key: 'description', value: 'My personal description' },
  { key: 'com.twitter', value: '@username' },
  { key: 'com.github', value: 'githubuser' },
  { key: 'url', value: 'https://example.com' },
  { key: 'custom', value: 'custom value' }
])

console.log(socials)
// [
//   { key: 'com.twitter', value: '@username', name: 'Twitter' },
//   { key: 'com.github', value: 'githubuser', name: 'Github' }
// ]

console.log(others)
// [
//   { key: 'custom', value: 'custom value' }
// ]
```

---

## Supported Social Platforms

- Twitter (`com.twitter`)
- Facebook (`com.facebook`) 
- Instagram (`com.instagram`)
- Reddit (`com.reddit`)
- X (`com.x`)
- Github (`com.github`)
- Email (`email`)
- Discord (`com.discord`)
- Telegram (`org.telegram`)

---

## Returns

[`SocialDetails`](../type-aliases/SocialDetails.md)[], [`Text`](../interfaces/Text.md)[] - A tuple containing:
- **First element**: Array of social media records with `name` property added
- **Second element**: Array of non-social, non-general text records

## Parameters

- **texts**: [`Text`](../interfaces/Text.md)[] - Array of text records to separate

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts:51](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L51)
