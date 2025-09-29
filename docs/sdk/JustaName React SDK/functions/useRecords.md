# useRecords

A React hook for fetching and managing ENS records (text records, addresses, content hash) for a given ENS name.

---

## Usage

```typescript
import { useRecords } from '@justaname.id/react'

// Basic usage
function RecordsComponent() {
  const { records, isLoading, error, refetch } = useRecords({
    ensName: 'alice.eth'
  })
  
  if (isLoading) return <div>Loading records...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Records for alice.eth</h3>
      <div>
        <h4>Text Records</h4>
        {records?.texts?.map((text, index) => (
          <div key={index}>
            <strong>{text.key}:</strong> {text.value}
          </div>
        ))}
      </div>
      <div>
        <h4>Addresses</h4>
        {records?.addresses && Object.entries(records.addresses).map(([coinType, address]) => (
          <div key={coinType}>
            <strong>{coinType}:</strong> {address}
          </div>
        ))}
      </div>
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}
```

```typescript
// With record management and editing
function RecordManagementComponent() {
  const { 
    records, 
    isLoading, 
    error, 
    updateRecords, 
    refetch 
  } = useRecords({
    ensName: 'bob.eth',
    onSuccess: (records) => {
      console.log('Records loaded:', records)
    },
    onError: (error) => {
      console.error('Error loading records:', error)
    }
  })
  
  const [editingText, setEditingText] = useState(false)
  const [newTextRecord, setNewTextRecord] = useState({ key: '', value: '' })
  const [isUpdating, setIsUpdating] = useState(false)
  
  const handleAddTextRecord = async () => {
    if (!newTextRecord.key || !newTextRecord.value) return
    
    setIsUpdating(true)
    try {
      const updatedTexts = [
        ...(records?.texts || []),
        newTextRecord
      ]
      
      await updateRecords({
        texts: updatedTexts
      })
      
      setNewTextRecord({ key: '', value: '' })
      setEditingText(false)
    } catch (err) {
      console.error('Failed to add text record:', err)
    } finally {
      setIsUpdating(false)
    }
  }
  
  const handleRemoveTextRecord = async (keyToRemove) => {
    setIsUpdating(true)
    try {
      const updatedTexts = (records?.texts || []).filter(text => text.key !== keyToRemove)
      
      await updateRecords({
        texts: updatedTexts
      })
    } catch (err) {
      console.error('Failed to remove text record:', err)
    } finally {
      setIsUpdating(false)
    }
  }
  
  return (
    <div className="records-management">
      <h3>ENS Records Management</h3>
      <p>Managing records for: <strong>bob.eth</strong></p>
      
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading records...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
          <button onClick={refetch}>Retry</button>
        </div>
      )}
      
      {records && (
        <div className="records-display">
          <div className="text-records">
            <div className="section-header">
              <h4>Text Records</h4>
              <button 
                onClick={() => setEditingText(!editingText)}
                className="edit-btn"
              >
                {editingText ? 'Cancel' : 'Add Record'}
              </button>
            </div>
            
            {editingText && (
              <div className="add-record-form">
                <input
                  type="text"
                  placeholder="Key (e.g., description, url, email)"
                  value={newTextRecord.key}
                  onChange={(e) => setNewTextRecord(prev => ({ ...prev, key: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={newTextRecord.value}
                  onChange={(e) => setNewTextRecord(prev => ({ ...prev, value: e.target.value }))}
                />
                <button 
                  onClick={handleAddTextRecord}
                  disabled={!newTextRecord.key || !newTextRecord.value || isUpdating}
                >
                  {isUpdating ? 'Adding...' : 'Add Record'}
                </button>
              </div>
            )}
            
            <div className="records-list">
              {records.texts?.map((text, index) => (
                <div key={index} className="record-item">
                  <div className="record-content">
                    <strong>{text.key}:</strong> {text.value}
                  </div>
                  <button 
                    onClick={() => handleRemoveTextRecord(text.key)}
                    className="remove-btn"
                    disabled={isUpdating}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="address-records">
            <h4>Address Records</h4>
            <div className="addresses-list">
              {records.addresses && Object.entries(records.addresses).map(([coinType, address]) => (
                <div key={coinType} className="address-item">
                  <strong>Coin Type {coinType}:</strong> {address}
                </div>
              ))}
            </div>
          </div>
          
          {records.contentHash && (
            <div className="content-hash">
              <h4>Content Hash</h4>
              <p><strong>Protocol:</strong> {records.contentHash.protocolType}</p>
              <p><strong>Hash:</strong> {records.contentHash.decoded}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

---

## Returns

[`UseRecordsResult`](../interfaces/UseRecordsResult.md) - An object containing:
- `records`: The ENS records object containing texts, addresses, and content hash
- `isLoading`: Boolean indicating if the records are being fetched
- `error`: Error object if the operation failed
- `updateRecords`: Function to update the records
- `refetch`: Function to manually refetch the records

## Parameters

- **params?**: [`UseRecordsParams`](../interfaces/UseRecordsParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts:52](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts#L52)
