import { FC, useEffect, useMemo, useState } from 'react';
import {
  ArrowIcon,
  ClickableItem,
  DoneIcon,
  LoadingSpinner,
  DiscordIcon,
  EmailIcon,
  GithubIcon,
  TelegramIcon,
  TwitterIcon,
  OpenPassportIcon
} from '@justweb3/ui';
import { Credentials } from '../../types';
import { EthereumEip712Signature2021 } from '../../types/ethereumEip712Signature';
import moment from 'moment';

export interface SelectCredentialItemProps {
  credential: Credentials;
  selectedCredential: Credentials | undefined;
  onClick: () => void;
  credentialValue:
  | EthereumEip712Signature2021<{ username?: string; email?: string }>
  | EthereumEip712Signature2021<{ openPassportProof?: string }>
  | undefined;
  disabled?: boolean;
}

export const SelectCredentialItem: FC<SelectCredentialItemProps> = ({
  credential,
  selectedCredential,
  onClick,
  credentialValue,
  disabled = false,
}) => {
  const [hover, setHover] = useState(false);
  const loading = useMemo(
    () => selectedCredential === credential,
    [selectedCredential, credential]
  );
  const username = useMemo(() => {
    const subject = credentialValue?.credentialSubject;
    if (!subject) return undefined;

    return 'username' in subject ? subject.username :
      'email' in subject ? subject.email :
        'openPassportProof' in subject ? "Valid Passport" :
          undefined;
  }, [credentialValue]);
  const expirationDate = useMemo(
    () => credentialValue?.expirationDate,
    [credentialValue]
  );
  const icon = useMemo(() => {
    switch (credential) {
      case 'github':
        return <GithubIcon width={30} />;
      case 'twitter':
        return <TwitterIcon width={30} />;
      case 'telegram':
        return <TelegramIcon width={30} />;
      case 'discord':
        return <DiscordIcon width={30} />;
      case 'email':
        return <EmailIcon width={30} />;
      case 'openpassport':
        return <OpenPassportIcon width={30} />;
    }
  }, [credential]);

  useEffect(() => {
    if (loading) {
      setHover(false);
    }
  }, [loading, hover]);
  return (
    <ClickableItem
      style={{
        width: '100%',
      }}
      title={
        (credential === 'twitter'
          ? 'Twitter (X)'
          : credential.charAt(0).toUpperCase() + credential.slice(1)) +
        (username ? `: ${username}` : '')
      }
      subtitle={
        username ? 'Expires in ' + moment(expirationDate).fromNow() : undefined
      }
      onClick={onClick}
      left={icon}
      right={
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: !loading ? 1 : 0,
            }}
          >
            {username ? <DoneIcon width={20} /> : <ArrowIcon width={20} />}
          </div>

          <div
            style={{
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: loading ? 1 : 0,
              height: '30px',
              width: loading ? '30px' : '0',
            }}
          >
            <LoadingSpinner color={'var(--justweb3-primary-color)'} />
          </div>
        </>
      }
      contentStyle={{
        opacity: username ? 0.5 : 1,
      }}
      loading={loading}
      onHover={(hover) => setHover(hover)}
      disabled={
        (selectedCredential &&
          selectedCredential?.length > 0 &&
          selectedCredential !== credential) ||
        disabled
      }
      clickable={!username}
    />
  );
};
