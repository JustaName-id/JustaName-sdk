import { useEffect, useMemo, useState, FC } from 'react';
import { ArrowIcon, ClickableItem, DoneIcon, LoadingSpinner } from '@justaname.id/react-ui';
import { Credentials } from '../../types';
import { GithubIcon, TwitterIcon, TelegramIcon, DiscordIcon, EmailIcon} from '../../icons'
import { EthereumEip712Signature2021 } from '../../types/ethereumEip712Signature';
export interface SelectCredentialItemProps {
  credential: Credentials;
  selectedCredential: Credentials | undefined
  onClick: () => void;
  credentialValue: EthereumEip712Signature2021<{ username: string }> | undefined;
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
  const loading = useMemo(() => selectedCredential === credential, [selectedCredential, credential]);
  const username = useMemo(() => credentialValue?.credentialSubject?.username, [credentialValue]);

  const icon = useMemo(() => {
    switch (credential) {
      case 'github': return <GithubIcon width={30} />;
      case 'twitter': return <TwitterIcon width={30} />;
      case 'telegram': return <TelegramIcon width={30} />;
      case 'discord': return <DiscordIcon width={30} />;
      case 'email': return <EmailIcon width={30} />;
    }
  }, [credential]);

  useEffect(() => {
    if (loading) {
      setHover(false);
    }
  }, [loading, hover]);
  return (
    <ClickableItem name={(credential === "twitter" ? "Twitter (X)" : credential.charAt(0).toUpperCase() + credential.slice(1)) + (username ? `: ${username}` : '')}
                   onClick={onClick}
                   left={icon}
                   right={<>
                     <div style={{
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       opacity: (!loading) ? 1 : 0
                     }}>
                       {
                         username ?
                           <DoneIcon width={20} />
                           :
                        <ArrowIcon width={20}/>
                       }
                     </div>

                     <div style={{
                       display: 'flex',
                       position: 'relative',
                       alignItems: 'center',
                       justifyContent: 'center',
                       opacity: loading? 1 : 0,
                       height: '30px',
                       width: loading? '30px' : '0'
                     }}>
                       <LoadingSpinner color={'var(--justaname-primary-color)'} />
                     </div>
                   </>}
                   contentStyle={{
                     opacity: username ? 0.5 : 1,
                   }}
                   loading={loading}
                   onHover={(hover) => setHover(hover)}
                   disabled={( selectedCredential && selectedCredential?.length > 0 && selectedCredential !== credential) || disabled}
                   clickable={!username}
    />
  )
}