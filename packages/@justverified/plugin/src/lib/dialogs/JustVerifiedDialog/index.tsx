import { FC, Fragment, useContext, useEffect, useState } from 'react';
import {
  JustaNameDialog,
  JustWeb3Context,
  useJustWeb3,
  useMApps,
} from '@justweb3/widget';
import { useRecords } from '@justaname.id/react';
import { Badge, Flex, H2, JustaNameLogoIcon, SPAN } from '@justweb3/ui';
import { SelectCredentialItem } from '../../components/SelectCredentialItem';
import {
  Credentials,
  DiscordEthereumEip712Signature,
  GithubEthereumEip712Signature,
  TelegramEthereumEip712Signature,
  TwitterEthereumEip712Signature,
} from '../../types';
import { usePreviousState, useSocialVerification } from '../../hooks';
import { EmailCredentialItem } from '../../components/EmailCredentialItem';
import { useVerifyRecords } from '../../hooks/useVerifyRecords';
import { ChainId } from '@justaname.id/sdk';

export interface JustVerifiedDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  credentials: Credentials[];
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
  chainId,
}) => {
  const {
    config: { logo, disableOverlay },
  } = useContext(JustWeb3Context);
  const [selectedCredential, setSelectedCredential] = useState<
    Credentials | undefined
  >();
  const previousSelectedCredential = usePreviousState(selectedCredential, [
    selectedCredential,
  ]);
  const { connectedEns, updateRecords } = useJustWeb3();
  const { mAppsAlreadyEnabled } = useMApps();
  const { refetchRecords } = useRecords({
    ens: connectedEns?.ens || '',
  });

  const { verifiedRecords, refetchVerifyRecords, isVerifiedRecordsPending } =
    useVerifyRecords({
      credentials,
      ens: connectedEns?.ens || '',
      verificationBackendUrl,
      mApp,
      chainId,
    });

  console.log(verifiedRecords);

  const { verifySocial, isVerifyingSocialPending } = useSocialVerification({
    onWindowClose: () => {
      setSelectedCredential(undefined);
    },
    onError: () => {
      setSelectedCredential(undefined);
    },
    verificationBackendUrl,
  });

  useEffect(() => {
    if (previousSelectedCredential && !selectedCredential) {
      refetchRecords() || refetchVerifyRecords();
    }
  }, [selectedCredential, previousSelectedCredential]);

  const handleOpenDialogInternal = (_open: boolean) => {
    if (!_open) {
      setSelectedCredential(undefined);
    }
    handleOpenDialog(_open);
  };

  return (
    <JustaNameDialog
      open={open}
      handleClose={() => handleOpenDialogInternal(false)}
      disableOverlay={disableOverlay}
      contentStyle={{
        maxWidth: '400px',
        width: '100%',
        minWidth: '300px',
      }}
      header={
        <div
          style={{
            paddingLeft: '24px',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          {logo ? (
            <img
              src={logo}
              alt="logo"
              style={{ height: '62px', width: 'auto' }}
            />
          ) : (
            <JustaNameLogoIcon height={62} />
          )}
        </div>
      }
    >
      <Flex direction={'column'}>
        <Flex
          style={{
            borderRadius: '16px',
            background: 'var(--justweb3-background-color)',
            gap: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Flex justify="space-between" direction="row" gap="10px">
            <Badge value={connectedEns?.ens}>
              <SPAN
                style={{
                  fontSize: '10px',
                  lineHeight: '10px',
                  fontWeight: 900,
                  color: 'var(--justweb3-primary-color)',
                }}
              >
                {connectedEns?.ens}
              </SPAN>
            </Badge>
          </Flex>

          <Flex justify="space-between" direction="column" gap="10px">
            <H2>Verify your identity</H2>
          </Flex>

          <Flex
            direction={'column'}
            gap={'15px'}
            style={{
              maxHeight: '40vh',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {credentials
              .filter((credential) => credential !== 'email')
              .map((credential, index) => {
                return (
                  <Fragment key={'credential-' + index}>
                    <SelectCredentialItem
                      selectedCredential={selectedCredential}
                      credential={credential}
                      onClick={() => {
                        setSelectedCredential(credential);
                        verifySocial({
                          credential: credential as Credentials,
                        })
                          .then((value) => {
                            const credentialKey = value.dataKey;
                            const credentialValue = value.verifiableCredential;
                            const socialKey = credentialKey.split(
                              '_' + mApp
                            )[0];
                            let socialValue = '';
                            switch (credential) {
                              case 'twitter': {
                                socialValue = (
                                  credentialValue as TwitterEthereumEip712Signature
                                ).credentialSubject.username;
                                break;
                              }
                              case 'github': {
                                socialValue = (
                                  credentialValue as GithubEthereumEip712Signature
                                ).credentialSubject.username;
                                break;
                              }
                              case 'telegram': {
                                socialValue = (
                                  credentialValue as TelegramEthereumEip712Signature
                                ).credentialSubject.username;
                                break;
                              }
                              case 'discord': {
                                socialValue = (
                                  credentialValue as DiscordEthereumEip712Signature
                                ).credentialSubject.username;
                                break;
                              }
                              default: {
                                socialValue = '';
                              }
                            }
                            if (mAppsAlreadyEnabled?.includes(mApp)) {
                              updateRecords({
                                text: [
                                  {
                                    key: socialKey,
                                    value: socialValue,
                                  },
                                ],
                              }).then(() => {
                                refetchRecords();
                                refetchVerifyRecords();
                              });
                            } else {
                              updateRecords({
                                text: [
                                  {
                                    key: socialKey,
                                    value: socialValue,
                                  },
                                  {
                                    key: credentialKey,
                                    value: JSON.stringify(credentialValue),
                                  },
                                ],
                              }).then(() => {
                                refetchRecords();
                                refetchVerifyRecords();
                              });
                            }
                          })
                          .catch((error) => {
                            setSelectedCredential(undefined);
                          });
                      }}
                      disabled={
                        selectedCredential !== undefined ||
                        isVerifiedRecordsPending ||
                        isVerifyingSocialPending
                      }
                      credentialValue={verifiedRecords?.[credential]}
                    />
                  </Fragment>
                );
              })}

            {credentials.includes('email') && (
              <>
                {verifiedRecords?.email ? (
                  <SelectCredentialItem
                    credential={'email'}
                    selectedCredential={selectedCredential}
                    onClick={() => {
                      setSelectedCredential('email');
                    }}
                    credentialValue={verifiedRecords?.email}
                    disabled={isVerifiedRecordsPending}
                  />
                ) : (
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
                )}
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </JustaNameDialog>
  );
};
