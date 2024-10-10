import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  JustaNameContext,
  JustaNameProvider,
  JustaNameProviderConfig,
  useEnsAuth,
  UseEnsAuthReturn,
  useEnsSignIn,
  useEnsSignOut,
  useMountedAccount, UseEnsSignInResult, UseEnsSignOutResult, UseSubnameUpdateFunctionParams
} from '@justaname.id/react';
import { JustaThemeProvider, JustaThemeProviderConfig } from '@justaname.id/react-ui';
import { SignInDialog } from '../../dialogs/SignInDialog';
import { MAppsProvider } from '../MAppProvider';
import { JustaPlugin } from '../../plugins';
import usePreviousState from '../../hooks/usePreviousState';
import { UpdateRecordDialog } from '../../dialogs';

export interface JustSignInProviderConfig extends JustaNameProviderConfig, JustaThemeProviderConfig {
  openOnWalletConnect?: boolean;
  allowedEns?: 'all' | 'platform' | string[];
  logo?: string;
  disableOverlay?: boolean;
}

export interface JustSignInProviderProps {
  children: ReactNode;
  config: JustSignInProviderConfig;
  mApps?: (string | { name: string, openOnConnect: boolean })[];
  plugins?: JustaPlugin[];
}

export interface UpdateRecordsParams extends Omit<UseSubnameUpdateFunctionParams, 'ens' | 'contentHash'> {
  contentHash?: {
    protocolType: string;
    decoded: string;
  };
}

export interface JustSignInContextProps {
  handleOpenSignInDialog: (open: boolean) => void;
  handleUpdateRecords: (records: UpdateRecordsParams & { ens: string }) => Promise<void>;
  isSignInOpen: boolean;
  logo?: string;
  plugins: JustaPlugin[],
  mApps: string[]
}


export const JustSignInContext = createContext<JustSignInContextProps>({
  isSignInOpen: false,
  handleOpenSignInDialog: () => {
  },
  handleUpdateRecords: async () => {
  },
  logo: '',
  plugins: [],
  mApps: []
});


export const JustSignInProvider: FC<JustSignInProviderProps> = ({
  children,
  config: {
    openOnWalletConnect = true,
    ...configRest
  },
  mApps = [],
  plugins,
}) => {
  const allowedEns = configRest.allowedEns || 'all';
  const { isConnected } = useMountedAccount();
  const [signInOpen, setSignInOpen] = useState(false);
  const [updateRecord, setUpdateRecord] = useState<(UpdateRecordsParams & { ens: string }) | null>(null);
  const updateRecordPromiseResolveRef = useRef<(() => void) | null>(null);

  const pluginsMApps = useMemo(() => plugins
    ?.map((plugin) => plugin.mApps)
    .flat()
    .map((mApp) => ({
      name: mApp,
      openOnConnect: false
    })),
    [plugins]) as { name: string, openOnConnect: boolean }[] || [];


  const handleUpdateRecords = async (records: UpdateRecordsParams & { ens: string }) => {
    setUpdateRecord(records);
    return new Promise<void>((resolve) => {
      updateRecordPromiseResolveRef.current = resolve;
    });
  };

  useEffect(() => {
    if (!updateRecord && updateRecordPromiseResolveRef.current) {
      updateRecordPromiseResolveRef.current();
      updateRecordPromiseResolveRef.current = null;
    }
  }, [updateRecord]);

  const mAppsWithOpenOnConnect = mApps.map((mApp) => {
    if (typeof mApp === 'string') {
      return {
        name: mApp,
        openOnConnect: false
      };
    }
    return mApp;
  });

  const allMApps = [
    ...mAppsWithOpenOnConnect,
    ...pluginsMApps
  ].reduce((acc, mApp) => {
    if (!acc.find((accMApp) => accMApp.name === mApp.name)) {
      return [...acc, mApp];
    }
    return acc;
  }, [] as { name: string, openOnConnect: boolean }[]);

  const handleOpenSignInDialog = (open: boolean) => {
    if (!isConnected) {
      return;
    }
    if (open !== signInOpen) {
      setSignInOpen(open);
    }
  };

  return (
    <JustaNameProvider config={{
      config: configRest.config,
      backendUrl: configRest.backendUrl,
      routes: configRest.routes,
      ensDomains: configRest.ensDomains,
      networks: configRest.networks,
      apiKey: configRest.apiKey,
    }}>
      <JustaThemeProvider color={configRest.color}>

        <JustSignInContext.Provider value={{
          handleOpenSignInDialog,
          isSignInOpen: signInOpen,
          logo: configRest.logo,
          plugins: plugins || [],
          mApps: allMApps.map((mApp) => mApp.name),
          handleUpdateRecords: handleUpdateRecords
        }}>
          <MAppsProvider
            logo={configRest.logo}
            mApps={allMApps}
            plugins={plugins || []}
            handleOpenSignInDialog={handleOpenSignInDialog}
          >
            <CheckSession openOnWalletConnect={openOnWalletConnect} handleOpenDialog={handleOpenSignInDialog} />
            <SignInDialog open={signInOpen} handleOpenDialog={handleOpenSignInDialog} allowedEns={allowedEns}
              logo={configRest.logo} disableOverlay={configRest.disableOverlay} />
            {/*{*/}
            {/*  Boolean(updateRecord) &&*/}
            <UpdateRecordDialog open={Boolean(updateRecord)} handleOpen={
              (open) => {
                if (!open) {
                  setUpdateRecord(null);
                }
              }
            } {...updateRecord} logo={configRest.logo} disableOverlay={configRest.disableOverlay} />
            {/*}*/}

            {children}
          </MAppsProvider>
        </JustSignInContext.Provider>
      </JustaThemeProvider>
    </JustaNameProvider>

  );
};

