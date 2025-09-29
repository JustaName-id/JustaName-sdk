# useSetNameHashJustaNameResolver

A React hook for setting the JustaName resolver for ENS names, enabling offchain resolution capabilities.

---

## Usage

```typescript
import { useSetNameHashJustaNameResolver } from '@justaname.id/react'

// Basic usage
function SetResolverComponent() {
  const { 
    setNameHashJustaNameResolver, 
    nameHashJustaNameResolverSet, 
    setNameHashJustaNameResolverPending, 
    setNameHashJustaNameResolverError 
  } = useSetNameHashJustaNameResolver()
  
  const handleSetResolver = async () => {
    try {
      await setNameHashJustaNameResolver({
        nameHash: '0x1234567890abcdef...',
        resolver: '0xabcdef1234567890...'
      })
    } catch (err) {
      console.error('Failed to set resolver:', err)
    }
  }
  
  return (
    <div>
      <button onClick={handleSetResolver} disabled={setNameHashJustaNameResolverPending}>
        {setNameHashJustaNameResolverPending ? 'Setting...' : 'Set Resolver'}
      </button>
      {setNameHashJustaNameResolverError && <p>Error: {setNameHashJustaNameResolverError.message}</p>}
      {nameHashJustaNameResolverSet && <p>Resolver set successfully!</p>}
    </div>
  )
}
```

```typescript
// With advanced parameters and custom types
interface CustomResolverParams {
  nameHash: string
  resolver: string
  gasPrice?: string
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
}

function AdvancedResolverComponent() {
  const { 
    setNameHashJustaNameResolver, 
    nameHashJustaNameResolverSet, 
    setNameHashJustaNameResolverPending, 
    setNameHashJustaNameResolverError 
  } = useSetNameHashJustaNameResolver<CustomResolverParams>()
  
  const [nameHash, setNameHash] = useState('')
  const [resolver, setResolver] = useState('')
  const [gasPrice, setGasPrice] = useState('')
  
  const handleSetResolver = async () => {
    if (!nameHash || !resolver) return
    
    const params: CustomResolverParams = {
      nameHash,
      resolver,
      ...(gasPrice && { gasPrice })
    }
    
    try {
      await setNameHashJustaNameResolver(params)
      // Reset form on success
      setNameHash('')
      setResolver('')
      setGasPrice('')
    } catch (err) {
      console.error('Failed to set resolver:', err)
    }
  }
  
  return (
    <div className="resolver-setup">
      <h3>Set JustaName Resolver</h3>
      
      <div className="form-group">
        <label htmlFor="nameHash">Name Hash:</label>
        <input
          id="nameHash"
          type="text"
          placeholder="0x1234567890abcdef..."
          value={nameHash}
          onChange={(e) => setNameHash(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="resolver">Resolver Address:</label>
        <input
          id="resolver"
          type="text"
          placeholder="0xabcdef1234567890..."
          value={resolver}
          onChange={(e) => setResolver(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="gasPrice">Gas Price (optional):</label>
        <input
          id="gasPrice"
          type="text"
          placeholder="20000000000"
          value={gasPrice}
          onChange={(e) => setGasPrice(e.target.value)}
        />
      </div>
      
      {setNameHashJustaNameResolverPending && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Setting resolver...</p>
        </div>
      )}
      
      {setNameHashJustaNameResolverError && (
        <div className="error">
          <p>❌ Error: {setNameHashJustaNameResolverError.message}</p>
        </div>
      )}
      
      {nameHashJustaNameResolverSet && (
        <div className="success">
          <p>✅ Resolver set successfully!</p>
          <p>Your ENS name can now use JustaName's offchain resolution.</p>
        </div>
      )}
      
      <button 
        onClick={handleSetResolver} 
        disabled={setNameHashJustaNameResolverPending || !nameHash || !resolver}
        className="set-resolver-btn"
      >
        {setNameHashJustaNameResolverPending ? 'Setting Resolver...' : 'Set Resolver'}
      </button>
      
      <div className="info">
        <h4>About JustaName Resolver</h4>
        <p>Setting the JustaName resolver enables your ENS name to use offchain resolution, allowing for more flexible and cost-effective record management.</p>
        <ul>
          <li>Reduces gas costs for record updates</li>
          <li>Enables real-time record changes</li>
          <li>Supports advanced record types</li>
        </ul>
      </div>
    </div>
  )
}
```

---

## Returns

[`UseSetNameHashJustaNameResolver`](../interfaces/UseSetNameHashJustaNameResolver.md)<`T`> - An object containing:
- `setNameHashJustaNameResolver`: Async function to set the JustaName resolver
- `nameHashJustaNameResolverSet`: Boolean indicating if the resolver is set
- `setNameHashJustaNameResolverPending`: Boolean indicating if the operation is in progress
- `setNameHashJustaNameResolverError`: Boolean indicating if an error occurred

## Type Parameters

- **T** = `any` - The type of additional parameters that can be passed to the set JustaName resolver mutation, extending the base request

## Defined in

[packages/@justaname.id/react/src/lib/hooks/resolver/useSetNameHashJustaNameResolver.ts:119](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/resolver/useSetNameHashJustaNameResolver.ts#L119)
