import { useAccount } from 'wagmi';
import { useAccountSubnames, useAddSubname, useIsSubnameAvailable } from '@justaname.id/react';
import React, { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { Subname } from './Subname';

export const ClaimSubname = () => {
  const { address } = useAccount();
  const { accountSubnames } = useAccountSubnames();
  const [username, setUsername] = useState<string>("");
  const debouncedUsername = useDebounce(username, 500);
  const { isSubnameAvailable } = useIsSubnameAvailable({
    username: debouncedUsername,
  })
  const { addSubname } = useAddSubname();

  return (
    <div>
      {
        accountSubnames.length === 0 ?
          <>
            <h1>Claim your first subdomain</h1>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a subdomain" />
            <button
              onClick={() => addSubname({
                username,
              })}
              disabled={!isSubnameAvailable || !address || !debouncedUsername}
            >
              Claim
            </button>
          </>
          :
          <div>
            <h1>My Subdomains</h1>
            <ul>
              {accountSubnames.map((subname) => (
                <React.Fragment key={subname.subname}>
                  <Subname currentSubname={subname.subname} />
                </React.Fragment>
              ))}
            </ul>
          </div>
      }
    </div>
  )
}