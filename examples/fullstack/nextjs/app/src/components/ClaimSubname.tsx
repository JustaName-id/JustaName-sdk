'use client'
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
    ensDomain: process.env.NEXT_PUBLIC_ENS_DOMAIN as string,
  })
  const { claimSubname } = useClaimSubname();

  return (
    <div>
      {
        subnames.length === 0 ?
          <>
            <h1 className='text-base font-semibold text-center'>Claim your first subdomain</h1>
            <input
              value={subname}
              className='border border-gray-300 rounded-md p-2 w-full my-2'
              onChange={(e) => setSubname(e.target.value)}
              placeholder="Enter a subdomain" />
            <button
              onClick={() => claimSubname({
                subname,

              })}
              disabled={!isAvailable || !address || !debouncedSubname}
              className='bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed text-white rounded-md p-2 w-full my-2'
            >
              Claim
            </button>
          </>
          :
          <div>
            <h1 className='text-base font-semibold text-center'>My Subdomains</h1>
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