import React from 'react';
import { useAccount } from 'wagmi';
import { ClaimSubname } from './ClaimSubname';

export const ConnectSection: React.FC = () => {
  const { address } = useAccount();

  return (
    <div>
      {
        !address && <p>Connect your wallet to claim your subdomain</p>
      }
      {
        address && <ClaimSubname />
      }
    </div>
  )
}