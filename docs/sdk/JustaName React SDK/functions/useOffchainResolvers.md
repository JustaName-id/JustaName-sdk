# useOffchainResolvers

A React hook for managing and interacting with offchain resolvers for ENS names.

---

## Usage

```typescript
import { useOffchainResolvers } from '@justaname.id/react'

// Basic usage
function OffchainResolversComponent() {
  const { resolvers, isLoading, error, refetch } = useOffchainResolvers()
  
  if (isLoading) return <div>Loading resolvers...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Offchain Resolvers</h3>
      {resolvers?.map((resolver, index) => (
        <div key={index}>
          <p>Resolver: {resolver.name}</p>
          <p>URL: {resolver.url}</p>
        </div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}
```

```typescript
// With resolver management
function ResolverManagementComponent() {
  const { 
    resolvers, 
    isLoading, 
    error, 
    addResolver, 
    removeResolver, 
    updateResolver,
    refetch 
  } = useOffchainResolvers()
  
  const [newResolver, setNewResolver] = useState({
    name: '',
    url: '',
    description: ''
  })
  
  const handleAddResolver = async () => {
    try {
      await addResolver(newResolver)
      setNewResolver({ name: '', url: '', description: '' })
    } catch (err) {
      console.error('Failed to add resolver:', err)
    }
  }
  
  const handleRemoveResolver = async (resolverId) => {
    try {
      await removeResolver(resolverId)
    } catch (err) {
      console.error('Failed to remove resolver:', err)
    }
  }
  
  return (
    <div className="resolver-management">
      <h3>Offchain Resolver Management</h3>
      
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading resolvers...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
          <button onClick={refetch}>Retry</button>
        </div>
      )}
      
      <div className="add-resolver">
        <h4>Add New Resolver</h4>
        <div className="form-group">
          <input
            type="text"
            placeholder="Resolver name"
            value={newResolver.name}
            onChange={(e) => setNewResolver(prev => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="url"
            placeholder="Resolver URL"
            value={newResolver.url}
            onChange={(e) => setNewResolver(prev => ({ ...prev, url: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Description"
            value={newResolver.description}
            onChange={(e) => setNewResolver(prev => ({ ...prev, description: e.target.value }))}
          />
          <button onClick={handleAddResolver} disabled={!newResolver.name || !newResolver.url}>
            Add Resolver
          </button>
        </div>
      </div>
      
      <div className="resolvers-list">
        <h4>Current Resolvers ({resolvers?.length || 0})</h4>
        {resolvers?.map((resolver) => (
          <div key={resolver.id} className="resolver-card">
            <div className="resolver-info">
              <h5>{resolver.name}</h5>
              <p><strong>URL:</strong> {resolver.url}</p>
              {resolver.description && (
                <p><strong>Description:</strong> {resolver.description}</p>
              )}
              <p><strong>Status:</strong> {resolver.status}</p>
            </div>
            <div className="resolver-actions">
              <button 
                onClick={() => handleRemoveResolver(resolver.id)}
                className="remove-btn"
              >
                Remove
              </button>
              <button 
                onClick={() => updateResolver(resolver.id, { ...resolver, status: 'active' })}
                className="update-btn"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Returns

`UseOffchainResolversResult` - An object containing:
- `resolvers`: Array of offchain resolver configurations
- `isLoading`: Boolean indicating if the data is being fetched
- `error`: Error object if the operation failed
- `addResolver`: Function to add a new resolver
- `removeResolver`: Function to remove a resolver
- `updateResolver`: Function to update an existing resolver
- `refetch`: Function to manually refetch the data

## Defined in

[packages/@justaname.id/react/src/lib/hooks/offchainResolver/useOffchainResolvers.ts:12](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/offchainResolver/useOffchainResolvers.ts#L12)
