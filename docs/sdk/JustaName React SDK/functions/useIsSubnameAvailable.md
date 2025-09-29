# useIsSubnameAvailable

A React hook for checking if a subname is available for registration.

---

## Usage

```typescript
import { useIsSubnameAvailable } from '@justaname.id/react'

// Basic usage
function SubnameAvailabilityComponent() {
  const { isAvailable, isLoading, error, refetch } = useIsSubnameAvailable({
    subname: 'alice',
    parentDomain: 'justaname.eth'
  })
  
  if (isLoading) return <div>Checking availability...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Subname Availability</h3>
      <p>alice.justaname.eth is {isAvailable ? 'available' : 'not available'}</p>
      <button onClick={refetch}>Check Again</button>
    </div>
  )
}
```

```typescript
// With advanced parameters and real-time checking
function SubnameAvailabilityComponent() {
  const [subname, setSubname] = useState('')
  const [parentDomain, setParentDomain] = useState('justaname.eth')
  
  const { isAvailable, isLoading, error, refetch } = useIsSubnameAvailable({
    subname,
    parentDomain,
    enabled: subname.length > 0,
    onSuccess: (available) => {
      console.log(`Subname ${subname}.${parentDomain} is ${available ? 'available' : 'taken'}`)
    },
    onError: (error) => {
      console.error('Error checking availability:', error)
    }
  })
  
  const handleSubnameChange = (e) => {
    setSubname(e.target.value)
  }
  
  return (
    <div className="availability-checker">
      <h3>Check Subname Availability</h3>
      
      <div className="input-group">
        <input
          type="text"
          value={subname}
          onChange={handleSubnameChange}
          placeholder="Enter subname"
          className="subname-input"
        />
        <span className="domain-suffix">.{parentDomain}</span>
      </div>
      
      {isLoading && (
        <div className="checking">
          <div className="spinner"></div>
          <p>Checking availability...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
          <button onClick={refetch}>Retry</button>
        </div>
      )}
      
      {!isLoading && !error && subname && (
        <div className={`availability-result ${isAvailable ? 'available' : 'taken'}`}>
          <div className="status-indicator">
            {isAvailable ? '✅' : '❌'}
          </div>
          <div className="status-text">
            <h4>
              {subname}.{parentDomain}
            </h4>
            <p>
              {isAvailable 
                ? 'This subname is available for registration!' 
                : 'This subname is already taken'
              }
            </p>
          </div>
          <button onClick={refetch} className="refresh-btn">
            Refresh
          </button>
        </div>
      )}
    </div>
  )
}
```

---

## Returns

[`UseIsSubnameAvailableResult`](../interfaces/UseIsSubnameAvailableResult.md) - An object containing:
- `isAvailable`: Boolean indicating if the subname is available
- `isLoading`: Boolean indicating if the availability check is in progress
- `error`: Error object if the check failed
- `refetch`: Function to manually recheck availability

## Parameters

- **params**: [`UseIsSubnameAvailableParams`](../interfaces/UseIsSubnameAvailableParams.md) - Required parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useIsSubnameAvailable.ts:26](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useIsSubnameAvailable.ts#L26)