export interface UseSignInWithJustaName {
  handleOpenSignInDialog: (open: boolean) => void;
  isSignInOpen: boolean;
  signIn: UseEnsSignInResult['signIn'];
  signOut: UseEnsSignOutResult['signOut'];
  status: 'pending' | 'signedIn' | 'signedOut';
  isLoggedIn: boolean;
  isEnsAuthPending: boolean;
  refreshEnsAuth: () => void;
  connectedEns: UseEnsAuthReturn['connectedEns'];
  updateRecords: (
    records: Omit<UseSubnameUpdateFunctionParams, 'ens'> & { ens?: string; }
  ) => Promise<void>;
}


export const useSignInWithJustaName = (): UseSignInWithJustaName => {
  const context = useContext(JustSignInContext);
  const justanameContext = useContext(JustaNameContext);
  const { signIn, isSignInPending } = useEnsSignIn();
  const { signOut, isSignOutPending } = useEnsSignOut();
  const { connectedEns, isLoggedIn, isEnsAuthPending, refreshEnsAuth } = useEnsAuth();
  const { handleUpdateRecords } = context;
  const handleUpdateRecordsInternal = async (records: Omit<UseSubnameUpdateFunctionParams, 'ens'> & { ens?: string; }) => {
    if (records.ens) {
      return handleUpdateRecords({
        ...records,
        ens: records.ens
      });
    }
    else {
      return handleUpdateRecords({
        ...records,
        ens: connectedEns?.ens || ''
      });
    }
  }

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
    throw new Error('useJustSignIn must be used within a JustSignInProvider');
  }

  if (justanameContext === undefined) {
    throw new Error('useJustSignIn must be used within a JustaNameProvider');
  }

  return {
    handleOpenSignInDialog: context.handleOpenSignInDialog,
    updateRecords: handleUpdateRecordsInternal,
    isSignInOpen: context.isSignInOpen,
    isEnsAuthPending,
    signIn,
    signOut,
    isLoggedIn,
    status,
    connectedEns,
    refreshEnsAuth
  };
};

const CheckSession: FC<{
  openOnWalletConnect: boolean,
  handleOpenDialog: (open: boolean) => void
}> = ({ openOnWalletConnect, handleOpenDialog }) => {
  const { connectedEns, isEnsAuthPending } = useEnsAuth();
  const { signOut } = useEnsSignOut();
  const {
    address,
    isConnected,
    isDisconnected,
    isConnecting,
    isReconnecting
  } = useMountedAccount();

  const isConnectedPrevious = usePreviousState(isConnected, [isConnected]);

  useEffect(() => {
    if (connectedEns && address) {
      if (connectedEns.address !== address) {
        signOut();
        handleOpenDialog(true);
      }
    }
  }, [connectedEns, address, signOut]);

  useEffect(() => {
    if (openOnWalletConnect && isConnected && !connectedEns && !isEnsAuthPending) {
      handleOpenDialog(true);
    }
    if (!isConnected) {
      handleOpenDialog(false);
    }
  }, [isConnected, connectedEns, isEnsAuthPending, openOnWalletConnect]);


  useEffect(() => {
    if (isDisconnected && !isConnecting && !isReconnecting && isConnectedPrevious) {
      signOut();
      handleOpenDialog(false);
    }
  }, [isDisconnected, isConnecting, isReconnecting, isConnectedPrevious, signOut]);

  return null;
};