import React, { useEffect, useMemo } from 'react';
import {
  JustaNameContext,
  JustaNameProvider,
  JustaNameProviderConfig,
  useMountedAccount, UseSubnameSession,
  useSubnameSession, useSubnameSignIn,
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
  handleOpenDialog: (open: boolean) => void;
  isOpen: boolean;
}

export const SIWJContext = React.createContext<SIWJContextProps>({
 isOpen: false,
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

  const handleOpenDialog = (_open: boolean) => {
    if (_open !== open) {
      setOpen(_open);
    }
  };

  return (
    <SIWJContext.Provider value={{ handleOpenDialog, isOpen: open }}>
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

export interface UseSignInWithJustaName {
  handleDialog: (open: boolean) => void;
  isOpen: boolean
  signIn: ({ subname }: { subname: string }) => void;
  signOut: () => void;
  status: 'pending' | 'signedIn' | 'signedOut';
  refreshSubnameSession: () => void;
  session: UseSubnameSession['subnameSession'];
}

export const useSignInWithJustaName = (): UseSignInWithJustaName => {
  const context = React.useContext(SIWJContext);
  const justanameContext = React.useContext(JustaNameContext);
  const { signIn, isSignInPending} = useSubnameSignIn();
  const { signOut, isSignOutPending} = useSubnameSignOut();
  const { subnameSession, isSubnameSessionPending, refreshSubnameSession } = useSubnameSession();

  const status = useMemo(() => {
    if(isSignInPending){
      return 'pending';
    }
    if(isSignOutPending){
      return 'pending';
    }
    if(isSubnameSessionPending){
      return 'pending';
    }
    if(subnameSession){
      return 'signedIn';
    }
    return 'signedOut';
  }, [isSignInPending, isSignOutPending, isSubnameSessionPending, subnameSession]);

  if (context === undefined) {
    throw new Error('useSIWJ must be used within a SIWJProvider');
  }

  if (justanameContext === undefined) {
    throw new Error('useSIWJ must be used within a JustaNameProvider');
  }

  return {
    handleDialog: context.handleOpenDialog,
    isOpen: context.isOpen,
    signIn,
    signOut,
    status,
    session: subnameSession,
    refreshSubnameSession
  };
}

const CheckSession: React.FC<{ openOnWalletConnect: boolean, handleOpenDialog: (open: boolean) => void }> = ({ openOnWalletConnect, handleOpenDialog }) => {
  const { subnameSession , isSubnameSessionPending} = useSubnameSession();
  const { signOut } = useSubnameSignOut();
  const {
    address,
    isConnected,
    isDisconnected,
    isConnecting,
    isReconnecting,
    status
  } = useMountedAccount();

  useEffect(() => {
    if (subnameSession && address) {
      if (subnameSession.address !== address) {
        signOut()
        handleOpenDialog(true);
      }
    }
  }, [subnameSession, address]);

  useEffect(() => {
    if (openOnWalletConnect && isConnected && !subnameSession && !isSubnameSessionPending) {
      handleOpenDialog(true);
    }
    if (!isConnected) {
      handleOpenDialog(false);
    }
  }, [isConnected, subnameSession, isSubnameSessionPending, openOnWalletConnect]);

  // setTimeout for the first time and then regular intervals, if it doesn't work try localstorage
  useEffect(() => {
    console.log(isDisconnected, isConnected, isConnecting, isReconnecting, status);
    if(isDisconnected && !isConnecting && !isReconnecting){
      signOut();
      handleOpenDialog(false);
    }
  }, [isDisconnected, isConnecting, isReconnecting]);

  return null;
}