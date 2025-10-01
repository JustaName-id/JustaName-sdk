# useAllEns

A React hook for fetching ENS domains with subname counts using infinite scroll pagination.

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
    orderBy: 'subnameCount',
    orderDirection: 'desc'
  })
  
  if (isLoading) return <div>Loading ENS domains...</div>
  if (error) return <div>Error: {error.message}</div>
  
  const allEnsDomains = data?.pages.flatMap(page => page.data) || []
  
  return (
    <div>
      <h3>ENS Domains ({allEnsDomains.length})</h3>
      {allEnsDomains.map((domain, index) => (
        <div key={index}>
          <p>Domain: {domain.ensDomain}</p>
          <p>Subname Count: {domain.subnameCount}</p>
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
// With custom ordering and chain
function AllEnsComponent() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useAllEns({
    orderBy: 'createdAt',
    orderDirection: 'asc',
    chainId: 1,
    enabled: true
  })
  
  const allEnsDomains = data?.pages.flatMap(page => page.data) || []
  
  return (
    <div className="ens-list">
      <h3>ENS Domains by Creation Date</h3>
      
      {isLoading && <p>Loading initial data...</p>}
      {error && <p>Error: {error.message}</p>}
      
      <div className="ens-grid">
        {allEnsDomains.map((domain, index) => (
          <div key={index} className="ens-card">
            <h4>{domain.ensDomain}</h4>
            <p>Subname Count: {domain.subnameCount}</p>
            <p>Records: {domain.ensSubname.records ? 'Available' : 'None'}</p>
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
            {isFetchingNextPage ? 'Loading more...' : 'Load More Domains'}
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
- `data`: Paginated data with pages array containing ENS domains and subname counts
- `isLoading`: Boolean indicating if initial data is being fetched
- `error`: Error object if the operation failed
- `fetchNextPage`: Function to load the next page
- `hasNextPage`: Boolean indicating if more pages are available
- `isFetchingNextPage`: Boolean indicating if next page is being fetched

## Parameters

- **params**: [`UseAllEnsParams`](../interfaces/UseAllEnsParams.md) - Required parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/ens/useAllEns.ts:22](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/ens/useAllEns.ts#L22)
