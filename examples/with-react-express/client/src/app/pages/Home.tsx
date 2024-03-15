import { useAccountSubnames } from '@justaname.id/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';


export const Home = () => {

  const { subnames } = useAccountSubnames();
  console.log(subnames);
  return (
    <div>
      <ConnectButton />
    </div>
  );
}
