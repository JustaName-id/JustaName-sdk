import {
  createContext,
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useContext, useEffect,
  useMemo,
  useState
} from 'react';
import {
  useEnsAuth,
  useCanEnableMApps,
  useIsMAppEnabled,
  useEnabledMApps
} from '@justaname.id/react';
import { AuthorizeMAppDialog } from '../../dialogs/AuthorizeMAppDialog';
import { PluginProvider } from '../PluginProvider';
import { JustaPlugin } from '../../plugins';
import { RevokeMAppDialog } from '../../dialogs/RevokeMAppDialog';

export interface MApp {
  name: string;
  isOpen: boolean;
}

export interface MAppContextProps {
  mAppsToEnable: string[] | undefined;
  mAppsAlreadyEnabled: string[] | undefined;
  canEnableMApps: boolean | undefined;
  handleOpenAuthorizeMAppDialog: (mAppName: string, open?: boolean) => void;
  handleOpenRevokeMAppDialog: (mAppName: string, open?: boolean) => void;
  handleOpenSignInDialog: (open: boolean) => void;
}

export const MAppContext = createContext<MAppContextProps>({
  mAppsToEnable: undefined,
  mAppsAlreadyEnabled: undefined,
  canEnableMApps: undefined,
  handleOpenAuthorizeMAppDialog: () => { },
  handleOpenRevokeMAppDialog: () => { },
  handleOpenSignInDialog: () => { },
});

interface MAppsProviderProps {
  logo?: string;
  handleOpenSignInDialog: (open: boolean) => void;
  children: ReactNode;
  mApps?: {
    name: string;
    openOnConnect: boolean;
  }[];
  plugins: JustaPlugin[];
  disableOverlay?: boolean;
}

export const MAppsProvider: FC<MAppsProviderProps> = ({
  logo,
  handleOpenSignInDialog,
  children,
  disableOverlay,
  mApps: initialMApps = [],
  plugins
}) => {
  const { isEnsAuthPending, isLoggedIn, connectedEns } = useEnsAuth();
  const [mAppsToEnableOpen, setMAppsToEnableOpen] = useState<{ name: string; isOpen: boolean }[] | undefined>(undefined);
  const [mAppsAlreadyEnabledOpen, setMAppsAlreadyEnabledOpen] = useState<{ name: string; isOpen: boolean }[] | undefined>(undefined);

  const { canEnableMApps } = useCanEnableMApps({
    ens: connectedEns?.ens || '',
  })
  const { enabledMApps } = useEnabledMApps({
    ens: connectedEns?.ens || ''
  });

  const mAppsToEnable = useMemo(() => {
    if (!initialMApps || !enabledMApps) {
      return undefined;
    }
    return initialMApps.filter((mApp) => !enabledMApps.includes(mApp.name))
  }, [initialMApps, enabledMApps]);

  const mAppsAlreadyEnabled = useMemo(() => {
    if (!initialMApps || !enabledMApps) {
      return undefined;
    }
    return initialMApps.filter((mApp) => enabledMApps.includes(mApp.name))
  }, [initialMApps, enabledMApps]);

  useEffect(() => {
    if (!mAppsToEnable) {
      return;
    }
    setMAppsToEnableOpen(mAppsToEnable.map((mApp) => ({ name: mApp.name, isOpen: mApp.openOnConnect })));
  }, [mAppsToEnable]);

  useEffect(() => {
    if (!mAppsAlreadyEnabled) {
      return;
    }
    setMAppsAlreadyEnabledOpen(mAppsAlreadyEnabled.map((mApp) => ({ name: mApp.name, isOpen: false })));
  }, [mAppsAlreadyEnabled]);


  const handleOpenAuthorizeMAppDialog = useCallback(
    (mAppName: string, open = true) => {
      setMAppsToEnableOpen((prev) => prev?.map((mApp) => {
        if (mApp.name === mAppName) {
          return {
            ...mApp,
            isOpen: open,
          };
        }
        return mApp;
      }));
    },
    []
  );

  const handleOpenRevokeMAppDialog = useCallback(
    (mAppName: string, open = true) => {
      setMAppsAlreadyEnabledOpen((prev) => prev?.map((mApp) => {
        if (mApp.name === mAppName) {
          return {
            ...mApp,
            isOpen: open,
          };
        }
        return mApp;
      }));
    },
    []
  );

  return (
    <MAppContext.Provider
      value={{
        mAppsToEnable: mAppsToEnable?.map((mApp) => mApp.name),
        mAppsAlreadyEnabled: mAppsAlreadyEnabled?.map((mApp) => mApp.name),
        handleOpenAuthorizeMAppDialog,
        handleOpenRevokeMAppDialog,
        canEnableMApps,
        handleOpenSignInDialog
      }}
    >
      <PluginProvider
        mApps={initialMApps.map((mApp) => mApp.name)}
        plugins={plugins}
        handleOpenSignInDialog={handleOpenSignInDialog}
        handleOpenAuthorizeMAppDialog={handleOpenAuthorizeMAppDialog}
        handleOpenRevokeMAppDialog={handleOpenRevokeMAppDialog}
      >
        {mAppsToEnableOpen && mAppsToEnableOpen.map((mApp) => (
          <Fragment key={`mApp-${mApp.name}`}>
            <AuthorizeMAppDialog
              handleOpenDialog={(open) => handleOpenAuthorizeMAppDialog(mApp.name, open)}
              mApp={mApp}
              logo={logo}
              handleOpenSignInDialog={handleOpenSignInDialog}
              connectedEns={connectedEns?.ens}
              isEnsAuthPending={isEnsAuthPending}
              isLoggedIn={isLoggedIn}
              disableOverlay={disableOverlay}
            />
          </Fragment>
        ))}
        {mAppsAlreadyEnabledOpen && mAppsAlreadyEnabledOpen.map((mApp) => (
          <Fragment key={`mApp-${mApp.name}`}>
            <RevokeMAppDialog
              handleOpenDialog={(open) => handleOpenRevokeMAppDialog(mApp.name, open)}
              mApp={mApp}
              logo={logo}
              handleOpenSignInDialog={handleOpenSignInDialog}
              connectedEns={connectedEns?.ens}
              isEnsAuthPending={isEnsAuthPending}
              isLoggedIn={isLoggedIn}
              disableOverlay={disableOverlay}
            />
          </Fragment>
        ))
        }
        {children}
      </PluginProvider>
    </MAppContext.Provider>
  );
};

