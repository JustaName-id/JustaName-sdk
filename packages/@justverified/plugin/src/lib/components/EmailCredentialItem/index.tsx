import { FC, useMemo, useState } from 'react';
import { ArrowIcon, DoneIcon, Input } from '@justweb3/ui';
import { EmailIcon } from '../../icons';
import { Credentials } from '../../types';
import { EmailDialog } from '../../dialogs/EmailDialog';
import { EthereumEip712Signature2021 } from '../../types/ethereumEip712Signature';

export interface EmailCredentialItemProps {
  selectedCredential: Credentials | undefined;
  refetchVerifyRecords: () => void;
  verificationBackendUrl: string;
  credentialValue: EthereumEip712Signature2021<{ email: string }> | undefined;
  disabled?: boolean;
  refetchRecords: () => void;
  mAppsAlreadyEnabled: string[] | undefined;
  mApp: string;
}

export const EmailCredentialItem: FC<EmailCredentialItemProps> = ({
  refetchVerifyRecords,
  selectedCredential,
  credentialValue,
  verificationBackendUrl,
  disabled = false,
  refetchRecords,
  mAppsAlreadyEnabled,
  mApp,
}) => {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const verifiedEmail = useMemo(
    () => credentialValue?.credentialSubject?.email,
    [credentialValue]
  );
  const loading = useMemo(
    () => selectedCredential === 'email',
    [selectedCredential, 'email']
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const handleOpen = (open: boolean) => {
    if (open) {
      if (isEmailValid) {
        setOpen(true);
      }
    } else {
      setOpen(open);
      setEmail('');
    }
  };

  return (
    <>
      <EmailDialog
        open={open}
        email={email}
        handleOpenDialog={handleOpen}
        verificationBackendUrl={verificationBackendUrl}
        refetchVerifyRecords={refetchVerifyRecords}
        refetchRecords={refetchRecords}
        mAppsAlreadyEnabled={mAppsAlreadyEnabled}
        mApp={mApp}
      />
      <Input
        style={{
          borderColor: 'var(--justweb3-foreground-color-4)',
          opacity: loading ? 0.5 : 1,
        }}
        left={<EmailIcon width={30} />}
        right={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {verifiedEmail ? (
              <DoneIcon width={20} />
            ) : (
              <ArrowIcon
                width={20}
                style={{
                  opacity: isEmailValid ? 1 : 0.5,
                  cursor: isEmailValid ? 'pointer' : 'not-allowed',
                }}
                onClick={() => handleOpen(true)}
              />
            )}
          </div>
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter' && isEmailValid) {
            handleOpen(true);
          }
        }}
        placeholder={verifiedEmail || 'Type Email Here'}
        value={email}
        onChange={handleEmailChange}
        disabled={!!verifiedEmail || disabled || !!selectedCredential}
      />
    </>
  );
};
