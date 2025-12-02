# Update Subnames

After claiming a subname, users can enrich their ENS profile by adding records. The `useUpdateSubname` hook allows updating text records (avatar, social handles, bio) and coin addresses (multi-chain wallet addresses).

#### Understanding ENS Records

ENS supports several record types:

* **Text Records**: Key-value pairs for metadata (avatar, description, social links)
* **Coin Addresses**: Wallet addresses for different blockchains
* **Content Hash**: IPFS/IPNS links for decentralized websites

#### Adding Text Records

Common text record keys include:

* `avatar` – Profile picture URL (or NFT reference)
* `description` – Bio or about text
* `com.twitter` – Twitter/X handle
* `com.github` – GitHub username
* `url` – Personal website

```tsx
import { useUpdateSubname } from '@justaname.id/react';

export const UpdateProfile = () => {
  const { updateSubname, isPending } = useUpdateSubname();

  const handleUpdate = async () => {
    await updateSubname({
      username: 'myusername',
      text: [
        { key: 'avatar', value: 'https://example.com/avatar.png' },
        { key: 'description', value: 'Web3 developer and ENS enthusiast' },
        { key: 'com.twitter', value: 'myhandle' },
        { key: 'com.github', value: 'mygithub' },
        { key: 'url', value: 'https://mywebsite.com' },
      ]
    });
  };

  return (
    <button onClick={handleUpdate} disabled={isPending}>
      {isPending ? 'Updating...' : 'Update Profile'}
    </button>
  );
};
```

#### Adding Multi-chain Addresses

ENS supports storing addresses for multiple blockchains using **coin types** defined in SLIP-44 and ENSIP-11. This enables a single ENS name to resolve to different addresses on different chains.

**Understanding Coin Types**

* **SLIP-44 coin types**: Used for non-EVM chains (Bitcoin = 0, Ethereum = 60, Solana = 501)
* **ENSIP-11 coin types**: Used for EVM-compatible chains, derived from the chain ID

Viem provides a `toCoinType` helper that converts EVM chain IDs to the correct ENSIP-11 coin type format.

```tsx
import { useUpdateSubname } from '@justaname.id/react';
import { toCoinType } from 'viem';
import { base, arbitrum, optimism, polygon } from 'viem/chains';

export const UpdateMultichainAddresses = () => {
  const { updateSubname, isPending } = useUpdateSubname();

  const handleUpdate = async () => {
    await updateSubname({
      username: 'myusername',
      coins: [
        // Standard SLIP-44 coin types
        { id: 60, value: '0x1234...5678' },           // Ethereum
        { id: 0, value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },  // Bitcoin
        { id: 501, value: 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK' }, // Solana
        
        // EVM chains using toCoinType (converts chainId to ENSIP-11 format)
        { id: toCoinType(base.id), value: '0xabcd...efgh' },      // Base
        { id: toCoinType(arbitrum.id), value: '0xijkl...mnop' },  // Arbitrum
        { id: toCoinType(optimism.id), value: '0xqrst...uvwx' },  // Optimism
        { id: toCoinType(polygon.id), value: '0x9876...5432' },   // Polygon
      ]
    });
  };

  return (
    <button onClick={handleUpdate} disabled={isPending}>
      {isPending ? 'Updating...' : 'Update Addresses'}
    </button>
  );
};
```

> **Why `toCoinType`?** EVM chains share the same address format, so ENSIP-11 defines a formula to derive coin types from chain IDs: `coinType = 0x80000000 | chainId`. The `toCoinType` function handles this conversion automatically.\
> Learn more about coinType [here](https://docs.ens.domains/ensip/11).
