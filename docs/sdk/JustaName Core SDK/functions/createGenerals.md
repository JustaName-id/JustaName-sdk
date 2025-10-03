# createGenerals

Filters text records to return only general profile fields (avatar, banner, header, display, description, url, location).

---

## Usage

```typescript
import { createGenerals } from '@justaname.id/sdk'

// Basic usage
const generalTexts = createGenerals([
  { key: 'description', value: 'My personal description' },
  { key: 'url', value: 'https://example.com' },
  { key: 'email', value: 'contact@example.com' },
  { key: 'avatar', value: 'https://example.com/avatar.jpg' },
  { key: 'com.twitter', value: '@username' }
])

console.log(generalTexts)
// [
//   { key: 'description', value: 'My personal description' },
//   { key: 'url', value: 'https://example.com' },
//   { key: 'email', value: 'contact@example.com' },
//   { key: 'avatar', value: 'https://example.com/avatar.jpg' }
// ]
```

---

## Returns

[`Text`](../interfaces/Text.md)[] - An array of text records with keys: `avatar`, `banner`, `header`, `display`, `description`, `url`, `location`

## Parameters

- **texts**: [`Text`](../interfaces/Text.md)[] - Array of text records to filter

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts:74](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L74)
