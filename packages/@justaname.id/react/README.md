# JustaName React SDK

The JustaName React SDK is a powerful tool that allows developers to seamlessly integrate robust digital identity and subnaming features into their React applications. It simplifies the complexities of blockchain addresses by enabling the use of human-readable subdomains within the Ethereum Name Service (ENS).

## Key Features
- **React Hooks**: Simplify your code with React hooks for managing subnames, checking subname availability, and more.
- **Context Providers**: Use the provided context providers to easily access JustaName functionality throughout your application.
- **TypeScript Support**: Benefit from strong typing to catch errors early and understand your code better.

## Installation

```bash
npm install @justaname.id/react
```

## Configuration

Wrap your application with the `JustaNameProvider`:

```jsx
import { JustaNameProvider } from '@justaname.id/react';

function App() {
  return (
    <JustaNameProvider backendUrl="your-backend-url" chainId={1}>
      {/* Your app goes here */}
    </JustaNameProvider>
  );
}

export default App;
```

## Usage Examples

### Check if a Subname is Available

```jsx
import { useIsSubnameAvailable } from '@justaname.id/react';

function MyComponent() {
  const { isAvailable, isLoading } = useIsSubnameAvailable({ username: 'test', ensDomain: 'justaname.id' });

  if (isLoading) return <p>Loading...</p>;
  if (isAvailable) return <p>The subname is available!</p>;
  return <p>The subname is not available.</p>;
}
```

### Claim a Subname

```jsx
import { useAddSubname } from '@justaname.id/react';

function MyComponent() {
  const { addSubname, addSubnamePending } = useAddSubname();

  const handleClaim = async () => {
    try {
      await addSubname({ username: 'test' });
      console.log('Subname claimed successfully!');
    } catch (error) {
      console.error('Failed to claim subname:', error);
    }
  };

  return (
    <button onClick={handleClaim} disabled={claimSubnamePending}>
      Claim Subname
    </button>
  );
}
```

## Core Hooks

The JustaName React SDK provides several hooks to simplify working with JustaName:

- `useJustaName`: Access the JustaName context.
- `useIsSubnameAvailable`: Check if a subname is available.
- `useAddSubname`: Claim a subname.
- `useUpdateSubname`: Update a subname.
- `useSubnameSignature`: Get a signature for a subname.
- `useSubname`: Get information about a subname.
- `useAccountSubnames`: Get all subnames for an account.
- `useMountedAccount`: Get information about the currently mounted account.

## Conclusion

For more detailed documentation and additional use cases, please visit [JustaName's Documentation](https://docs.justaname.io).