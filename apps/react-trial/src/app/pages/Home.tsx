import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { ClaimSubname } from '../components/ClaimSubname';


export const Home = () => {
  const { address } = useAccount();
  return (
    <div>
      <h1> Welcome to {import.meta.env.VITE_APP_ENS_DOMAIN} community</h1>
      {
        !address && <p>Connect your wallet to claim your subdomain</p>
      }
      <ConnectButton />

      {
        address && <ClaimSubname />
      }
    </div>
  );
}

