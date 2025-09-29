# JustaNameProvider

Provides JustaName context to child components, allowing them to access and interact with the JustaName service.

---

## Usage

```typescript
import { JustaNameProvider } from '@justaname.id/react'

// Basic usage
function App() {
  return (
    <JustaNameProvider config={{ rpcUrl: 'https://mainnet.infura.io/v3/your-key' }}>
      <YourAppComponents />
    </JustaNameProvider>
  )
}
```

```typescript
// With additional configuration
function App() {
  return (
    <JustaNameProvider 
      config={{ 
        rpcUrl: 'https://mainnet.infura.io/v3/your-key',
        chainId: 1,
        contractAddress: '0x...'
      }}
    >
      <YourAppComponents />
    </JustaNameProvider>
  )
}
```

> **Note**: For working with subname data, consider using [`sanitizeRecords`](../../JustaName%20Core%20SDK/functions/sanitizeRecords.md) to transform raw response data into a structured format.

---

## Returns

`ReactNode` - The provider component wrapping children.

## Parameters

- **props**: [`JustaNameProviderProps`](../interfaces/JustaNameProviderProps.md) - The props for the JustaNameProvider component
- **deprecatedLegacyContext?**: `any` - **Deprecated** - See [React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods)

## Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:84](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L84)
