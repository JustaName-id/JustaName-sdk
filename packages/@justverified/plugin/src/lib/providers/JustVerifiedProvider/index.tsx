import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { JustVerifiedDialog } from '../../dialogs/JustVerifiedDialog';
import { Credentials } from '../../types';
import { useEnsAuth, useEnsSignIn, useEnsSignOut } from '@justaname.id/react';
import { ChainId } from '@justaname.id/sdk';
import {
  JustaNameLoadingDialog,
  JustWeb3Context,
  useJustWeb3,
} from '@justweb3/widget';

interface JustVerifiedContextProps {
  handleOpenVerificationDialog: (open: boolean) => void;
  openVerificationDialog: boolean;
  credentials: Credentials[];
  verificationBackendUrl?: string;
}

const JustVerifiedContext = createContext<JustVerifiedContextProps>({
  handleOpenVerificationDialog: () => {},
  openVerificationDialog: false,
  credentials: [],
  verificationBackendUrl: undefined,
});

interface JustVerifiedProviderProps {
  children: ReactNode;
  handleOpenVerificationDialog: (open: boolean) => void;
  openVerificationDialog: boolean;
  credentials: Credentials[];
  verificationBackendUrl: string;
  mApp: string;
  chainId: ChainId;
}

export const JustVerifiedProvider: FC<JustVerifiedProviderProps> = ({
  children,
  handleOpenVerificationDialog,
  openVerificationDialog,
  credentials,
  verificationBackendUrl,
  mApp,
  chainId,
}) => {
  const { connectedEns, isEnsAuthLoading: isBaseEnsAuthLoading } =
    useJustWeb3();
  const signInInProgressRef = useRef(false);

  const { connectedEns: connectedToVerification, isEnsAuthLoading } =
    useEnsAuth({
      backendUrl: verificationBackendUrl,
      currentEnsRoute: '/auth/current',
    });

  const { signIn, isSignInPending } = useEnsSignIn({
    statement: 'I want to verify my identity with JustVerified',
    backendUrl: verificationBackendUrl,
    signinNonceRoute: '/auth/nonce',
    signinRoute: '/auth/signin',
    currentEnsRoute: '/auth/current',
  });

  const { signOut, isSignOutPending } = useEnsSignOut({
    backendUrl: verificationBackendUrl,
    signoutRoute: '/auth/signout',
    currentEnsRoute: '/auth/current',
  });

  const {
    config: { disableOverlay },
  } = useContext(JustWeb3Context);

  const handleOpenDialogInternal = (_open: boolean) => {
    if (openVerificationDialog !== _open) {
      handleOpenVerificationDialog(_open);
    }
  };

  useEffect(() => {
    const previousSigninInProgress = !!signInInProgressRef.current;
    if (!isSignInPending) {
      signInInProgressRef.current = false;
    }
    if (
      isBaseEnsAuthLoading ||
      !connectedEns ||
      isEnsAuthLoading ||
      isSignInPending ||
      isSignOutPending ||
      connectedToVerification ||
      previousSigninInProgress ||
      !openVerificationDialog
    ) {
      return;
    }

    signInInProgressRef.current = true;

    signIn({
      ens: connectedEns.ens,
    })
      .then(() => {
        signInInProgressRef.current = false;
      })
      .catch(() => {
        handleOpenDialogInternal(false);
      });
  }, [
    connectedEns,
    connectedToVerification,
    isBaseEnsAuthLoading,
    isEnsAuthLoading,
    isSignInPending,
    isSignOutPending,
    openVerificationDialog,
  ]);

  useEffect(() => {
    if (
      isEnsAuthLoading ||
      isSignInPending ||
      isSignOutPending ||
      isBaseEnsAuthLoading ||
      !openVerificationDialog
    ) {
      return;
    }

    if (!connectedEns && connectedToVerification) {
      signOut();
    }

    if (connectedEns && connectedToVerification) {
      if (connectedEns.ens !== connectedToVerification.ens) {
        signOut();
      }
    }
  }, [
    connectedEns,
    connectedToVerification,
    isBaseEnsAuthLoading,
    isEnsAuthLoading,
    isSignInPending,
    isSignOutPending,
    openVerificationDialog,
  ]);

  const loading = useMemo(() => {
    return (
      !connectedToVerification ||
      isSignInPending ||
      isEnsAuthLoading ||
      isSignOutPending ||
      isBaseEnsAuthLoading
    );
  }, [
    connectedToVerification,
    isSignInPending,
    isEnsAuthLoading,
    isSignOutPending,
    isBaseEnsAuthLoading,
  ]);

  // useEffect(() => {
  //   signInInProgressRef.current = false;
  // }, [openVerificationDialog]);

  return (
    <JustVerifiedContext.Provider
      value={{
        handleOpenVerificationDialog,
        openVerificationDialog,
        credentials,
        verificationBackendUrl,
      }}
    >
      {children}
      {loading && openVerificationDialog && connectedEns ? (
        <JustaNameLoadingDialog disableOverlay={disableOverlay} open={true} />
      ) : (
        <JustVerifiedDialog
          open={openVerificationDialog}
          handleOpenDialog={handleOpenDialogInternal}
          credentials={credentials}
          verificationBackendUrl={verificationBackendUrl}
          mApp={mApp}
          chainId={chainId}
        />
      )}
    </JustVerifiedContext.Provider>
  );
};
