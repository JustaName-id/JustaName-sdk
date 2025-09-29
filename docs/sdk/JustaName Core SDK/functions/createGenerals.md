# createGenerals

Creates general text records by filtering out social media and other specialized text records from a collection of text records.

---

## Usage

```typescript
import { createGenerals } from '@justaname.id/sdk'

// Basic usage
const generalTexts = createGenerals([
  { key: 'description', value: 'My personal description' },
  { key: 'url', value: 'https://example.com' },
  { key: 'email', value: 'contact@example.com' },
  { key: 'com.twitter', value: '@username' },
  { key: 'com.github', value: 'githubuser' }
])
```

```typescript
// Processing subname text records
function processSubnameTexts(records) {
  const allTexts = records.texts || []
  
  // Get general texts (non-social media)
  const generalTexts = createGenerals(allTexts)
  
  // Get social media texts
  const socialTexts = allTexts.filter(text => 
    text.key.startsWith('com.') || 
    text.key.startsWith('org.') ||
    text.key.startsWith('io.')
  )
  
  return {
    general: generalTexts,
    social: socialTexts,
    all: allTexts
  }
}

// Usage with subname data
const subnameData = {
  records: {
    texts: [
      { key: 'description', value: 'Web3 developer and designer' },
      { key: 'url', value: 'https://alice.eth' },
      { key: 'email', value: 'alice@example.com' },
      { key: 'avatar', value: 'https://example.com/avatar.jpg' },
      { key: 'com.twitter', value: '@alice_dev' },
      { key: 'com.github', value: 'alice-dev' },
      { key: 'com.discord', value: 'alice#1234' },
      { key: 'org.telegram', value: '@alice_dev' }
    ]
  }
}

const processedTexts = processSubnameTexts(subnameData.records)
console.log('General texts:', processedTexts.general)
// [
//   { key: 'description', value: 'Web3 developer and designer' },
//   { key: 'url', value: 'https://alice.eth' },
//   { key: 'email', value: 'alice@example.com' },
//   { key: 'avatar', value: 'https://example.com/avatar.jpg' }
// ]

console.log('Social texts:', processedTexts.social)
// [
//   { key: 'com.twitter', value: '@alice_dev' },
//   { key: 'com.github', value: 'alice-dev' },
//   { key: 'com.discord', value: 'alice#1234' },
//   { key: 'org.telegram', value: '@alice_dev' }
// ]
```

```typescript
// Building a profile display
function buildProfileDisplay(texts) {
  const generalTexts = createGenerals(texts)
  
  const profile = {
    description: generalTexts.find(t => t.key === 'description')?.value,
    website: generalTexts.find(t => t.key === 'url')?.value,
    email: generalTexts.find(t => t.key === 'email')?.value,
    avatar: generalTexts.find(t => t.key === 'avatar')?.value,
    location: generalTexts.find(t => t.key === 'location')?.value,
    other: generalTexts.filter(t => 
      !['description', 'url', 'email', 'avatar', 'location'].includes(t.key)
    )
  }
  
  return profile
}

// Usage
const texts = [
  { key: 'description', value: 'Blockchain developer' },
  { key: 'url', value: 'https://bob.eth' },
  { key: 'email', value: 'bob@example.com' },
  { key: 'location', value: 'San Francisco, CA' },
  { key: 'com.twitter', value: '@bob_dev' },
  { key: 'skills', value: 'Solidity, React, TypeScript' }
]

const profile = buildProfileDisplay(texts)
console.log(profile)
// {
//   description: 'Blockchain developer',
//   website: 'https://bob.eth',
//   email: 'bob@example.com',
//   location: 'San Francisco, CA',
//   avatar: undefined,
//   other: [{ key: 'skills', value: 'Solidity, React, TypeScript' }]
// }
```

---

## Returns

[`Text`](../interfaces/Text.md)[] - An array of text records that are considered general (non-social media) records

## Parameters

- **texts**: [`Text`](../interfaces/Text.md)[] - Array of text records to filter

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts:74](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L74)
