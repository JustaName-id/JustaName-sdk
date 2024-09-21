import { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';
import {
  JustaNameContext,
  JustaNameProvider,
  JustaNameProviderConfig,
  useMountedAccount,
  useEnsAuth,
  useEnsSignIn,
  useEnsSignOut,
  UseEnsAuthReturn, EnsSignInParams
} from '@justaname.id/react';
import { JustaThemeProvider, JustaThemeProviderConfig } from '@justaname.id/react-ui';
import { SIWENSDialog } from '../../dialogs';
import { UseMutateAsyncFunction } from '@tanstack/react-query';

export interface SIWENSProviderConfig extends JustaNameProviderConfig, JustaThemeProviderConfig {
  openOnWalletConnect?: boolean;
  allowedEns: "all" | "platform" | string[];
}

export interface SIWENSProviderProps {
  children: React.ReactNode;
  config: SIWENSProviderConfig;
}

export interface SIWENSContextProps {
  handleOpenSignInDialog: (open: boolean) => void;
  isSignInOpen: boolean;
}

export const SIWENSContext = createContext<SIWENSContextProps>({
  isSignInOpen: false,
  handleOpenSignInDialog: () => { }
});

export const SIWENSProvider: FC<SIWENSProviderProps> = ({
  children,
  config: props
}) => {
  const openOnWalletConnect = props.openOnWalletConnect || false;
  const allowedEns = props.allowedEns || "all";

  const { isConnected } = useMountedAccount()
  const [signInOpen, setSignInOpen] = useState(false);

  const handleOpenSignInDialog = (open: boolean) => {
    if(!isConnected){
      return;
    }
    if (open !== signInOpen) {
      setSignInOpen(open);
    }
  }

  return (
    <SIWENSContext.Provider value={{ handleOpenSignInDialog, isSignInOpen: signInOpen }}>
      <JustaNameProvider config={{
        config: props.config,
        backendUrl: props.backendUrl,
        providerUrl: props.providerUrl,
        ensDomain: props.ensDomain,
        routes: props.routes
      }}>
        <JustaThemeProvider color={props.color}>
          {children}
          <CheckSession openOnWalletConnect={openOnWalletConnect} handleOpenDialog={handleOpenSignInDialog}/>
          <SIWENSDialog open={signInOpen} handleOpenDialog={handleOpenSignInDialog} allowedEns={allowedEns} />
        </JustaThemeProvider>
      </JustaNameProvider>
    </SIWENSContext.Provider>
  );
};

export interface UseSignInWithEns {
  handleOpenSignInDialog: (open: boolean) => void;
  isSignInOpen: boolean
  signIn: UseMutateAsyncFunction<string, Error, EnsSignInParams, unknown>
  signOut: () => void;
  status: 'pending' | 'signedIn' | 'signedOut';
  refreshEnsAuth: () => void;
  connectedEns: UseEnsAuthReturn['connectedEns'];
}

export const useSignInWithEns = (): UseSignInWithEns => {
  const context = useContext(SIWENSContext);
  const justanameContext = useContext(JustaNameContext);
  const { signIn, isSignInPending } = useEnsSignIn();
  const { signOut, isSignOutPending } = useEnsSignOut();
  const { connectedEns, isEnsAuthPending, refreshEnsAuth } = useEnsAuth();

  const status = useMemo(() => {
    if (isSignInPending) {
      return 'pending';
    }
    if (isSignOutPending) {
      return 'pending';
    }
    if (isEnsAuthPending) {
      return 'pending';
    }
    if (connectedEns) {
      return 'signedIn';
    }
    return 'signedOut';
  }, [isSignInPending, isSignOutPending, isEnsAuthPending, connectedEns]);

  if (context === undefined) {
    throw new Error('useSIWENS must be used within a SIWENSProvider');
  }

  if (justanameContext === undefined) {
    throw new Error('useSIWENS must be used within a JustaNameProvider');
  }

  return {
    handleOpenSignInDialog: context.handleOpenSignInDialog,
    isSignInOpen: context.isSignInOpen,
    signIn,
    signOut,
    status,
    connectedEns,
    refreshEnsAuth
  };
}

const CheckSession: React.FC<{ openOnWalletConnect: boolean, handleOpenDialog: (open: boolean) => void }> = ({ openOnWalletConnect, handleOpenDialog }) => {
  const { connectedEns, isEnsAuthPending } = useEnsAuth();
  const { signOut } = useEnsSignOut();
  const [wasConnected, setWasConnected] = useState(false);
  const {
    address,
    isConnected,
    isDisconnected,
    isConnecting,
    isReconnecting,
  } = useMountedAccount();


  useEffect(() => {
    if (isConnected && !wasConnected) {
      setWasConnected(true);
    }
  }, [isConnected, wasConnected])

  useEffect(() => {
    if (connectedEns && address) {
      if (connectedEns.address !== address) {
        signOut()
        handleOpenDialog(true);
      }
    }
  }, [connectedEns, address]);

  useEffect(() => {
    if (openOnWalletConnect && isConnected && !connectedEns && !isEnsAuthPending) {
      handleOpenDialog(true);
    }
    if (!isConnected) {
      handleOpenDialog(false);
    }
  }, [isConnected, connectedEns, isEnsAuthPending, openOnWalletConnect]);


  useEffect(() => {
      if (isDisconnected && !isConnecting && !isReconnecting && wasConnected) {
        signOut();
        handleOpenDialog(false);
      }
  }, [isDisconnected, isConnecting, isReconnecting, wasConnected]);

  return null;
}