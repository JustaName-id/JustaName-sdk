import { useAccount } from 'wagmi';
import { useAccountSubnames, useAddSubname, useIsSubnameAvailable } from '@justaname.id/react';
import React, { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { Subname } from './Subname';

export const ClaimSubname = () => {
  const { address } = useAccount();
  const { subnames } = useAccountSubnames();
  const [username, setUsername] = useState<string>("");
  const debouncedUsername = useDebounce(username, 500);
  const { isAvailable } = useIsSubnameAvailable({
    username: debouncedUsername,
    ensDomain: import.meta.env.VITE_APP_ENS_DOMAIN as string,
  })
  const { addSubname } = useAddSubname();

  return (
    <div>
      {
        subnames.length === 0 ?
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
              disabled={!isAvailable || !address || !debouncedUsername}
            >
              Claim
            </button>
          </>
          :
          <div>
            <h1>My Subdomains</h1>
            <ul>
              {subnames.map((subname) => (
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