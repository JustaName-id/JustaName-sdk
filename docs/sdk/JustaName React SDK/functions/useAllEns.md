# useAllEns

A React hook for fetching ENS domains with subname counts using infinite scroll pagination.

---

## Usage

```typescript
import { useAllEns } from '@justaname.id/react'

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
    orderDirection: 'desc',
    chainId: 1
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
          <p>Records: {domain.ensSubname.sanitizedRecords ? 'Available' : 'None'}</p>
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

`UseInfiniteQueryResult<InfiniteData<{ data: { ensDomain: string; subnameCount: number; ensSubname: Records }[]; pagination: Pagination }, unknown>, Error>` - An infinite query result containing:
- `data`: Paginated data with pages array containing ENS domains and subname counts
- `isLoading`: Boolean indicating if initial data is being fetched
- `error`: Error object if the operation failed
- `fetchNextPage`: Function to load the next page
- `hasNextPage`: Boolean indicating if more pages are available
- `isFetchingNextPage`: Boolean indicating if next page is being fetched

## Parameters

- **params**: [`UseAllEnsParams`](../interfaces/UseAllEnsParams.md) - Configuration parameters including `orderBy`, `orderDirection`, `chainId`

## Defined in

[packages/@justaname.id/react/src/lib/hooks/ens/useAllEns.ts:24](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/ens/useAllEns.ts#L24)
