# Resolution

Resolution is the process of looking up data associated with an ENS name. The `useRecords` hook fetches **all records** for any ENS name in a single call, including text records, coin addresses, and content hash.

#### What You Get

The hook returns a comprehensive `records` object containing:

* `resolverAddress`: The contract handling resolution for this name
* `texts`: Array of all text records (`{ key, value }`)
* `coins`: Array of all coin addresses (`{ id, name, value }`)
* `contentHash`: Decentralized content pointer (IPFS, IPNS, etc.)

This is particularly useful for building profile pages or displaying complete ENS identity information.

tsx

```tsx
import { useRecords } from '@justaname.id/react';

export const ENSProfile = ({ ensName }: { ensName: string }) => {
  const { records, isLoading, error } = useRecords({ ens: ensName });

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile</div>;
  if (!records) return <div>No records found for {ensName}</div>;

  return (
    <div className="ens-profile">
      <h2>{ensName}</h2>
      
      {/* Display avatar if available */}
      {records.texts?.find(t => t.key === 'avatar') && (
        <img 
          src={records.texts.find(t => t.key === 'avatar')?.value} 
          alt="Avatar" 
        />
      )}
      
      {/* Text Records Section */}
      <section>
        <h3>Profile Information</h3>
        {records.texts?.map((text) => (
          <div key={text.key}>
            <strong>{text.key}:</strong> {text.value}
          </div>
        ))}
      </section>
      
      {/* Addresses Section */}
      <section>
        <h3>Wallet Addresses</h3>
        {records.coins?.map((coin) => (
          <div key={coin.id}>
            <strong>{coin.name} (coinType: {coin.id}):</strong>
            <code>{coin.value}</code>
          </div>
        ))}
      </section>
      
      {/* Content Hash */}
      {records.contentHash && (
        <section>
          <h3>Decentralized Website</h3>
          <p>
            <strong>Protocol:</strong> {records.contentHash.protocolType}
          </p>
          <p>
            <strong>Hash:</strong> {records.contentHash.decoded}
          </p>
        </section>
      )}
    </div>
  );
};
```

#### Records Response Structure

```typescript
interface Records {
  resolverAddress: string;
  texts: Array<{ key: string; value: string }>;
  coins: Array<{ 
    id: number;      // Coin type (60 for ETH, 0 for BTC, etc.)
    name: string;    // Human-readable name
    value: string;   // The address
  }>;
  contentHash: {
    protocolType: string;  // 'ipfs', 'ipns', 'bzz', etc.
    decoded: string;       // The actual hash/CID
  } | null;
}
```
