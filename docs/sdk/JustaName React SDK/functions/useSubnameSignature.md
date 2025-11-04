# useSubnameSignature

A React hook for managing subname signature operations and authentication.

---

## Usage

```typescript
import { useSubnameSignature } from '@justaname.id/react'

function SubnameSignatureComponent() {
  const { getSignature, isSubnameSignaturePending } = useSubnameSignature()
  
  const handleGetSignature = async () => {
    try {
      const signatureData = await getSignature()
      console.log('Signature:', signatureData.signature)
      console.log('Message:', signatureData.message)
      console.log('Address:', signatureData.address)
      console.log('Expires:', signatureData.expirationTime)
    } catch (err) {
      console.error('Failed to get signature:', err)
    }
  }
  
  return (
    <button onClick={handleGetSignature} disabled={isSubnameSignaturePending}>
      {isSubnameSignaturePending ? 'Signing...' : 'Get Signature'}
    </button>
  )
}
```

---

## Returns

An object containing:
- `getSignature`: Function that returns a promise with signature data:
  - `signature`: The signature string
  - `message`: The message that was signed
  - `address`: The address that signed
  - `expirationTime`: When the signature expires
- `isSubnameSignaturePending`: Boolean indicating if signing is in progress
- `isSubnameSignatureFetching`: Boolean indicating if fetching is in progress

## Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:172](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L172)