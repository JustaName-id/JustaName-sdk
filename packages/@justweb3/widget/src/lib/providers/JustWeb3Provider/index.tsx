import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  JustaNameContext,
  JustaNameProvider,
  JustaNameProviderConfig,
  useEnsAuth,
  UseEnsAuthReturn,
  useEnsSignIn,
  UseEnsSignInResult,
  useEnsSignOut,
  UseEnsSignOutResult,
  useMountedAccount,
  UseSubnameUpdateFunctionParams,
} from '@justaname.id/react';
import {
  JustWeb3ThemeProvider,
  JustWeb3ThemeProviderConfig,
} from '@justweb3/ui';
import { SignInDialog } from '../../dialogs/SignInDialog';
import { MAppsProvider } from '../MAppProvider';
import { JustaPlugin } from '../../plugins';
import usePreviousState from '../../hooks/usePreviousState';
import { ProfileDialog, UpdateRecordDialog } from '../../dialogs';
import { isEqual } from 'lodash';
import { ChainId } from '@justaname.id/sdk';

// import '@justweb3/ui/styles.css';

export interface JustWeb3ProviderConfig
  extends JustaNameProviderConfig,
    JustWeb3ThemeProviderConfig {
  openOnWalletConnect?: boolean;
  allowedEns?: 'all' | 'claimable' | string[];
  logo?: string;
  disableOverlay?: boolean;
  mApps?: (string | { name: string; openOnConnect: boolean })[];
  plugins?: JustaPlugin[];
}

export interface JustWeb3ProviderProps {
  children: ReactNode;
  config: JustWeb3ProviderConfig;
}

export type UpdateRecordsParams = Omit<UseSubnameUpdateFunctionParams, 'ens'>;

export interface JustWeb3ContextProps {
  handleOpenSignInDialog: (open: boolean) => void;
  handleUpdateRecords: (
    records: UpdateRecordsParams & { ens: string }
  ) => Promise<void>;
  handleJustWeb3Config: (config: JustWeb3ProviderConfig) => void;
  handleOpenEnsProfile: (ens: string, chainId?: ChainId) => void;
  isSignInOpen: boolean;
  config: JustWeb3ProviderConfig;
  plugins: JustaPlugin[];
  mApps: string[];
}

export const JustWeb3Context = createContext<JustWeb3ContextProps>({
  isSignInOpen: false,
  handleOpenSignInDialog: () => {},
  handleUpdateRecords: async () => {},
  handleOpenEnsProfile: () => {},
  handleJustWeb3Config: () => {},
  config: {},
  plugins: [],
  mApps: [],
});

