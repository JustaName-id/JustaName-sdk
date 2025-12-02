# Reverse Resolution



Reverse resolution is the opposite of forward resolution, instead of looking up an address from a name, you look up the reverse record associated with an address. This is essential for displaying human-readable names in your UI instead of raw addresses.

#### Using useReverseResolve

The useReverseResolve hook handles reverse resolution for Ethereum addresses with ENSIP-19 multichain support:

```tsx
import { useReverseResolve } from '@justaname.id/react';

export const UserIdentity = ({ address }: { address: string }) => {
  const { ensName, isReverseResolveLoading } = useReverseResolve({ address });

  if (isReverseResolveLoading) return <span>Loading...</span>;

  // Display the ENS name if available, otherwise show truncated address
  return (
    <span>
      {ensName || `${address.slice(0, 6)}...${address.slice(-4)}`}
    </span>
  );
};
```

#### Multichain Resolution

The hook uses a three-level fallback strategy for resolution:

1. Try with coinType 0 (default Ethereum)
2. Try with coinType based on chainId (multichain per ENSIP-19)
3. Fallback to JustaName offchain records

```tsx
const { ensName } = useReverseResolve({
  address: '0x1234...abcd',
  chainId: 8453, // Base chain
});
```
