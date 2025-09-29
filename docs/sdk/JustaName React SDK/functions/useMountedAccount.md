# useMountedAccount

A React hook that wraps the `useAccount` hook from wagmi, incorporating a component mount check to prevent state updates on unmounted components.

---

## Usage

```typescript
import { useMountedAccount } from '@justaname.id/react'

// Basic usage
function AccountComponent() {
  const { address, isConnected, isConnecting, connector } = useMountedAccount()
  
  return (
    <div>
      <h3>Account Information</h3>
      <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
      <p>Connecting: {isConnecting ? 'Yes' : 'No'}</p>
      {address && <p>Address: {address}</p>}
      {connector && <p>Connector: {connector.name}</p>}
    </div>
  )
}
```

```typescript
// With safe async operations
function SafeAccountComponent() {
  const { address, isConnected, isConnecting, connector, status } = useMountedAccount()
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const fetchBalance = async () => {
    if (!isConnected || !address) return
    
    setLoading(true)
    try {
      // Simulate balance fetch
      const result = await new Promise(resolve => 
        setTimeout(() => resolve('1.5 ETH'), 1000)
      )
      
      // The hook ensures this only runs if component is mounted
      setBalance(result)
    } catch (error) {
      console.error('Error fetching balance:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    if (isConnected) {
      fetchBalance()
    }
  }, [isConnected, address])
  
  return (
    <div className="account-dashboard">
      <h3>Account Dashboard</h3>
      
      <div className="account-info">
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Connected:</strong> {isConnected ? '✅' : '❌'}</p>
        <p><strong>Connecting:</strong> {isConnecting ? '🔄' : '⏸️'}</p>
        {address && <p><strong>Address:</strong> {address}</p>}
        {connector && <p><strong>Wallet:</strong> {connector.name}</p>}
      </div>
      
      {isConnected && (
        <div className="balance-section">
          <h4>Balance</h4>
          {loading ? (
            <p>Loading balance...</p>
          ) : (
            <p>{balance || 'No balance data'}</p>
          )}
          <button onClick={fetchBalance} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Balance'}
          </button>
        </div>
      )}
      
      {!isConnected && !isConnecting && (
        <div className="connect-prompt">
          <p>Please connect your wallet to view account information</p>
        </div>
      )}
    </div>
  )
}
```

---

## Returns

`object` - An enhanced account object that includes all properties and methods from `useAccount`, along with an improved `isConnected` boolean that also takes the component's mount state into consideration.

## Defined in

[packages/@justaname.id/react/src/lib/hooks/account/useMountedAccount.ts:12](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/account/useMountedAccount.ts#L12)
