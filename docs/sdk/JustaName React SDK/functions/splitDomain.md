# splitDomain

Splits a domain string into its subdomain and parent domain parts.

---

## Usage

```typescript
import { splitDomain } from '@justaname.id/react'

// Basic usage
const [subdomain, parentDomain] = splitDomain('alice.justaname.eth')
```

```typescript
// With different domain formats
const [subdomain, parentDomain] = splitDomain('bob.example.eth')
// Returns: ['bob', 'example.eth']

const [subdomain, parentDomain] = splitDomain('test.subdomain.justaname.eth')
// Returns: ['test', 'subdomain.justaname.eth']
```

---

## Returns

[`string`, `string`] - A tuple containing:
- **First element**: The subdomain part
- **Second element**: The parent domain part

## Parameters

- **domain**: `string` - The domain string to split

## Defined in

[packages/@justaname.id/react/src/lib/helpers/splitDomain/index.ts:1](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/helpers/splitDomain/index.ts#L1)
