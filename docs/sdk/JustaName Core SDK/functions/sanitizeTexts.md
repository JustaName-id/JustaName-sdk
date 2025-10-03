# sanitizeTexts

Converts text data from object or array format into a standardized array of text record objects.

---

## Usage

```typescript
import { sanitizeTexts } from '@justaname.id/sdk'

// Object format
const texts = sanitizeTexts({
  description: 'My personal description',
  url: 'https://example.com',
  email: 'contact@example.com'
})

console.log(texts)
// [
//   { key: 'description', value: 'My personal description' },
//   { key: 'url', value: 'https://example.com' },
//   { key: 'email', value: 'contact@example.com' }
// ]

// Array format (returns as-is)
const texts2 = sanitizeTexts([
  { key: 'description', value: 'My personal description' },
  { key: 'url', value: 'https://example.com' }
])
```

---

## Returns

`undefined` | [`TextRecord`](../interfaces/TextRecord.md)[] - An array of text record objects with `key` and `value` properties, or undefined if no texts provided

## Parameters

- **texts**: `undefined` | `Record<string, string>` | [`TextRecord`](../interfaces/TextRecord.md)[] - Text data in object or array format

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/transformJsonToRecord/index.ts:3](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/transformJsonToRecord/index.ts#L3)
