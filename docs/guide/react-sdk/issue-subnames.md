# Issue Subnames

Once you've confirmed a subname is available, use `useAddSubname` to claim it. This hook handles the entire claiming flow including wallet signature requests and API communication.

#### How It Works

When `addSubname` is called:

1. The SDK requests a challenge from JustaName's SIWE (Sign-In with Ethereum) endpoint
2. The user signs the challenge message with their wallet
3. The signed message is sent to JustaName to register the subname
4. The subname is immediately available for resolution

#### Signature-Free Onboarding

For a smoother onboarding experience, you can use `overrideSignatureCheck` to issue subnames without requiring the user to sign a message. This is useful when you want to reduce friction during user registration, allowing you to assign subnames instantly without wallet pop-ups.

#### The Hook Returns

* `addSubname`: Async function to trigger the claim
* `isPending`: Boolean indicating if a claim is in progress
* `isSuccess`: Boolean indicating successful completion
* `error`: Any error that occurred during the process

```tsx
import { useAddSubname, useIsSubnameAvailable } from '@justaname.id/react';
import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export const ClaimSubname = () => {
  const { isConnected } = useAccount();
  const [username, setUsername] = useState('');
  const debouncedUsername = useDebounce(username, 500);
  
  const { isSubnameAvailable } = useIsSubnameAvailable({
    username: debouncedUsername
  });
  
  const { addSubname, isPending } = useAddSubname();

  const handleClaim = async () => {
    try {
      const result = await addSubname({ username });
      console.log('Subname claimed:', result);
      // result contains the full subname record
    } catch (error) {
      console.error('Failed to claim subname:', error);
    }
  };

  return (
    <div>
      <h2>Claim your subname</h2>
      <ConnectButton />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button
        onClick={handleClaim}
        disabled={!isSubnameAvailable || !isConnected || !debouncedUsername || isPending}
      >
        {isPending ? 'Claiming...' : 'Claim'}
      </button>
    </div>
  );
};
```
