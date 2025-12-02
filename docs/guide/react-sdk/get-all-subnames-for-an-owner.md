# Get All Subnames for an Owner

Sometimes you need to fetch all subnames associated with a particular owner, for example, to display a user's complete ENS portfolio or to build admin interfaces for subname management.

#### For the Connected Account

Use `useAccountSubnames` to fetch subnames owned by the currently connected wallet:

tsx

```tsx
import { useAccountSubnames } from '@justaname.id/react';

export const MySubnames = () => {
  const { accountSubnames, isLoading } = useAccountSubnames();

  if (isLoading) return <div>Loading your subnames...</div>;
  
  if (!accountSubnames?.length) {
    return <div>You don't have any subnames yet.</div>;
  }

  return (
    <div>
      <h3>My Subnames ({accountSubnames.length})</h3>
      <ul>
        {accountSubnames.map((subname) => (
          <li key={subname.ens}>
            <strong>{subname.ens}</strong>
            <span>Claimed: {new Date(subname.claimedAt).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

#### For Any Address

Use `useAddressSubnames` when you need to look up subnames for an arbitrary address (not necessarily the connected user):

tsx

```tsx
import { useAddressSubnames } from '@justaname.id/react';

export const AddressSubnames = ({ address }: { address: string }) => {
  const { addressSubnames, isLoading } = useAddressSubnames({ address });

  if (isLoading) return <div>Loading subnames...</div>;

  return (
    <div>
      <h3>Subnames for {address.slice(0, 6)}...{address.slice(-4)}</h3>
      
      {addressSubnames?.length === 0 && (
        <p>No subnames found for this address.</p>
      )}
      
      {addressSubnames?.map((item) => (
        <div key={item.ensSubname.ens} className="subname-card">
          <h4>{item.ensSubname.ens}</h4>
          <p>Parent Domain: {item.ensDomain}</p>
          <p>Total subnames under this domain: {item.subnameCount}</p>
          {item.ensSubname.isClaimed && (
            <p>Claimed: {new Date(item.ensSubname.claimedAt).toLocaleDateString()}</p>
          )}
        </div>
      ))}
    </div>
  );
};
```

#### Response Structure

The `useAddressSubnames` hook returns data grouped by parent domain:

typescript

```typescript
interface AddressSubnameItem {
  ensDomain: string;        // Parent domain (e.g., "yourdomain.eth")
  subnameCount: number;     // Total subnames under this domain
  ensSubname: {
    ens: string;            // Full subname (e.g., "user.yourdomain.eth")
    isClaimed: boolean;
    claimedAt: string;      // ISO date string
    isJAN: boolean;         // Is it a JustaName subname?
    records: Records;       // Full record set
  };
}
```
