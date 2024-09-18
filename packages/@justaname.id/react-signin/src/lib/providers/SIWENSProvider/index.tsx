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
import { SIWJDialog } from '../../modal';
import { UseMutateAsyncFunction } from '@tanstack/react-query';

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

export const SIWJContext = createContext<SIWJContextProps>({
  isOpen: false,
  handleOpenDialog: () => { }
});

export const SIWJProvider: FC<SIWJProviderProps> = ({
  children,
  config: props
}) => {
  const openOnWalletConnect = props.openOnWalletConnect || false;
  const allowedSubnames = props.allowedSubnames || "all";

  const [open, setOpen] = useState(false);
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
  signIn: UseMutateAsyncFunction<string, Error, EnsSignInParams, unknown>
  signOut: () => void;
  status: 'pending' | 'signedIn' | 'signedOut';
  refreshEnsAuth: () => void;
  connectedEns: UseEnsAuthReturn['connectedEns'];
}

export const useSignInWithJustaName = (): UseSignInWithJustaName => {
  const context = useContext(SIWJContext);
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
    connectedEns,
    refreshEnsAuth
  };
}

const CheckSession: React.FC<{ openOnWalletConnect: boolean, handleOpenDialog: (open: boolean) => void }> = ({ openOnWalletConnect, handleOpenDialog }) => {
  const { connectedEns, isEnsAuthPending } = useEnsAuth();
  const { signOut } = useEnsSignOut();
  const {
    address,
    isConnected,
    isDisconnected,
    isConnecting,
    isReconnecting,
  } = useMountedAccount();

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
    setTimeout(() => {
      if (isDisconnected && !isConnecting && !isReconnecting) {
        signOut();
        handleOpenDialog(false);
      }
    }, 2000);
  }, [isDisconnected, isConnecting, isReconnecting]);

  return null;
}