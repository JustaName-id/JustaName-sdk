# useSearchSubnames

A React hook for searching subnames with various criteria and pagination support.

---

## Usage

```typescript
import { useSearchSubnames } from '@justaname.id/react'

function SearchSubnamesComponent() {
  const { subnames, isSubnamesLoading, refetchSearchSubnames } = useSearchSubnames({
    name: 'alice',
    chainId: 1,
    skip: 0,
    take: 10
  })
  
  if (isSubnamesLoading) return <div>Searching subnames...</div>
  
  return (
    <div>
      <h3>Search Results</h3>
      {subnames?.domains?.map((domain, index) => (
        <div key={index}>
          <p>Domain: {domain}</p>
        </div>
      ))}
      <button onClick={() => refetchSearchSubnames()}>Refresh</button>
    </div>
  )
}
```

---

## Returns

An object containing:
- `subnames`: Search response object with:
  - `domains`: Array of subname domains found
  - `registered`: Boolean indicating if domains are registered
- `isSubnamesPending`: Boolean indicating if the search is pending
- `isSubnamesFetching`: Boolean indicating if the search is fetching
- `isSubnamesLoading`: Boolean indicating if the search is loading
- `refetchSearchSubnames`: Function to manually refetch the search results

## Parameters

Required parameters:
- `name`: The search query string
- `chainId?`: The chain ID to search on (optional, defaults to provider chain ID)

Optional parameters:
- `skip?`: Number of results to skip (defaults to 0)
- `take?`: Number of results to take (defaults to 10)
- `data?`: Whether to include data (defaults to true)
- `ensRegistered?`: Whether to include ENS registered domains (defaults to false)
- `isClaimed?`: Whether to include claimed domains (defaults to true)
- `enabled?`: Boolean to enable/disable the query (optional, defaults to true)

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useSearchSubnames.ts:37](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useSearchSubnames.ts#L37)