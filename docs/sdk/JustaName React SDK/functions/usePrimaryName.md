# usePrimaryName

A React hook for managing and interacting with primary ENS names for connected accounts.

---

## Usage

```typescript
import { usePrimaryName } from '@justaname.id/react'

// Basic usage
function PrimaryNameComponent() {
  const { primaryName, isLoading, error, refetch } = usePrimaryName()
  
  if (isLoading) return <div>Loading primary name...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Primary Name</h3>
      <p>Name: {primaryName || 'No primary name set'}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}
```

```typescript
// With primary name management
function PrimaryNameManagementComponent() {
  const { 
    primaryName, 
    isLoading, 
    error, 
    setPrimaryName, 
    clearPrimaryName,
    refetch 
  } = usePrimaryName({
    onSuccess: (name) => {
      console.log('Primary name updated:', name)
    },
    onError: (error) => {
      console.error('Error managing primary name:', error)
    }
  })
  
  const [newPrimaryName, setNewPrimaryName] = useState('')
  const [isSetting, setIsSetting] = useState(false)
  
  const handleSetPrimaryName = async () => {
    if (!newPrimaryName) return
    
    setIsSetting(true)
    try {
      await setPrimaryName(newPrimaryName)
      setNewPrimaryName('')
    } catch (err) {
      console.error('Failed to set primary name:', err)
    } finally {
      setIsSetting(false)
    }
  }
  
  const handleClearPrimaryName = async () => {
    try {
      await clearPrimaryName()
    } catch (err) {
      console.error('Failed to clear primary name:', err)
    }
  }
  
  return (
    <div className="primary-name-management">
      <h3>Primary Name Management</h3>
      
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading primary name...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
          <button onClick={refetch}>Retry</button>
        </div>
      )}
      
      <div className="current-primary-name">
        <h4>Current Primary Name</h4>
        <div className="name-display">
          {primaryName ? (
            <div className="name-info">
              <span className="name">{primaryName}</span>
              <button 
                onClick={handleClearPrimaryName}
                className="clear-btn"
              >
                Clear
              </button>
            </div>
          ) : (
            <p className="no-name">No primary name set</p>
          )}
        </div>
      </div>
      
      <div className="set-primary-name">
        <h4>Set New Primary Name</h4>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter ENS name (e.g., alice.eth)"
            value={newPrimaryName}
            onChange={(e) => setNewPrimaryName(e.target.value)}
            className="name-input"
          />
          <button 
            onClick={handleSetPrimaryName}
            disabled={!newPrimaryName || isSetting}
            className="set-btn"
          >
            {isSetting ? 'Setting...' : 'Set Primary Name'}
          </button>
        </div>
      </div>
      
      <div className="info">
        <p><strong>Note:</strong> Setting a primary name will make it the default display name for your account across all applications.</p>
      </div>
    </div>
  )
}
```

---

## Returns

[`UsePrimaryNameResult`](../interfaces/UsePrimaryNameResult.md) - An object containing:
- `primaryName`: The current primary ENS name for the account
- `isLoading`: Boolean indicating if the operation is in progress
- `error`: Error object if the operation failed
- `setPrimaryName`: Function to set a new primary name
- `clearPrimaryName`: Function to clear the current primary name
- `refetch`: Function to manually refetch the primary name

## Parameters

- **params?**: [`UsePrimaryNameParams`](../interfaces/UsePrimaryNameParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/primaryName/usePrimaryName.ts:35](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/primaryName/usePrimaryName.ts#L35)
