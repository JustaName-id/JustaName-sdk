import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ConnectSection } from "../components/ConnectSection";
import '../utils/rainbowkit/polyfill';

export default function Index() {

  return (
    <div className="flex flex-col items-center pt-[20vh] h-[100vh]">
      <div className="p-10 rounded-[25px] flex flex-col items-center gap-5 shadow-lg ">
        <h1 className="text-[20px] font-bold"> Welcome to {process.env.NEXT_PUBLIC_ENS_DOMAIN} community</h1>
        <ConnectButton showBalance={false} chainStatus={'none'} accountStatus={'address'} />
        <ConnectSection />
      </div>
    </div>
  );
}
