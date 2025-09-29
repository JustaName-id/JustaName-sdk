# useSearchSubnames

A React hook for searching and filtering subnames with various criteria and pagination support.

---

## Usage

```typescript
import { useSearchSubnames } from '@justaname.id/react'

// Basic usage
function SearchSubnamesComponent() {
  const { subnames, isLoading, error, refetch } = useSearchSubnames({
    query: 'alice',
    parentDomain: 'justaname.eth'
  })
  
  if (isLoading) return <div>Searching subnames...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h3>Search Results</h3>
      {subnames?.map((subname, index) => (
        <div key={index}>
          <p>Name: {subname.name}</p>
          <p>Owner: {subname.owner}</p>
        </div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}
```

```typescript
// With advanced search and filtering
function AdvancedSearchComponent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [parentDomain, setParentDomain] = useState('justaname.eth')
  const [status, setStatus] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  
  const { 
    subnames, 
    isLoading, 
    error, 
    totalCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch 
  } = useSearchSubnames({
    query: searchQuery,
    parentDomain,
    status: status === 'all' ? undefined : status,
    sortBy,
    sortOrder,
    pageSize: 20,
    onSuccess: (data) => {
      console.log('Search results loaded:', data)
    },
    onError: (error) => {
      console.error('Search error:', error)
    }
  })
  
  const handleSearch = () => {
    refetch()
  }
  
  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }
  
  return (
    <div className="search-subnames">
      <h3>Search Subnames</h3>
      
      <div className="search-filters">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search subnames..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        <div className="filter-controls">
          <select 
            value={parentDomain} 
            onChange={(e) => setParentDomain(e.target.value)}
          >
            <option value="justaname.eth">justaname.eth</option>
            <option value="example.eth">example.eth</option>
          </select>
          
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="pending">Pending</option>
          </select>
          
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">Created Date</option>
            <option value="name">Name</option>
            <option value="owner">Owner</option>
          </select>
          
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
      
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching subnames...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
          <button onClick={refetch}>Retry</button>
        </div>
      )}
      
      {subnames && (
        <div className="search-results">
          <div className="results-header">
            <h4>Search Results ({totalCount || subnames.length})</h4>
            <button onClick={refetch} className="refresh-btn">
              Refresh
            </button>
          </div>
          
          <div className="subnames-grid">
            {subnames.map((subname, index) => (
              <div key={index} className="subname-card">
                <div className="subname-header">
                  <h5>{subname.name}</h5>
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
                <div className="subname-actions">
                  <button className="view-btn">View Details</button>
                  <button className="contact-btn">Contact Owner</button>
                </div>
              </div>
            ))}
          </div>
          
          {hasNextPage && (
            <div className="load-more">
              <button 
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
                className="load-more-btn"
              >
                {isFetchingNextPage ? (
                  <>
                    <div className="spinner"></div>
                    Loading more...
                  </>
                ) : (
                  'Load More Results'
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

---

## Returns

`UseSearchSubnamesResult` - An object containing:
- `subnames`: Array of subname search results
- `isLoading`: Boolean indicating if the search is in progress
- `error`: Error object if the search failed
- `totalCount`: Total number of results available
- `hasNextPage`: Boolean indicating if more results are available
- `fetchNextPage`: Function to load the next page of results
- `isFetchingNextPage`: Boolean indicating if next page is being fetched
- `refetch`: Function to manually refetch the search results

## Parameters

- **params**: [`UseSearchSubnamesParams`](../interfaces/UseSearchSubnamesParams.md) - Required parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useSearchSubnames.ts:35](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useSearchSubnames.ts#L35)
