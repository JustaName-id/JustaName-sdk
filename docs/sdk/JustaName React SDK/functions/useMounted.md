# useMounted

A React hook for tracking whether a component has been mounted, useful for preventing state updates on unmounted components.

---

## Usage

```typescript
import { useMounted } from '@justaname.id/react'

// Basic usage
function MyComponent() {
  const isMounted = useMounted()
  
  return (
    <div>
      <h3>Component Status</h3>
      <p>Mounted: {isMounted ? 'Yes' : 'No'}</p>
    </div>
  )
}
```

```typescript
// With async operations and cleanup
function AsyncComponent() {
  const isMounted = useMounted()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const fetchData = async () => {
    setLoading(true)
    try {
      // Simulate async operation
      const result = await new Promise(resolve => 
        setTimeout(() => resolve('Data loaded'), 2000)
      )
      
      // Only update state if component is still mounted
      if (isMounted) {
        setData(result)
        setLoading(false)
      }
    } catch (error) {
      if (isMounted) {
        console.error('Error:', error)
        setLoading(false)
      }
    }
  }
  
  useEffect(() => {
    fetchData()
    
    // Cleanup function
    return () => {
      console.log('Component will unmount')
    }
  }, [])
  
  return (
    <div className="async-component">
      <h3>Async Data Component</h3>
      <p>Mounted: {isMounted ? '✅' : '❌'}</p>
      
      {loading && <p>Loading data...</p>}
      {data && <p>Data: {data}</p>}
      
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
    </div>
  )
}
```

```typescript
// With custom hook for safe async operations
function useSafeAsync() {
  const isMounted = useMounted()
  
  const safeSetState = useCallback((setter) => {
    if (isMounted) {
      setter()
    }
  }, [isMounted])
  
  const safeAsyncOperation = useCallback(async (operation) => {
    try {
      const result = await operation()
      safeSetState(() => {
        // This will only execute if component is still mounted
        console.log('Operation completed:', result)
      })
      return result
    } catch (error) {
      safeSetState(() => {
        console.error('Operation failed:', error)
      })
      throw error
    }
  }, [safeSetState])
  
  return { safeAsyncOperation, isMounted }
}

function AdvancedComponent() {
  const { safeAsyncOperation, isMounted } = useSafeAsync()
  const [result, setResult] = useState(null)
  
  const handleAsyncAction = async () => {
    await safeAsyncOperation(async () => {
      const data = await fetch('/api/data').then(r => r.json())
      setResult(data)
      return data
    })
  }
  
  return (
    <div>
      <h3>Safe Async Operations</h3>
      <p>Component mounted: {isMounted ? 'Yes' : 'No'}</p>
      {result && <p>Result: {JSON.stringify(result)}</p>}
      <button onClick={handleAsyncAction}>
        Perform Safe Async Action
      </button>
    </div>
  )
}
```

---

## Returns

`boolean` - A boolean flag indicating whether the component is currently mounted

## Defined in

[packages/@justaname.id/react/src/lib/hooks/account/useMounted.ts:10](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/account/useMounted.ts#L10)
