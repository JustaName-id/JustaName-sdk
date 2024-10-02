import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { JustaNameDialog, JustaNameLoadingDialog, JustSignInContext, useSignInWithJustaName, useMApps } from '@justaname.id/react-signin';
import { useEnsAuth, useEnsSignIn, useEnsSignOut, useRecords } from '@justaname.id/react';
import { Badge, Flex, H2, JustaNameLogoIcon, SPAN } from '@justaname.id/react-ui';
import { SelectCredentialItem } from '../../components/SelectCredentialItem';
import {
  Credentials, DiscordEthereumEip712Signature, GithubEthereumEip712Signature,
  JustVerifiedResponse, TelegramEthereumEip712Signature,
  TwitterEthereumEip712Signature
} from '../../types';
import { usePreviousState } from '../../hooks';
import { EmailCredentialItem } from '../../components/EmailCredentialItem';
import { useVerifyRecords } from '../../hooks/useVerifyRecords';
import { ChainId } from '@justaname.id/sdk';

export interface JustVerifiedDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  credentials: Credentials[],
  verificationBackendUrl: string;
  mApp: string;
  chainId: ChainId;
}

export const JustVerifiedDialog: FC<JustVerifiedDialogProps> = ({
                                                           open,
                                                           handleOpenDialog,
                                                           credentials,
  verificationBackendUrl,
  mApp,
  chainId
                                                         }) => {
  const { logo } = useContext(JustSignInContext)
  const [selectedCredential, setSelectedCredential] = useState<Credentials | undefined>(undefined)
  const previousSelectedCredential = usePreviousState(selectedCredential, [selectedCredential]);
  const { connectedEns, updateRecords } = useSignInWithJustaName();
  const { mAppsAlreadyEnabled, canEnableMApps} = useMApps()
  const { refetchRecords} = useRecords({
    fullName: connectedEns?.ens || "",
  })
  const [hasAttemptedSignIn, setHasAttemptedSignIn] = useState(false);
  const { connectedEns: connectedToVerification, isEnsAuthPending } = useEnsAuth({
    backendUrl: verificationBackendUrl,
    currentEnsRoute:"/auth/current"
  })
  const { signIn, isSignInPending} = useEnsSignIn({
    backendUrl: verificationBackendUrl,
    signinNonceRoute:"/auth/nonce",
    signinRoute:"/auth/signin"
  })

  const { signOut, isSignOutPending } = useEnsSignOut({
    backendUrl: verificationBackendUrl,
    signoutRoute:"/auth/signout"
  })


  const { verifiedRecords, refetchVerifyRecords, isVerifiedRecordsPending } = useVerifyRecords({
    credentials,
    ens: connectedEns?.ens || "",
    verificationBackendUrl,
    mApp: mApp,
    chainId
  })

  const initiateVerification = async (credential: Credentials) => {
    const eventSource = new EventSource(
      verificationBackendUrl + '/credentials/socials/'+ credential,
      { withCredentials: true }
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.redirectUrl) {
          setSelectedCredential(credential);
          const newWindow = window.open(data.redirectUrl, '_blank');

          const intervalId = setInterval(() => {
            if (newWindow?.closed) {
              clearInterval(intervalId);
              setSelectedCredential(undefined);
            }
          }, 500);
        } else if (data.result) {
          const result = data.result as JustVerifiedResponse;
          const credentialKey = result.dataKey;
          const credentialValue = result.verifiableCredential
          const socialKey = credentialKey.split('_'+mApp)[0];
          let socialValue = ''
          switch(credential) {
            case 'twitter': {
              const twitterCredential = data.result as JustVerifiedResponse<TwitterEthereumEip712Signature>;
              socialValue = twitterCredential.verifiableCredential.credentialSubject.username
              break;
            }
            case 'github': {
              const githubCredential = data.result as JustVerifiedResponse<GithubEthereumEip712Signature>;
              socialValue = githubCredential.verifiableCredential.credentialSubject.username
              break;
            }
            case 'telegram': {
              const telegramCredential = data.result as JustVerifiedResponse<TelegramEthereumEip712Signature>;
              socialValue = telegramCredential.verifiableCredential.credentialSubject.username
              break;
            }
            case 'discord': {
              const discordCredential = data.result as JustVerifiedResponse<DiscordEthereumEip712Signature>;
              socialValue = discordCredential.verifiableCredential.credentialSubject.username
              break;
            }
            default: {
              socialValue = '';
            }
          }

          if(mAppsAlreadyEnabled?.includes(mApp)){
            updateRecords({
              text: [
                {
                  key: socialKey,
                  value: socialValue
                }
              ]
            }).then(() => {
              refetchRecords()
              refetchVerifyRecords()
            })
          }
          else {
            updateRecords({
              text: [
                {
                  key: socialKey,
                  value: socialValue
                },
                {
                  key: credentialKey,
                  value: JSON.stringify(credentialValue)
                }
              ]
            }).then(() => {
              refetchRecords()
              refetchVerifyRecords()
            })
          }


          setSelectedCredential(undefined);
          eventSource.close();
        } else if (data.error) {
          setSelectedCredential(undefined);
          eventSource.close();
        }
      } catch (error) {
        setSelectedCredential(undefined);
      }
    };

    eventSource.onerror = (error) => {
      setSelectedCredential(undefined);
      refetchRecords();
      refetchVerifyRecords();
      eventSource.close();
    };
  };

  useEffect(() => {
    if(previousSelectedCredential && !selectedCredential){
      refetchRecords() || refetchVerifyRecords()
    }
  }, [selectedCredential,previousSelectedCredential])

  useEffect(() => {
    if (isSignInPending || isEnsAuthPending || isSignOutPending || !open || hasAttemptedSignIn) {
      return;
    }

    if (connectedEns) {
      if (!connectedToVerification) {
        setHasAttemptedSignIn(true);
        signIn({
          ens: connectedEns.ens,
        }).finally(() => {
            setHasAttemptedSignIn(false);
        })
      }

      if (connectedToVerification && connectedEns.ens !== connectedToVerification.ens) {
        signOut()
          .then(() => {
            setHasAttemptedSignIn(true);
            signIn({
              ens: connectedEns.ens,
            })
              .finally(() => {
                setHasAttemptedSignIn(false);
              })
          })
          .catch(() => {
            setHasAttemptedSignIn(false);
          });
      }
    }

    if (!connectedEns && connectedToVerification) {
      signOut()
    }
  }, [
    connectedEns,
    connectedToVerification,
    open,
    isSignInPending,
    isEnsAuthPending,
    isSignOutPending,
    hasAttemptedSignIn,
  ]);

  useEffect(() => {
    if (!connectedToVerification && !isSignInPending && !isEnsAuthPending && !isSignOutPending) {
      handleOpenDialog(false);
    }
  }, [connectedToVerification, isSignInPending, isEnsAuthPending, isSignOutPending]);

  useEffect(() => {
    if(!open){
      setSelectedCredential(undefined)
    }
  },[open])

  if ((!verifiedRecords || !connectedToVerification || isSignInPending || isEnsAuthPending || isSignOutPending || (canEnableMApps &&mAppsAlreadyEnabled=== undefined)) && open && connectedEns) {
    return <JustaNameLoadingDialog open={true} />
  }
  if (!connectedEns) {
    return null;
  }

  return (
    <JustaNameDialog open={open} handleClose={() => handleOpenDialog(false)} header={
      <div style={{
        paddingLeft:'24px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        flexGrow:1
      }}>
        {
          logo
            ? <img src={logo} alt="logo" style={{ height: '62px' , width: 'auto' }} />
            :         <JustaNameLogoIcon height={62} />

        }
      </div>
    }
    >
      <Flex
        direction={'column'}
      >
        <Flex
          style={{
            borderRadius: '16px',
            background: 'var(--justaname-background-color)',
            gap: '20px',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '500px'
          }}
        >
          <Flex
            justify="space-between"
            direction="row"
            gap="10px"
          >
            <Badge>
              <SPAN style={{
                fontSize:'10px',
                lineHeight:'10px',
                fontWeight: 900,
              }}>{connectedToVerification?.ens}</SPAN>
            </Badge>
          </Flex>


          <Flex
            justify="space-between"
            direction="column"
            gap="10px"
          >
            <H2>
              Verify your identity
            </H2>
          </Flex>

          <Flex
            direction={'column'}
            gap={'15px'}
            style={{
              maxHeight: '40vh',
              overflowY: 'scroll',
              overflowX: 'hidden'
            }}
          >
            {
              credentials.filter(credential => credential!=='email').map((credential, index) => {
                return (
                  <Fragment key={'credential-' + index}>
                    <SelectCredentialItem
                      selectedCredential={selectedCredential}
                      credential={credential}
                      onClick={() => {
                        initiateVerification(credential)
                      }}
                      disabled={selectedCredential !== undefined || isVerifiedRecordsPending}
                      credentialValue={verifiedRecords?.[credential]}

                    />
                  </Fragment>
                );
              })
            }

            {
              credentials.includes('email') && (
                <EmailCredentialItem
                  mApp={mApp}
                  mAppsAlreadyEnabled={mAppsAlreadyEnabled}
                  refetchRecords={refetchRecords}
                  refetchVerifyRecords={refetchVerifyRecords}
                  verificationBackendUrl={verificationBackendUrl}
                  selectedCredential={selectedCredential}
                  credentialValue={verifiedRecords?.email}
                  disabled={isVerifiedRecordsPending}
                />
              )
            }
          </Flex>
        </Flex>
      </Flex>
    </JustaNameDialog>
  )
}

