# useAddSubname

A React hook for creating new subnames with records and addresses.

---

## Usage

```typescript
import { useAddSubname } from '@justaname.id/react'

function AddSubnameComponent() {
  const { addSubname, isAddSubnamePending } = useAddSubname()
  
  const handleAddSubname = async () => {
    try {
      const result = await addSubname({
        username: 'alice',
        ensDomain: 'justaname.eth',
        chainId: 1,
        text: [
          { key: 'description', value: 'My subname' },
          { key: 'url', value: 'https://alice.example.com' }
        ],
        addresses: [
          { address: '0x1234567890abcdef1234567890abcdef12345678', coinType: 60 }
        ],
        contentHash: 'ipfs://QmHash1234567890abcdef'
      })
      
      console.log('Subname created:', result)
    } catch (error) {
      console.error('Failed to add subname:', error)
    }
  }
  
  return (
    <button onClick={handleAddSubname} disabled={isAddSubnamePending}>
      {isAddSubnamePending ? 'Creating...' : 'Add Subname'}
    </button>
  )
}
```

---

## Returns

[`UseAddSubnameResult`](../interfaces/UseAddSubnameResult.md) - An object containing:
- `addSubname`: Function to create a new subname
- `isAddSubnamePending`: Boolean indicating if the operation is in progress

## Parameters

- **params?**: [`UseAddSubnameParams`](../interfaces/UseAddSubnameParams.md) - Optional configuration parameters including `backendUrl`, `addSubnameRoute`, `ensDomain`, `chainId`, `addresses`, `text`, `contentHash`, `apiKey`

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useAddSubname.ts:28](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useAddSubname.ts#L28)
