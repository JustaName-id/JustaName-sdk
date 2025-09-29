# createSocialsAndOthers

Separates social media records from other text records, providing structured social media details and remaining text records.

---

## Usage

```typescript
import { createSocialsAndOthers } from '@justaname.id/sdk'

// Basic usage
const [socials, others] = createSocialsAndOthers([
  { key: 'description', value: 'My personal description' },
  { key: 'com.twitter', value: '@username' },
  { key: 'com.github', value: 'githubuser' },
  { key: 'url', value: 'https://example.com' }
])
```

```typescript
// Processing subname social records
function processSocialRecords(texts) {
  const [socials, others] = createSocialsAndOthers(texts)
  
  // Group socials by platform
  const socialByPlatform = socials.reduce((acc, social) => {
    const platform = social.platform
    if (!acc[platform]) acc[platform] = []
    acc[platform].push(social)
    return acc
  }, {})
  
  return {
    socials,
    others,
    byPlatform: socialByPlatform,
    socialCount: socials.length,
    otherCount: others.length
  }
}

// Usage with subname data
const subnameData = {
  records: {
    texts: [
      { key: 'description', value: 'Web3 developer and designer' },
      { key: 'url', value: 'https://alice.eth' },
      { key: 'email', value: 'alice@example.com' },
      { key: 'com.twitter', value: '@alice_dev' },
      { key: 'com.github', value: 'alice-dev' },
      { key: 'com.discord', value: 'alice#1234' },
      { key: 'org.telegram', value: '@alice_dev' },
      { key: 'io.lens', value: 'alice.lens' },
      { key: 'location', value: 'San Francisco, CA' }
    ]
  }
}

const processed = processSocialRecords(subnameData.records.texts)
console.log('Social records:', processed.socials)
// [
//   { platform: 'twitter', key: 'com.twitter', value: '@alice_dev', ... },
//   { platform: 'github', key: 'com.github', value: 'alice-dev', ... },
//   { platform: 'discord', key: 'com.discord', value: 'alice#1234', ... },
//   { platform: 'telegram', key: 'org.telegram', value: '@alice_dev', ... },
//   { platform: 'lens', key: 'io.lens', value: 'alice.lens', ... }
// ]

console.log('Other records:', processed.others)
// [
//   { key: 'description', value: 'Web3 developer and designer' },
//   { key: 'url', value: 'https://alice.eth' },
//   { key: 'email', value: 'alice@example.com' },
//   { key: 'location', value: 'San Francisco, CA' }
// ]

console.log('By platform:', processed.byPlatform)
// {
//   twitter: [{ platform: 'twitter', key: 'com.twitter', value: '@alice_dev', ... }],
//   github: [{ platform: 'github', key: 'com.github', value: 'alice-dev', ... }],
//   discord: [{ platform: 'discord', key: 'com.discord', value: 'alice#1234', ... }],
//   telegram: [{ platform: 'telegram', key: 'org.telegram', value: '@alice_dev', ... }],
//   lens: [{ platform: 'lens', key: 'io.lens', value: 'alice.lens', ... }]
// }
```

```typescript
// Building a social media profile
function buildSocialProfile(texts) {
  const [socials, others] = createSocialsAndOthers(texts)
  
  const socialProfile = {
    platforms: socials.map(social => ({
      name: social.platform,
      displayName: social.displayName,
      url: social.url,
      username: social.value,
      verified: social.verified || false
    })),
    otherInfo: others.reduce((acc, text) => {
      acc[text.key] = text.value
      return acc
    }, {}),
    totalPlatforms: socials.length
  }
  
  return socialProfile
}

// Usage
const texts = [
  { key: 'description', value: 'Blockchain developer' },
  { key: 'com.twitter', value: '@bob_dev' },
  { key: 'com.github', value: 'bob-dev' },
  { key: 'com.linkedin', value: 'bob-developer' },
  { key: 'url', value: 'https://bob.eth' },
  { key: 'email', value: 'bob@example.com' }
]

const profile = buildSocialProfile(texts)
console.log(profile)
// {
//   platforms: [
//     { name: 'twitter', displayName: 'Twitter', url: 'https://twitter.com/bob_dev', username: '@bob_dev', verified: false },
//     { name: 'github', displayName: 'GitHub', url: 'https://github.com/bob-dev', username: 'bob-dev', verified: false },
//     { name: 'linkedin', displayName: 'LinkedIn', url: 'https://linkedin.com/in/bob-developer', username: 'bob-developer', verified: false }
//   ],
//   otherInfo: {
//     description: 'Blockchain developer',
//     url: 'https://bob.eth',
//     email: 'bob@example.com'
//   },
//   totalPlatforms: 3
// }
```

---

## Returns

[`SocialDetails`](../type-aliases/SocialDetails.md)[], [`Text`](../interfaces/Text.md)[] - A tuple containing:
- **First element**: Array of social media records with platform details
- **Second element**: Array of non-social media text records

## Parameters

- **texts**: [`Text`](../interfaces/Text.md)[] - Array of text records to separate

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts:51](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/sanitizeRecords/index.ts#L51)
