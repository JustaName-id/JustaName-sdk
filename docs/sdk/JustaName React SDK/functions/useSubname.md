# useSubname

A React hook for fetching detailed information about a specific subname.

---

## Usage

```typescript
import { useSubname } from '@justaname.id/react'

// Basic usage
function SubnameComponent() {
  const { subname, isLoading, error, refetch } = useSubname({
    subname: 'alice',
    parentDomain: 'justaname.eth'
  })
  
  if (isLoading) return <div>Loading subname...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Subname Details</h3>
      <p>Name: {subname?.name}</p>
      <p>Owner: {subname?.owner}</p>
      <p>Status: {subname?.status}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}
```

```typescript
// With advanced parameters and detailed display
function DetailedSubnameComponent() {
  const { subname, isLoading, error, refetch } = useSubname({
    subname: 'bob',
    parentDomain: 'justaname.eth',
    includeRecords: true,
    includeHistory: true,
    onSuccess: (data) => {
      console.log('Subname loaded:', data)
    },
    onError: (error) => {
      console.error('Error loading subname:', error)
    }
  })
  
  return (
    <div className="subname-details">
      <h3>Subname Information</h3>
      
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading subname details...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
          <button onClick={refetch}>Retry</button>
        </div>
      )}
      
      {subname && (
        <div className="subname-info">
          <div className="subname-header">
            <h4>{subname.name}</h4>
            <span className={`status ${subname.status}`}>
              {subname.status}
            </span>
          </div>
          
          <div className="subname-meta">
            <div className="meta-item">
              <strong>Owner:</strong> {subname.owner}
            </div>
            <div className="meta-item">
              <strong>Created:</strong> {subname.createdAt}
            </div>
            <div className="meta-item">
              <strong>Expires:</strong> {subname.expiresAt}
            </div>
            <div className="meta-item">
              <strong>Parent Domain:</strong> {subname.parentDomain}
            </div>
          </div>
          
          {subname.records && (
            <div className="subname-records">
              <h5>Records</h5>
              <div className="records-section">
                <h6>Text Records</h6>
                {subname.records.texts?.map((text, index) => (
                  <div key={index} className="record-item">
                    <strong>{text.key}:</strong> {text.value}
                  </div>
                ))}
              </div>
              
              <div className="records-section">
                <h6>Address Records</h6>
                {subname.records.addresses && Object.entries(subname.records.addresses).map(([coinType, address]) => (
                  <div key={coinType} className="record-item">
                    <strong>Coin Type {coinType}:</strong> {address}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {subname.history && subname.history.length > 0 && (
            <div className="subname-history">
              <h5>History</h5>
              <div className="history-list">
                {subname.history.map((event, index) => (
                  <div key={index} className="history-item">
                    <div className="event-type">{event.type}</div>
                    <div className="event-date">{event.timestamp}</div>
                    <div className="event-description">{event.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="subname-actions">
            <button onClick={refetch} className="refresh-btn">
              Refresh Data
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## Returns

`UseSubnameResult` - An object containing:
- `subname`: Detailed subname information including records and metadata
- `isLoading`: Boolean indicating if the data is being fetched
- `error`: Error object if the operation failed
- `refetch`: Function to manually refetch the subname data

## Parameters

- **params**: `Omit<MakeOptionalProps<SubnameGetBySubnameRequest, "chainId">, never>` - Required parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useSubname.ts:24](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useSubname.ts#L24)