export const JustWeb3Provider: FC<JustWeb3ProviderProps> = ({
  children,
  config: initialConfig,
}) => {
  const [config, setConfig] = useState<JustWeb3ProviderConfig>(initialConfig);
  const [justanameConfig, setJustanameConfig] =
    useState<JustaNameProviderConfig>({
      config: initialConfig.config,
      backendUrl: initialConfig.backendUrl,
      routes: initialConfig.routes,
      ensDomains: initialConfig.ensDomains,
      networks: initialConfig.networks,
      dev: initialConfig.dev,
    });

  const allowedEns = config.allowedEns || 'all';
  const { isConnected } = useMountedAccount();
  const [signInOpen, setSignInOpen] = useState(false);
  const [ensOpen, setEnsOpen] = useState<{
    ens: string;
    chainId?: ChainId;
  } | null>(null);
  const [updateRecord, setUpdateRecord] = useState<
    (UpdateRecordsParams & { ens: string }) | null
  >(null);
  const updateRecordPromiseResolveRef = useRef<(() => void) | null>(null);

  const plugins = useMemo(
    () =>
      config.plugins?.reduce((acc, plugin) => {
        if (!acc.find((accPlugin) => accPlugin.name === plugin.name)) {
          return [...acc, plugin];
        }
        return acc;
      }, [] as JustaPlugin[]) || [],
    [config.plugins]
  );

  const pluginsMApps =
    (useMemo(
      () =>
        plugins
          ?.map((plugin) => plugin.mApps)
          .flat()
          .map((mApp) => ({
            name: mApp,
            openOnConnect: false,
          })),
      [plugins]
    ) as { name: string; openOnConnect: boolean }[]) || [];

  const handleUpdateRecords = async (
    records: UpdateRecordsParams & { ens: string }
  ) => {
    setUpdateRecord(records);
    return new Promise<void>((resolve) => {
      updateRecordPromiseResolveRef.current = resolve;
    });
  };

  const handleOpenEnsProfile = (ens: string, chainId?: ChainId) => {
    setEnsOpen({ ens, chainId });
  };

  useEffect(() => {
    if (!updateRecord && updateRecordPromiseResolveRef.current) {
      updateRecordPromiseResolveRef.current();
      updateRecordPromiseResolveRef.current = null;
    }
  }, [updateRecord]);

  const mAppsWithOpenOnConnect =
    config?.mApps?.map((mApp) => {
      if (typeof mApp === 'string') {
        return {
          name: mApp,
          openOnConnect: false,
        };
      }
      return mApp;
    }) || [];

  const allMApps = [...mAppsWithOpenOnConnect, ...pluginsMApps].reduce(
    (acc, mApp) => {
      if (!acc.find((accMApp) => accMApp.name === mApp.name)) {
        return [...acc, mApp];
      }
      return acc;
    },
    [] as { name: string; openOnConnect: boolean }[]
  );

  const handleOpenSignInDialog = (open: boolean) => {
    if (!isConnected) {
      return;
    }
    if (open !== signInOpen) {
      setSignInOpen(open);
    }
  };

  const handleJustWeb3Config = (_config: JustWeb3ProviderConfig) => {
    const _justanameConfig = {
      config: _config.config,
      backendUrl: _config.backendUrl,
      routes: _config.routes,
      ensDomains: _config.ensDomains,
      networks: _config.networks,
      dev: _config.dev,
    };

    setConfig(_config);

    if (!isEqual(_justanameConfig, justanameConfig)) {
      setJustanameConfig(_justanameConfig);
    }
  };

  return (
    <JustaNameProvider config={justanameConfig}>
      <JustWeb3ThemeProvider color={config.color}>
        <JustWeb3Context.Provider
          value={{
            handleOpenSignInDialog,
            isSignInOpen: signInOpen,
            config: config,
            plugins,
            mApps: allMApps.map((mApp) => mApp.name),
            handleUpdateRecords: handleUpdateRecords,
            handleJustWeb3Config,
            handleOpenEnsProfile,
          }}
        >
          <MAppsProvider
            logo={config.logo}
            mApps={allMApps}
            plugins={plugins}
            handleOpenSignInDialog={handleOpenSignInDialog}
          >
            <CheckSession
              openOnWalletConnect={
                config.openOnWalletConnect !== undefined
                  ? config.openOnWalletConnect
                  : true
              }
              handleOpenDialog={handleOpenSignInDialog}
            />
            {ensOpen && (
              <ProfileDialog
                plugins={plugins}
                disableOverlay={config.disableOverlay}
                handleOnClose={() => setEnsOpen(null)}
                ens={ensOpen?.ens}
                chainId={ensOpen?.chainId}
              />
            )}

            <SignInDialog
              open={signInOpen}
              handleOpenDialog={handleOpenSignInDialog}
              allowedEns={allowedEns}
              logo={config.logo}
              disableOverlay={config.disableOverlay}
              dev={config.dev}
            />
            <UpdateRecordDialog
              open={Boolean(updateRecord)}
              handleOpen={(open) => {
                if (!open) {
                  setUpdateRecord(null);
                }
              }}
              {...updateRecord}
              logo={config.logo}
            />
            {children}
          </MAppsProvider>
        </JustWeb3Context.Provider>
      </JustWeb3ThemeProvider>
    </JustaNameProvider>
  );
};

