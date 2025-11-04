# useMountedAccount

A React hook that wraps the `useAccount` hook from wagmi, incorporating a component mount check to prevent state updates on unmounted components.

---

## Usage

```typescript
import { useMountedAccount } from '@justaname.id/react'

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

---

## Returns

An object containing all properties and methods from wagmi's `useAccount` hook, plus:
- `isConnected`: Boolean indicating if the account is connected AND the component is mounted

## Defined in

[packages/@justaname.id/react/src/lib/hooks/account/useMountedAccount.ts:12](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/account/useMountedAccount.ts#L12)