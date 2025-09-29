# useUpdateChanges

A React hook for detecting and managing changes in subname records, including text records, addresses, and content hash.

---

## Usage

```typescript
import { useUpdateChanges } from '@justaname.id/react'

// Basic usage
function UpdateChangesComponent() {
  const { 
    changedTextRecords, 
    changedAddresses, 
    changedContentHash,
    isLoading, 
    error 
  } = useUpdateChanges({
    subname: 'alice.justaname.eth',
    currentRecords: {
      texts: [{ key: 'description', value: 'Old description' }],
      addresses: { '60': '0x123...' }
    },
    newRecords: {
      texts: [{ key: 'description', value: 'New description' }],
      addresses: { '60': '0x456...' }
    }
  })
  
  if (isLoading) return <div>Analyzing changes...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Detected Changes</h3>
      <p>Text Records Changed: {changedTextRecords?.length || 0}</p>
      <p>Addresses Changed: {changedAddresses?.length || 0}</p>
      <p>Content Hash Changed: {changedContentHash ? 'Yes' : 'No'}</p>
    </div>
  )
}
```

```typescript
// With advanced change management and preview
function AdvancedUpdateChangesComponent() {
  const { 
    changedTextRecords, 
    changedAddresses, 
    changedContentHash,
    hasChanges,
    isLoading, 
    error,
    applyChanges,
    resetChanges
  } = useUpdateChanges({
    subname: 'bob.justaname.eth',
    currentRecords: {
      texts: [
        { key: 'description', value: 'Bob\'s old description' },
        { key: 'url', value: 'https://old-bob.com' }
      ],
      addresses: { 
        '60': '0x1234567890abcdef...',
        '0': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
      },
      contentHash: {
        protocolType: 'ipfs',
        decoded: 'QmOldHash...'
      }
    },
    newRecords: {
      texts: [
        { key: 'description', value: 'Bob\'s new description' },
        { key: 'url', value: 'https://new-bob.com' },
        { key: 'email', value: 'bob@example.com' }
      ],
      addresses: { 
        '60': '0xabcdef1234567890...',
        '0': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
      },
      contentHash: {
        protocolType: 'ipfs',
        decoded: 'QmNewHash...'
      }
    },
    onSuccess: (changes) => {
      console.log('Changes detected:', changes)
    },
    onError: (error) => {
      console.error('Error analyzing changes:', error)
    }
  })
  
  const handleApplyChanges = async () => {
    try {
      await applyChanges()
      console.log('Changes applied successfully')
    } catch (err) {
      console.error('Failed to apply changes:', err)
    }
  }
  
  return (
    <div className="update-changes">
      <h3>Subname Update Changes</h3>
      
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Analyzing changes...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
        </div>
      )}
      
      {hasChanges ? (
        <div className="changes-detected">
          <h4>Changes Detected</h4>
          
          {changedTextRecords && changedTextRecords.length > 0 && (
            <div className="changes-section">
              <h5>Text Records Changes ({changedTextRecords.length})</h5>
              <div className="changes-list">
                {changedTextRecords.map((change, index) => (
                  <div key={index} className="change-item">
                    <div className="change-key">{change.key}</div>
                    <div className="change-value">{change.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {changedAddresses && changedAddresses.length > 0 && (
            <div className="changes-section">
              <h5>Address Changes ({changedAddresses.length})</h5>
              <div className="changes-list">
                {changedAddresses.map((address, index) => (
                  <div key={index} className="change-item">
                    <div className="change-address">{address}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {changedContentHash && (
            <div className="changes-section">
              <h5>Content Hash Change</h5>
              <div className="change-item">
                <div className="change-hash">{changedContentHash}</div>
              </div>
            </div>
          )}
          
          <div className="changes-actions">
            <button 
              onClick={handleApplyChanges}
              className="apply-btn"
              disabled={isLoading}
            >
              Apply Changes
            </button>
            <button 
              onClick={resetChanges}
              className="reset-btn"
            >
              Reset Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="no-changes">
          <p>No changes detected between current and new records.</p>
        </div>
      )}
      
      <div className="info">
        <h4>About Change Detection</h4>
        <p>This hook helps you identify what has changed between your current subname records and new records before applying updates. It detects:</p>
        <ul>
          <li>New, modified, or removed text records</li>
          <li>Address changes for different coin types</li>
          <li>Content hash updates</li>
          <li>Overall change summary</li>
        </ul>
      </div>
    </div>
  )
}
```

---

## Returns

[`UseUpdateChangesResult`](../interfaces/UseUpdateChangesResult.md) - An object containing:
- `changedTextRecords`: Array of changed text records
- `changedAddresses`: Array of changed addresses
- `changedContentHash`: Changed content hash if any
- `hasChanges`: Boolean indicating if any changes were detected
- `isLoading`: Boolean indicating if the analysis is in progress
- `error`: Error object if the operation failed
- `applyChanges`: Function to apply the detected changes
- `resetChanges`: Function to reset the changes

## Parameters

- **params?**: [`UseUpdateChangesParams`](../interfaces/UseUpdateChangesParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L48)
