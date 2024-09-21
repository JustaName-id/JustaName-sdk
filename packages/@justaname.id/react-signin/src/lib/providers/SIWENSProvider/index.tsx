import { createContext, FC, Fragment, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
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
import { MAppDialog, SIWENSDialog } from '../../dialogs';
import { UseMutateAsyncFunction } from '@tanstack/react-query';

export interface SIWENSProviderConfig extends JustaNameProviderConfig, JustaThemeProviderConfig {
  openOnWalletConnect?: boolean;
  allowedEns: "all" | "platform" | string[];
}

export interface SIWENSProviderProps {
  children: ReactNode;
  config: SIWENSProviderConfig;
}

export interface SIWENSContextProps {
  handleOpenSignInDialog: (open: boolean) => void;
  isSignInOpen: boolean;
  handleOpenMAppDialog: (mApp: string, open: boolean) => void;
  mApps: string[];
}

export interface MAPPContextProps {
  handleAddMApp: (mapp: string, open?: boolean) => void;
  handleRemoveMApp: (mapp: string, open: boolean) => void;
}

export const MAPPContext = createContext<MAPPContextProps>({
  handleAddMApp: () => { },
  handleRemoveMApp: () => { },
});

export const SIWENSContext = createContext<SIWENSContextProps>({
  isSignInOpen: false,
  handleOpenSignInDialog: () => { },
  handleOpenMAppDialog: () => { },
  mApps: []
});

export const SIWENSProvider: FC<SIWENSProviderProps> = ({
  children,
  config: props
}) => {
  const openOnWalletConnect = props.openOnWalletConnect || false;
  const allowedEns = props.allowedEns || "all";
  const { isConnected } = useMountedAccount()
  const [signInOpen, setSignInOpen] = useState(false);
  const [mApps, setMApps] = useState<string[]>([]);
  const [mAppsOpen, setMAppsOpen] = useState<boolean[]>([]);

  const handleOpenMAppDialog = (mApp: string, open: boolean) => {
    const index = mApps.indexOf(mApp);
    if (index === -1) {
      handleAddMApp(mApp, open);
    }
    const newMAppsOpen = [...mAppsOpen];
    newMAppsOpen[index] = open;
    setMAppsOpen(newMAppsOpen);
  }

  const handleAddMApp = (mApp: string, open= false) => {
    if (mApps.includes(mApp)) {
      return;
    }
    setMApps([...mApps, mApp]);
    setMAppsOpen([...mAppsOpen, open]);
  }

  const handleRemoveMApp = (mApp: string) => {
    const index = mApps.indexOf(mApp);

    if (index === -1) {
      return;
    }

    setMApps([...mApps.slice(0, index), ...mApps.slice(index + 1)]);
    setMAppsOpen([...mAppsOpen.slice(0, index), ...mAppsOpen.slice(index + 1)]);
  }

  const handleOpenSignInDialog = (open: boolean) => {
    if(!isConnected){
      return;
    }
    if (open !== signInOpen) {
      setSignInOpen(open);
    }
  }

  return (
    <SIWENSContext.Provider value={{
      handleOpenSignInDialog,
      isSignInOpen: signInOpen,
      handleOpenMAppDialog,
      mApps
    }}>
      <MAPPContext.Provider value={{
        handleAddMApp,
        handleRemoveMApp
      }}>
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
            {
              mApps.map((mApp, i) => (
                <Fragment key={mApp}>
                  <MAppDialog open={mAppsOpen[i]} handleOpenDialog={(open) => handleOpenMAppDialog(mApp, open)} mApp={mApp} />
                </Fragment>
              ))
            }
          </JustaThemeProvider>
        </JustaNameProvider>
      </MAPPContext.Provider>
    </SIWENSContext.Provider>
  );
};

export interface UseSignInWithEns {
  handleOpenSignInDialog: (open: boolean) => void;
  isSignInOpen: boolean
  handleOpenMAppDialog: (mApp: string, open: boolean) => void;
  mApps: string[];
  signIn: UseMutateAsyncFunction<string, Error, EnsSignInParams, unknown>
  signOut: () => void;
  status: 'pending' | 'signedIn' | 'signedOut';
  isLoggedIn: boolean;
  isEnsAuthPending: boolean;
  refreshEnsAuth: () => void;
  connectedEns: UseEnsAuthReturn['connectedEns'];
}


export const useSignInWithEns = (): UseSignInWithEns => {
  const context = useContext(SIWENSContext);
  const justanameContext = useContext(JustaNameContext);
  const { signIn, isSignInPending } = useEnsSignIn();
  const { signOut, isSignOutPending } = useEnsSignOut();
  const { connectedEns, isLoggedIn, isEnsAuthPending, refreshEnsAuth } = useEnsAuth();

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
    handleOpenMAppDialog: context.handleOpenMAppDialog,
    mApps: context.mApps,
    isEnsAuthPending,
    signIn,
    signOut,
    isLoggedIn,
    status,
    connectedEns,
    refreshEnsAuth,
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