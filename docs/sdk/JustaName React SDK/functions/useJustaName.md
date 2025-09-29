# useJustaName

A React hook for accessing the JustaName context and service instance within components.

---

## Usage

```typescript
import { useJustaName } from '@justaname.id/react'

// Basic usage
function MyComponent() {
  const { justaname, config, isConnected } = useJustaName()
  
  const handleAction = async () => {
    if (justaname && isConnected) {
      // Use the justaname service instance
      const result = await justaname.someMethod()
      console.log('Result:', result)
    }
  }
  
  return (
    <div>
      <h3>JustaName Service</h3>
      <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
      <p>RPC URL: {config?.rpcUrl}</p>
      <button onClick={handleAction} disabled={!isConnected}>
        Perform Action
      </button>
    </div>
  )
}
```

```typescript
// With error handling and service methods
function AdvancedComponent() {
  const { justaname, config, isConnected, error } = useJustaName()
  
  const handleGetSubname = async () => {
    try {
      if (!justaname) {
        throw new Error('JustaName service not available')
      }
      
      const subname = await justaname.subnames.getSubname({
        subname: 'alice',
        parentDomain: 'justaname.eth'
      })
      
      console.log('Subname data:', subname)
    } catch (err) {
      console.error('Error fetching subname:', err)
    }
  }
  
  const handleCreateSubname = async () => {
    try {
      if (!justaname) {
        throw new Error('JustaName service not available')
      }
      
      const result = await justaname.subnames.createSubname({
        subname: 'bob',
        parentDomain: 'justaname.eth',
        records: {
          texts: [
            { key: 'description', value: 'My subname' }
          ]
        }
      })
      
      console.log('Subname created:', result)
    } catch (err) {
      console.error('Error creating subname:', err)
    }
  }
  
  return (
    <div className="justaname-service">
      <h3>JustaName Service Integration</h3>
      
      <div className="service-info">
        <p><strong>Status:</strong> {isConnected ? 'Connected' : 'Disconnected'}</p>
        <p><strong>RPC URL:</strong> {config?.rpcUrl || 'Not configured'}</p>
        <p><strong>Chain ID:</strong> {config?.chainId || 'Not set'}</p>
        {error && <p className="error">Error: {error.message}</p>}
      </div>
      
      <div className="actions">
        <button 
          onClick={handleGetSubname} 
          disabled={!isConnected || !justaname}
          className="action-btn"
        >
          Get Subname
        </button>
        
        <button 
          onClick={handleCreateSubname} 
          disabled={!isConnected || !justaname}
          className="action-btn"
        >
          Create Subname
        </button>
      </div>
      
      {!isConnected && (
        <div className="warning">
          <p>⚠️ JustaName service is not connected. Make sure you're using this hook within a JustaNameProvider.</p>
        </div>
      )}
    </div>
  )
}
```

---

## Returns

[`JustaNameContextProps`](../interfaces/JustaNameContextProps.md) - The context value containing:
- `justaname`: JustaName service instance for API calls
- `config`: Configuration object with RPC URL, chain ID, etc.
- `isConnected`: Boolean indicating if the service is connected
- `error`: Error object if there's a connection issue

## Throws

If the hook is used outside a JustaNameProvider, it will throw an error.

## Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:180](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L180)
