import { useAddSubname, useIsSubnameAvailable } from '@justaname.id/react';
import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export const AddSubname = () => {
  const { isConnected } = useAccount();
  const [username, setUsername] = useState<string>('');
  const debouncedUsername = useDebounce(username, 500);
  const { isSubnameAvailable } = useIsSubnameAvailable({
    username: debouncedUsername,
  });
  const { addSubname } = useAddSubname();

  return (
    <div>
      <h1>Claim your subdomain</h1>
      <ConnectButton />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter a subdomain"
      />
      <button
        onClick={() =>
          addSubname({
            username,
          })
        }
        disabled={!isSubnameAvailable || !isConnected || !debouncedUsername}
      >
        Claim
      </button>
    </div>
  );
};