export interface useJustWeb3 {
  handleOpenSignInDialog: (open: boolean) => void;
  isSignInOpen: boolean;
  signIn: UseEnsSignInResult['signIn'];
  signOut: UseEnsSignOutResult['signOut'];
  status: 'pending' | 'signedIn' | 'signedOut';
  isLoggedIn: boolean;
  isEnsAuthPending: boolean;
  isEnsAuthLoading: boolean;
  isEnsAuthFetching: boolean;
  refreshEnsAuth: () => void;
  connectedEns: UseEnsAuthReturn['connectedEns'];
  openEnsProfile: (ens: string, chainId?: ChainId) => void;
  updateRecords: (
    records: Omit<UseSubnameUpdateFunctionParams, 'ens'> & { ens?: string }
  ) => Promise<void>;
  chainId: ChainId | undefined;
}

export const useJustWeb3 = (): useJustWeb3 => {
  const context = useContext(JustWeb3Context);
  const justanameContext = useContext(JustaNameContext);
  const { signIn, isSignInPending } = useEnsSignIn();
  const { signOut, isSignOutPending } = useEnsSignOut();
  const {
    connectedEns,
    isLoggedIn,
    isEnsAuthPending,
    isEnsAuthLoading,
    isEnsAuthFetching,
    refreshEnsAuth,
  } = useEnsAuth();
  const { handleUpdateRecords, handleOpenEnsProfile } = context;
  const handleUpdateRecordsInternal = async (
    records: Omit<UseSubnameUpdateFunctionParams, 'ens'> & {
      ens?: string;
    }
  ) => {
    if (records.ens) {
      return handleUpdateRecords({
        ...records,
        ens: records.ens,
      });
    } else {
      return handleUpdateRecords({
        ...records,
        ens: connectedEns?.ens || '',
      });
    }
  };

  const status = useMemo(() => {
    if (isSignInPending) {
      return 'pending';
    }
    if (isSignOutPending) {
      return 'pending';
    }
    if (isEnsAuthLoading) {
      return 'pending';
    }
    if (connectedEns) {
      return 'signedIn';
    }
    return 'signedOut';
  }, [isSignInPending, isSignOutPending, isEnsAuthLoading, connectedEns]);

  if (context === undefined) {
    throw new Error('useJustWeb3 must be used within a JustWeb3Provider');
  }

  if (justanameContext === undefined) {
    throw new Error('useJustWeb3 must be used within a JustaNameProvider');
  }

  return {
    handleOpenSignInDialog: context.handleOpenSignInDialog,
    updateRecords: handleUpdateRecordsInternal,
    isSignInOpen: context.isSignInOpen,
    isEnsAuthPending,
    isEnsAuthFetching,
    isEnsAuthLoading,
    signIn,
    signOut,
    isLoggedIn,
    status,
    connectedEns,
    refreshEnsAuth,
    openEnsProfile: handleOpenEnsProfile,
    chainId: justanameContext?.chainId,
  };
};

const CheckSession: FC<{
  openOnWalletConnect: boolean;
  handleOpenDialog: (open: boolean) => void;
}> = ({ openOnWalletConnect, handleOpenDialog }) => {
  const { connectedEns, isEnsAuthPending } = useEnsAuth();
  const { signOut } = useEnsSignOut();
  const { address, isConnected, isDisconnected, isConnecting, isReconnecting } =
    useMountedAccount();

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
    if (
      openOnWalletConnect &&
      isConnected &&
      !connectedEns &&
      !isEnsAuthPending
    ) {
      handleOpenDialog(true);
    }
    if (!isConnected) {
      handleOpenDialog(false);
    }
  }, [isConnected, connectedEns, isEnsAuthPending, openOnWalletConnect]);

  useEffect(() => {
    if (
      isDisconnected &&
      !isConnecting &&
      !isReconnecting &&
      isConnectedPrevious
    ) {
      signOut();
      handleOpenDialog(false);
    }
  }, [
    isDisconnected,
    isConnecting,
    isReconnecting,
    isConnectedPrevious,
    signOut,
  ]);

  return null;
};
