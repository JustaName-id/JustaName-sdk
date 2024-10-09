import { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { JustVerifiedDialog } from '../../dialogs/JustVerifiedDialog';
import { CredentialMetadataKeyStandard, Credentials } from '../../types';
import { useRecords } from '@justaname.id/react';
import { ChainId } from '@justaname.id/sdk';
import { useSignInWithJustaName } from '@justaname.id/react-signin';

interface JustVerifiedContextProps {
  handleOpenVerificationDialog: (open: boolean) => void;
  openVerificationDialog: boolean;
  credentials: Credentials[];
  verificationBackendUrl?: string;
}

const JustVerifiedContext = createContext<JustVerifiedContextProps>({
  handleOpenVerificationDialog: () => { },
  openVerificationDialog: false,
  credentials: [],
  verificationBackendUrl: undefined
});

interface JustVerifiedProviderProps {
  children: ReactNode;
  handleOpenVerificationDialog: (open: boolean) => void;
  openVerificationDialog: boolean;
  credentials: Credentials[],
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
  chainId
}) =>
{
  return (
    <JustVerifiedContext.Provider value={{
      handleOpenVerificationDialog,
      openVerificationDialog,
      credentials,
      verificationBackendUrl
    }}>
      {children}
      <JustVerifiedDialog
        open={openVerificationDialog}
        handleOpenDialog={handleOpenVerificationDialog}
        credentials={credentials}
        verificationBackendUrl={verificationBackendUrl}
        mApp={mApp}
        chainId={chainId}
      />
    </JustVerifiedContext.Provider>
  )

}
export interface UseJustVerifiedProps {
  mApp: string;
}


export const useJustVerified = ({
  mApp='justverified.eth'
                                }: UseJustVerifiedProps) => {
  const context = useContext(JustVerifiedContext);
  const { connectedEns} = useSignInWithJustaName();
  const { records } = useRecords({
    ens: connectedEns?.ens
  })
  const { credentials } = context;
  const credentialKeys = useMemo(() => {
    return credentials.map(credential => CredentialMetadataKeyStandard[credential] + mApp);
  }, [credentials, mApp]);

  const credentialRecords = useMemo(() => {
    return records?.records?.texts.filter(text => credentialKeys.includes(text.key));
  }, [records?.records?.texts, credentialKeys]);

  if (!context) {
    throw new Error('useJustVerified must be used within a JustVerifiedProvider');
  }
  return {
    ...context,
    configuredCredentials: credentials.filter(credential => credentialRecords?.find(record => record.key === CredentialMetadataKeyStandard[credential] + '_justverified.eth')),
    missingCredentials: credentials.filter(credential => !credentialRecords?.find(record => record.key === CredentialMetadataKeyStandard[credential] + '_justverified.eth')),
    verifiableCredentialRecords: credentialRecords
  };
}
