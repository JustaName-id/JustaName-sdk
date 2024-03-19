import { useAccount } from 'wagmi';
import { useAccountSubnames, useClaimSubname, useIsSubnameAvailable } from '@justaname.id/react';
import React, { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { Subname } from './Subname';

export const ClaimSubname = () => {
  const { address } = useAccount();
  const { subnames } = useAccountSubnames();
  const [subname, setSubname] = useState<string>("");
  const debouncedSubname = useDebounce(subname, 500);
  const { isAvailable } = useIsSubnameAvailable({
    subname: debouncedSubname,
    ensDomain: import.meta.env.VITE_APP_ENS_DOMAIN as string,
  })
  const { claimSubname } = useClaimSubname();

  return (
    <div>
      {
        subnames.length === 0 ?
          <>
            <h1>Claim your first subdomain</h1>
            <input
              value={subname}
              onChange={(e) => setSubname(e.target.value)}
              placeholder="Enter a subdomain" />
            <button
              onClick={() => claimSubname({
                username: subname,
              })}
              disabled={!isAvailable || !address || !debouncedSubname}
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