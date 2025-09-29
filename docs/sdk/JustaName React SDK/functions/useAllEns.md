# useAllEns

A React hook for fetching all ENS names with infinite scroll pagination support.

---

## Usage

```typescript
import { useAllEns } from '@justaname.id/react'

// Basic usage
function AllEnsComponent() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useAllEns({
    pageSize: 20
  })
  
  if (isLoading) return <div>Loading ENS names...</div>
  if (error) return <div>Error: {error.message}</div>
  
  const allEnsNames = data?.pages.flatMap(page => page.data) || []
  
  return (
    <div>
      <h3>All ENS Names ({allEnsNames.length})</h3>
      {allEnsNames.map((ens, index) => (
        <div key={index}>
          <p>Name: {ens.name}</p>
          <p>Address: {ens.address}</p>
        </div>
      ))}
      {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()} 
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  )
}
```

```typescript
// With advanced parameters
function AllEnsComponent() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useAllEns({
    pageSize: 50,
    enabled: true,
    onSuccess: (data) => {
      console.log('ENS names loaded:', data)
    },
    onError: (error) => {
      console.error('Error loading ENS names:', error)
    }
  })
  
  const allEnsNames = data?.pages.flatMap(page => page.data) || []
  
  return (
    <div className="ens-list">
      <div className="header">
        <h3>All ENS Names</h3>
        <button onClick={() => refetch()}>Refresh</button>
      </div>
      
      {isLoading && <p>Loading initial data...</p>}
      {error && <p>Error: {error.message}</p>}
      
      <div className="ens-grid">
        {allEnsNames.map((ens, index) => (
          <div key={index} className="ens-card">
            <h4>{ens.name}</h4>
            <p>Address: {ens.address}</p>
            <p>Expires: {ens.expiryDate}</p>
            <p>Registrant: {ens.registrant}</p>
          </div>
        ))}
      </div>
      
      {hasNextPage && (
        <div className="load-more">
          <button 
            onClick={() => fetchNextPage()} 
            disabled={isFetchingNextPage}
            className="load-more-btn"
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More Names'}
          </button>
        </div>
      )}
    </div>
  )
}
```

---

## Returns

`UseInfiniteQueryResult<InfiniteData<object, unknown>, Error>` - An infinite query result containing:
- `data`: Paginated data with pages array
- `isLoading`: Boolean indicating if initial data is being fetched
- `error`: Error object if the operation failed
- `fetchNextPage`: Function to load the next page
- `hasNextPage`: Boolean indicating if more pages are available
- `isFetchingNextPage`: Boolean indicating if next page is being fetched
- `refetch`: Function to manually refetch all data

## Parameters

- **params**: [`UseAllEnsParams`](../interfaces/UseAllEnsParams.md) - Required parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/ens/useAllEns.ts:22](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/ens/useAllEns.ts#L22)
