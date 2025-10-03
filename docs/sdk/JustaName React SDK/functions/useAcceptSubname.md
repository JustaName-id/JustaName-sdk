# useAcceptSubname

A React hook for accepting subname invitations and managing the acceptance process.

---

## Usage

```typescript
import { useAcceptSubname } from '@justaname.id/react'

function AcceptSubnameComponent() {
  const { acceptSubname, isAcceptSubnamePending } = useAcceptSubname()
  
  const handleAccept = async () => {
    try {
      const result = await acceptSubname({
        ens: 'alice.justaname.eth',
        addresses: [{ coinType: '60', address: '0x1234...' }],
        text: [{ key: 'description', value: 'My subname' }]
      })
      console.log('Subname accepted:', result)
    } catch (error) {
      console.error('Error accepting subname:', error)
    }
  }
  
  return (
    <button onClick={handleAccept} disabled={isAcceptSubnamePending}>
      {isAcceptSubnamePending ? 'Accepting...' : 'Accept Subname'}
    </button>
  )
}
```

---

## Returns

[`UseAcceptSubnameResult`](../interfaces/UseAcceptSubnameResult.md) - An object containing:
- `acceptSubname`: Function that returns a `Records` object with `sanitizedRecords` property
- `isAcceptSubnamePending`: Boolean indicating if the operation is in progress

## Parameters

- **params?**: [`UseAcceptSubnameParams`](../type-aliases/UseAcceptSubnameParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useAcceptSubname.ts:27](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useAcceptSubname.ts#L27)
