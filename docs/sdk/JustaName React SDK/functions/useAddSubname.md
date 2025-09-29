# useAddSubname

A React hook for creating and managing subname creation operations.

---

## Usage

```typescript
import { useAddSubname } from '@justaname.id/react'

// Basic usage
function AddSubnameComponent() {
  const { addSubname, isLoading, error, data } = useAddSubname()
  
  const handleAddSubname = async () => {
    try {
      await addSubname({
        subname: 'alice',
        parentDomain: 'justaname.eth',
        records: {
          texts: [
            { key: 'description', value: 'My subname' }
          ]
        }
      })
    } catch (err) {
      console.error('Failed to add subname:', err)
    }
  }
  
  return (
    <div>
      <button onClick={handleAddSubname} disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Add Subname'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Subname created: {data.subname}</p>}
    </div>
  )
}
```

```typescript
// With parameters and callbacks
function AddSubnameComponent() {
  const { addSubname, isLoading, error, data } = useAddSubname({
    onSuccess: (result) => {
      console.log('Subname created successfully:', result)
      // Redirect or show success message
    },
    onError: (error) => {
      console.error('Error creating subname:', error)
      // Show error message to user
    }
  })
  
  const handleAddSubname = async () => {
    await addSubname({
      subname: 'bob',
      parentDomain: 'justaname.eth',
      records: {
        texts: [
          { key: 'description', value: 'Bob\'s subname' },
          { key: 'url', value: 'https://bob.example.com' }
        ],
        coins: {
          '60': '0x1234567890abcdef...'
        }
      },
      duration: 365 * 24 * 60 * 60, // 1 year in seconds
      price: '1000000000000000000' // 1 ETH in wei
    })
  }
  
  return (
    <div className="add-subname-form">
      <h3>Create New Subname</h3>
      <button 
        onClick={handleAddSubname} 
        disabled={isLoading}
        className="create-button"
      >
        {isLoading ? 'Creating Subname...' : 'Create Subname'}
      </button>
      
      {error && (
        <div className="error-message">
          <p>Error: {error.message}</p>
        </div>
      )}
      
      {data && (
        <div className="success-message">
          <p>✅ Subname created successfully!</p>
          <p>Name: {data.subname}</p>
          <p>Transaction: {data.txHash}</p>
        </div>
      )}
    </div>
  )
}
```

---

## Returns

[`UseAddSubnameResult`](../interfaces/UseAddSubnameResult.md) - An object containing:
- `addSubname`: Function to create a new subname
- `isLoading`: Boolean indicating if the operation is in progress
- `error`: Error object if the operation failed
- `data`: Result data if the operation succeeded

## Parameters

- **params?**: [`UseAddSubnameParams`](../interfaces/UseAddSubnameParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useAddSubname.ts:28](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useAddSubname.ts#L28)
