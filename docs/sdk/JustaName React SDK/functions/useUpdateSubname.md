# useUpdateSubname

A React hook for updating subname records including text records, addresses, and content hash.

---

## Usage

```typescript
import { useUpdateSubname } from '@justaname.id/react'

// Basic usage
function UpdateSubnameComponent() {
  const { updateSubname, isLoading, error, data } = useUpdateSubname()
  
  const handleUpdate = async () => {
    try {
      await updateSubname({
        subname: 'alice.justaname.eth',
        records: {
          texts: [
            { key: 'description', value: 'Updated description' }
          ],
          addresses: {
            '60': '0x1234567890abcdef...'
          }
        }
      })
    } catch (err) {
      console.error('Failed to update subname:', err)
    }
  }
  
  return (
    <div>
      <button onClick={handleUpdate} disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Subname'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Subname updated: {data.subname}</p>}
    </div>
  )
}
```

```typescript
// With advanced update management and form handling
function AdvancedUpdateSubnameComponent() {
  const { updateSubname, isLoading, error, data } = useUpdateSubname({
    onSuccess: (result) => {
      console.log('Subname updated successfully:', result)
      // Show success notification
    },
    onError: (error) => {
      console.error('Error updating subname:', error)
      // Show error notification
    }
  })
  
  const [subname, setSubname] = useState('bob.justaname.eth')
  const [textRecords, setTextRecords] = useState([
    { key: 'description', value: '' },
    { key: 'url', value: '' },
    { key: 'email', value: '' }
  ])
  const [addresses, setAddresses] = useState({
    '60': '', // ETH
    '0': ''   // BTC
  })
  const [contentHash, setContentHash] = useState('')
  
  const handleTextRecordChange = (index, field, value) => {
    const updated = [...textRecords]
    updated[index] = { ...updated[index], [field]: value }
    setTextRecords(updated)
  }
  
  const addTextRecord = () => {
    setTextRecords([...textRecords, { key: '', value: '' }])
  }
  
  const removeTextRecord = (index) => {
    setTextRecords(textRecords.filter((_, i) => i !== index))
  }
  
  const handleAddressChange = (coinType, value) => {
    setAddresses(prev => ({ ...prev, [coinType]: value }))
  }
  
  const handleUpdate = async () => {
    if (!subname) return
    
    const records = {
      texts: textRecords.filter(record => record.key && record.value),
      addresses: Object.fromEntries(
        Object.entries(addresses).filter(([_, value]) => value)
      ),
      ...(contentHash && { contentHash: { protocolType: 'ipfs', decoded: contentHash } })
    }
    
    try {
      await updateSubname({
        subname,
        records,
        gasPrice: '20000000000' // Optional gas price
      })
    } catch (err) {
      console.error('Failed to update subname:', err)
    }
  }
  
  return (
    <div className="update-subname">
      <h3>Update Subname Records</h3>
      
      <div className="form-group">
        <label htmlFor="subname">Subname:</label>
        <input
          id="subname"
          type="text"
          placeholder="alice.justaname.eth"
          value={subname}
          onChange={(e) => setSubname(e.target.value)}
        />
      </div>
      
      <div className="records-section">
        <h4>Text Records</h4>
        {textRecords.map((record, index) => (
          <div key={index} className="record-input">
            <input
              type="text"
              placeholder="Key (e.g., description, url, email)"
              value={record.key}
              onChange={(e) => handleTextRecordChange(index, 'key', e.target.value)}
            />
            <input
              type="text"
              placeholder="Value"
              value={record.value}
              onChange={(e) => handleTextRecordChange(index, 'value', e.target.value)}
            />
            <button 
              onClick={() => removeTextRecord(index)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={addTextRecord} className="add-btn">
          Add Text Record
        </button>
      </div>
      
      <div className="addresses-section">
        <h4>Address Records</h4>
        <div className="address-input">
          <label>Ethereum (60):</label>
          <input
            type="text"
            placeholder="0x1234567890abcdef..."
            value={addresses['60']}
            onChange={(e) => handleAddressChange('60', e.target.value)}
          />
        </div>
        <div className="address-input">
          <label>Bitcoin (0):</label>
          <input
            type="text"
            placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
            value={addresses['0']}
            onChange={(e) => handleAddressChange('0', e.target.value)}
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="contentHash">Content Hash (optional):</label>
        <input
          id="contentHash"
          type="text"
          placeholder="QmHash..."
          value={contentHash}
          onChange={(e) => setContentHash(e.target.value)}
        />
      </div>
      
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Updating subname records...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
        </div>
      )}
      
      {data && (
        <div className="success">
          <p>✅ Subname updated successfully!</p>
          <p>Transaction: {data.txHash}</p>
        </div>
      )}
      
      <button 
        onClick={handleUpdate} 
        disabled={isLoading || !subname}
        className="update-btn"
      >
        {isLoading ? 'Updating...' : 'Update Subname'}
      </button>
      
      <div className="info">
        <h4>About Subname Updates</h4>
        <p>Updating subname records allows you to modify the information associated with your subname. This includes:</p>
        <ul>
          <li>Text records for descriptions, URLs, social media, etc.</li>
          <li>Address records for different cryptocurrencies</li>
          <li>Content hash for decentralized content</li>
          <li>All changes are recorded on-chain</li>
        </ul>
      </div>
    </div>
  )
}
```

---

## Returns

[`UseUpdateSubnameResult`](../interfaces/UseUpdateSubnameResult.md) - An object containing:
- `updateSubname`: Function to update the subname records
- `isLoading`: Boolean indicating if the update is in progress
- `error`: Error object if the update failed
- `data`: Result data if the update succeeded

## Parameters

- **params?**: [`UseUpdateSubnameParams`](../interfaces/UseUpdateSubnameParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateSubname.ts:43](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateSubname.ts#L43)
