# useMounted

A React hook for tracking whether a component has been mounted, useful for preventing state updates on unmounted components.

---

## Usage

```typescript
import { useMounted } from '@justaname.id/react'

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
// With async operations
function AsyncComponent() {
  const isMounted = useMounted()
  const [data, setData] = useState(null)
  
  const fetchData = async () => {
    try {
      const result = await fetch('/api/data').then(r => r.json())
      
      // Only update state if component is still mounted
      if (isMounted) {
        setData(result)
      }
    } catch (error) {
      if (isMounted) {
        console.error('Error:', error)
      }
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <div>
      <h3>Async Data Component</h3>
      <p>Mounted: {isMounted ? 'Yes' : 'No'}</p>
      {data && <p>Data: {JSON.stringify(data)}</p>}
    </div>
  )
}
```

---

## Returns

`boolean` - A boolean flag indicating whether the component is currently mounted

## Defined in

[packages/@justaname.id/react/src/lib/hooks/account/useMounted.ts:10](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/account/useMounted.ts#L10)