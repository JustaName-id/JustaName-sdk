# useEnsSubnames

A React hook for fetching ENS subnames with infinite scroll pagination support.

---

## Usage

```typescript
import { useEnsSubnames } from '@justaname.id/react'

function EnsSubnamesComponent() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useEnsSubnames({
    ensDomain: 'justaname.eth',
    isClaimed: true,
    chainId: 1,
    limit: 20
  })
  
  if (isLoading) return <div>Loading subnames...</div>
  if (error) return <div>Error: {error.message}</div>
  
  const allSubnames = data?.pages.flatMap(page => page.data) || []
  
  return (
    <div>
      <h3>Subnames for justaname.eth ({allSubnames.length})</h3>
      {allSubnames.map((subname, index) => (
        <div key={index}>
          <p>ENS: {subname.ens}</p>
          <p>Is JAN: {subname.isJAN ? 'Yes' : 'No'}</p>
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

---

## Returns

An infinite query result containing:
- `data`: Paginated data with pages array containing Records objects
- `isLoading`: Boolean indicating if initial data is being fetched
- `error`: Error object if the operation failed
- `fetchNextPage`: Function to load the next page of subnames
- `hasNextPage`: Boolean indicating if more pages are available
- `isFetchingNextPage`: Boolean indicating if next page is being fetched
- `refetch`: Function to manually refetch all data

## Parameters

Required parameters:
- `ensDomain`: The ENS domain to fetch subnames for (e.g., 'justaname.eth')
- `isClaimed`: Boolean indicating whether to fetch claimed or unclaimed subnames

Optional parameters:
- `chainId?`: The chain ID to use (optional, defaults to provider chain ID)
- `page?`: Starting page number (optional, defaults to 1)
- `limit?`: Number of items per page (optional, defaults to 20)
- `initialLimit?`: Initial limit for first page (optional)
- `enabled?`: Boolean to enable/disable the query (optional, defaults to true)

## Defined in

[packages/@justaname.id/react/src/lib/hooks/ens/useEnsSubnames.ts:32](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/ens/useEnsSubnames.ts#L32)