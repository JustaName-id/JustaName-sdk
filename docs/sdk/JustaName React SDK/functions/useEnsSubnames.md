# useEnsSubnames

A React hook for fetching ENS subnames with infinite scroll pagination support.

---

## Usage

```typescript
import { useEnsSubnames } from '@justaname.id/react'

// Basic usage
function EnsSubnamesComponent() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useEnsSubnames({
    parentDomain: 'justaname.eth',
    pageSize: 20
  })
  
  if (isLoading) return <div>Loading subnames...</div>
  if (error) return <div>Error: {error.message}</div>
  
  const allSubnames = data?.pages.flatMap(page => page.data) || []
  
  return (
    <div>
      <h3>Subnames for justaname.eth ({allSubnames.length})</h3>
      {allSubnames.map((subname, index) => (
        <div key={index}>
          <p>Name: {subname.name}</p>
          <p>Owner: {subname.owner}</p>
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
// With advanced parameters and filtering
function EnsSubnamesComponent() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useEnsSubnames({
    parentDomain: 'justaname.eth',
    pageSize: 50,
    includeExpired: false,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    onSuccess: (data) => {
      console.log('Subnames loaded:', data)
    },
    onError: (error) => {
      console.error('Error loading subnames:', error)
    }
  })
  
  const allSubnames = data?.pages.flatMap(page => page.data) || []
  
  return (
    <div className="subnames-container">
      <div className="header">
        <h3>ENS Subnames</h3>
        <div className="controls">
          <button onClick={() => refetch()}>Refresh</button>
          <span>Total: {allSubnames.length}</span>
        </div>
      </div>
      
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading subnames...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
          <button onClick={() => refetch()}>Retry</button>
        </div>
      )}
      
      {allSubnames.length > 0 && (
        <div className="subnames-grid">
          {allSubnames.map((subname, index) => (
            <div key={index} className="subname-card">
              <div className="subname-header">
                <h4>{subname.name}</h4>
                <span className={`status ${subname.status}`}>
                  {subname.status}
                </span>
              </div>
              <div className="subname-details">
                <p><strong>Owner:</strong> {subname.owner}</p>
                <p><strong>Created:</strong> {subname.createdAt}</p>
                <p><strong>Expires:</strong> {subname.expiresAt}</p>
                {subname.description && (
                  <p><strong>Description:</strong> {subname.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {hasNextPage && (
        <div className="load-more">
          <button 
            onClick={() => fetchNextPage()} 
            disabled={isFetchingNextPage}
            className="load-more-btn"
          >
            {isFetchingNextPage ? (
              <>
                <div className="spinner"></div>
                Loading more subnames...
              </>
            ) : (
              'Load More Subnames'
            )}
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
- `data`: Paginated data with pages array containing subname objects
- `isLoading`: Boolean indicating if initial data is being fetched
- `error`: Error object if the operation failed
- `fetchNextPage`: Function to load the next page of subnames
- `hasNextPage`: Boolean indicating if more pages are available
- `isFetchingNextPage`: Boolean indicating if next page is being fetched
- `refetch`: Function to manually refetch all data

## Parameters

- **props**: [`UseEnsSubnamesParams`](../interfaces/UseEnsSubnamesParams.md) - Required parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/ens/useEnsSubnames.ts:29](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/ens/useEnsSubnames.ts#L29)