interface UseMAppParams {
  mApp: string;
}

interface UseMAppResult {
  handleOpenAuthorizeMAppDialog: (open: boolean) => void;
  handleOpenRevokeMAppDialog: (open: boolean) => void;
  isMAppEnabled: boolean | undefined;
  canOpenMAppDialog: boolean;
  isPending: boolean;
}

export const useMApp = ({
  mApp,
}: UseMAppParams): UseMAppResult => {
  const {
    handleOpenAuthorizeMAppDialog: contextOpenAuthorizeMAppDialog,
    handleOpenRevokeMAppDialog: contextOpenRevokeMAppDialog,
    handleOpenSignInDialog,
  } = useContext<MAppContextProps>(MAppContext);

  const { connectedEns } = useEnsAuth()
  const { isMAppEnabled, isMAppEnabledPending } = useIsMAppEnabled({
    ens: connectedEns?.ens || '',
    mApp,
  });
  const { canEnableMApps, isCanEnableMAppsPending } = useCanEnableMApps({
    ens: connectedEns?.ens || '',
  });

  const isPending = isMAppEnabledPending || isCanEnableMAppsPending;

  const handleOpenAuthorizeMAppDialog = useCallback(
    (open: boolean) => {
      if (!connectedEns) {
        handleOpenSignInDialog(true);
        return;
      }

      if (isPending) {
        return;
      }

      if (!isMAppEnabled && canEnableMApps) {
        contextOpenAuthorizeMAppDialog(mApp, open);
      }
    },
    [
      connectedEns,
      handleOpenSignInDialog,
      isPending,
      isMAppEnabled,
      canEnableMApps,
      contextOpenAuthorizeMAppDialog,
      mApp,
    ]
  );

  const handleOpenRevokeMAppDialog = useCallback(
    (open: boolean) => {
      if (!connectedEns) {
        handleOpenSignInDialog(true);
        return;
      }

      if (isPending) {
        return;
      }

      if (isMAppEnabled) {
        contextOpenRevokeMAppDialog(mApp, open);
      }
    },
    [
      connectedEns,
      handleOpenSignInDialog,
      isPending,
      isMAppEnabled,
      contextOpenRevokeMAppDialog,
      mApp,
    ]
  );

  const canOpenMAppDialog = useMemo(() => {
    if (!connectedEns) {
      return true;
    }
    return !isMAppEnabled && canEnableMApps && !isPending;
  }, [connectedEns, isMAppEnabled, canEnableMApps, isPending]);

  return {
    handleOpenAuthorizeMAppDialog,
    handleOpenRevokeMAppDialog,
    isMAppEnabled,
    canOpenMAppDialog: Boolean(canOpenMAppDialog),
    isPending,
  };
};


export const useMApps = (): MAppContextProps => {
  const context = useContext(MAppContext);
  if (context === undefined) {
    throw new Error('useMApps must be used within a MAppsProvider');
  }
  return context;
}