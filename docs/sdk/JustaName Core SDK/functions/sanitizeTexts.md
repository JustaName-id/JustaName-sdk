# sanitizeTexts

Sanitizes and normalizes text record data from various formats into a standardized array of text record objects.

---

## Usage

```typescript
import { sanitizeTexts } from '@justaname.id/sdk'

// Basic usage with object format
const texts = sanitizeTexts({
  description: 'My personal description',
  url: 'https://example.com',
  email: 'contact@example.com'
})
```

```typescript
// With array format
const texts = sanitizeTexts([
  { key: 'description', value: 'My personal description' },
  { key: 'url', value: 'https://example.com' },
  { key: 'email', value: 'contact@example.com' }
])
```

```typescript
// Processing subname text records
function processSubnameTexts(subnameData) {
  const rawTexts = subnameData.records?.texts || {}
  
  // Sanitize the texts
  const sanitizedTexts = sanitizeTexts(rawTexts)
  
  if (!sanitizedTexts) {
    return { texts: [], count: 0 }
  }
  
  // Categorize texts
  const categorized = {
    general: sanitizedTexts.filter(text => 
      !text.key.startsWith('com.') && 
      !text.key.startsWith('org.') && 
      !text.key.startsWith('io.')
    ),
    social: sanitizedTexts.filter(text => 
      text.key.startsWith('com.') || 
      text.key.startsWith('org.') || 
      text.key.startsWith('io.')
    ),
    all: sanitizedTexts
  }
  
  return {
    ...categorized,
    count: sanitizedTexts.length,
    socialCount: categorized.social.length,
    generalCount: categorized.general.length
  }
}

// Usage with subname data
const subnameData = {
  records: {
    texts: {
      description: 'Web3 developer and designer',
      url: 'https://alice.eth',
      email: 'alice@example.com',
      'com.twitter': '@alice_dev',
      'com.github': 'alice-dev',
      'com.discord': 'alice#1234'
    }
  }
}

const processed = processSubnameTexts(subnameData)
console.log('Total texts:', processed.count)
console.log('General texts:', processed.generalCount)
console.log('Social texts:', processed.socialCount)
```

```typescript
// Validating and filtering text records
function validateTextRecords(texts) {
  const sanitized = sanitizeTexts(texts)
  
  if (!sanitized) {
    return { valid: [], invalid: [], errors: ['No text records provided'] }
  }
  
  const valid = []
  const invalid = []
  
  sanitized.forEach(text => {
    try {
      // Basic validation
      if (!text.key || !text.value) {
        invalid.push({ ...text, reason: 'Missing key or value' })
        return
      }
      
      if (text.key.length > 100) {
        invalid.push({ ...text, reason: 'Key too long' })
        return
      }
      
      if (text.value.length > 1000) {
        invalid.push({ ...text, reason: 'Value too long' })
        return
      }
      
      // URL validation for url key
      if (text.key === 'url' && !isValidUrl(text.value)) {
        invalid.push({ ...text, reason: 'Invalid URL format' })
        return
      }
      
      // Email validation for email key
      if (text.key === 'email' && !isValidEmail(text.value)) {
        invalid.push({ ...text, reason: 'Invalid email format' })
        return
      }
      
      valid.push(text)
    } catch (error) {
      invalid.push({ ...text, reason: error.message })
    }
  })
  
  return { valid, invalid, errors: invalid.map(text => text.reason) }
}

function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Usage
const rawTexts = {
  description: 'Valid description',
  url: 'https://example.com',
  email: 'valid@example.com',
  invalidUrl: 'not-a-url',
  invalidEmail: 'not-an-email'
}

const validation = validateTextRecords(rawTexts)
console.log('Valid texts:', validation.valid)
console.log('Invalid texts:', validation.invalid)
```

```typescript
// Building text record display components
function buildTextDisplay(texts) {
  const sanitized = sanitizeTexts(texts)
  
  if (!sanitized || sanitized.length === 0) {
    return { components: [], summary: 'No text records found' }
  }
  
  const components = sanitized.map(text => ({
    key: text.key,
    value: text.value,
    displayKey: formatKeyForDisplay(text.key),
    displayValue: formatValueForDisplay(text.value, text.key),
    type: getTextType(text.key),
    copyText: text.value
  }))
  
  const summary = `${sanitized.length} text record${sanitized.length === 1 ? '' : 's'} found`
  
  return { components, summary }
}

function formatKeyForDisplay(key) {
  // Convert snake_case to Title Case
  return key
    .split('.')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function formatValueForDisplay(value, key) {
  if (key === 'url' && value.startsWith('http')) {
    return value
  }
  if (key === 'email') {
    return value
  }
  if (value.length > 50) {
    return `${value.slice(0, 50)}...`
  }
  return value
}

function getTextType(key) {
  if (key.startsWith('com.') || key.startsWith('org.') || key.startsWith('io.')) {
    return 'social'
  }
  if (['description', 'url', 'email', 'avatar', 'location'].includes(key)) {
    return 'general'
  }
  return 'other'
}

// Usage
const texts = {
  description: 'Blockchain developer with 5+ years experience',
  url: 'https://bob.eth',
  email: 'bob@example.com',
  'com.twitter': '@bob_dev',
  'com.github': 'bob-dev',
  location: 'San Francisco, CA'
}

const display = buildTextDisplay(texts)
console.log(display.summary) // "6 text records found"
console.log(display.components)
// [
//   {
//     key: 'description',
//     value: 'Blockchain developer with 5+ years experience',
//     displayKey: 'Description',
//     displayValue: 'Blockchain developer with 5+ years experience',
//     type: 'general',
//     copyText: 'Blockchain developer with 5+ years experience'
//   },
//   // ... more records
// ]
```

---

## Returns

`undefined` | [`TextRecord`](../interfaces/TextRecord.md)[] - An array of sanitized text record objects or undefined if no valid texts

## Parameters

- **texts**: `undefined` | `Record<string, string>` | [`TextRecord`](../interfaces/TextRecord.md)[] - Text data in various formats

## Defined in

[packages/@justaname.id/sdk/src/lib/utils/transformJsonToRecord/index.ts:3](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/utils/transformJsonToRecord/index.ts#L3)
