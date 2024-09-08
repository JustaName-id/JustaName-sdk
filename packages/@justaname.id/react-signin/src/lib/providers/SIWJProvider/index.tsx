import React, { useEffect } from 'react';
import {
  JustaNameProvider,
  JustaNameProviderConfig,
  useMountedAccount,
  useSubnameSession,
  useSubnameSignOut
} from '@justaname.id/react';
import { JustaThemeProvider, JustaThemeProviderConfig } from '@justaname.id/react-ui';
import { SIWJDialog } from '../../modal';

export interface SIWJProviderConfig extends JustaNameProviderConfig, JustaThemeProviderConfig {
  openOnWalletConnect?: boolean;
  allowedSubnames: "all" | "platform" | string[];
}

export interface SIWJProviderProps {
  children: React.ReactNode;
  config: SIWJProviderConfig;
}

export interface SIWJContextProps {
  openOnWalletConnect: boolean;
  allowedSubnames: "all" | "platform" | string[];
  handleOpenDialog: (open: boolean) => void;
}

export const SIWJContext = React.createContext<SIWJContextProps>({
  openOnWalletConnect: false,
  allowedSubnames: "all",
  handleOpenDialog: () => {}
});

export const SIWJProvider: React.FC<SIWJProviderProps> = ({
  children,
  config: props
                                                          }) => {
  const openOnWalletConnect = props.openOnWalletConnect || false;
  const allowedSubnames = props.allowedSubnames || "all";

  const [open, setOpen] = React.useState(false);
  const { address } = useMountedAccount();

  const handleOpenDialog = (open: boolean) => {
    setOpen(open);
  };

  return (
    <SIWJContext.Provider value={{ openOnWalletConnect, handleOpenDialog, allowedSubnames }}>
      <JustaNameProvider config={{
        config: props.config,
        backendUrl: props.backendUrl,
        providerUrl: props.providerUrl,
        ensDomain: props.ensDomain,
        routes: props.routes
      }}>
        <JustaThemeProvider color={props.color}>
          {children}
          <CheckSession openOnWalletConnect={openOnWalletConnect} handleOpenDialog={handleOpenDialog} />
          <SIWJDialog open={open} address={address} handleOpenDialog={handleOpenDialog} allowedSubnames={allowedSubnames} />
        </JustaThemeProvider>
      </JustaNameProvider>
    </SIWJContext.Provider>
  );
};

export const useSIWJ = () => {
  const context = React.useContext(SIWJContext);
  if (context === undefined) {
    throw new Error('useSIWJ must be used within a SIWJProvider');
  }
  return context;
}

const CheckSession: React.FC<{ openOnWalletConnect: boolean, handleOpenDialog: (open: boolean) => void }> = ({ openOnWalletConnect, handleOpenDialog }) => {
  const { subnameSession , subnameSessionPending} = useSubnameSession();
  const { signOut } = useSubnameSignOut();
  const { address, isConnected, isDisconnected, isConnecting, isReconnecting } = useMountedAccount();

  useEffect(() => {
    if (subnameSession && address) {
      if (subnameSession.address !== address) {
        signOut()
        handleOpenDialog(true);
      }
    }
  }, [subnameSession, address]);

  useEffect(() => {
    if (openOnWalletConnect && isConnected && !subnameSession && !subnameSessionPending) {
      handleOpenDialog(true);
    }
    if (!isConnected) {
      handleOpenDialog(false);
    }
  }, [isConnected, subnameSession, subnameSessionPending, openOnWalletConnect]);

  useEffect(() => {
    console.log(isDisconnected, isConnecting, isReconnecting);
    if(isDisconnected && !isConnecting && !isReconnecting){
      signOut();
      handleOpenDialog(false);
    }
  }, [isDisconnected, isConnecting, isReconnecting]);

  return null;
}