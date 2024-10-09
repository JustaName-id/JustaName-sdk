import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useAddMAppPermission, useCanEnableMApps, useIsMAppEnabled, useRecords } from '@justaname.id/react';
import { Badge, Button, ClickableItem, Flex, H2, JustaNameLogoIcon, P, SPAN } from '@justaname.id/react-ui';
import { isParseable } from '../../utils';
import { DefaultDialog } from '../DefaultDialog';

export interface AuthorizeMAppDialogProps {
  mApp: {
    name: string;
    isOpen: boolean;
  }
  handleOpenDialog: (open: boolean) => void;
  logo?: string;
  isLoggedIn: boolean;
  handleOpenSignInDialog: (open: boolean) => void;
  connectedEns:  string | undefined;
  isEnsAuthPending: boolean;
}

export const AuthorizeMAppDialog: FC<AuthorizeMAppDialogProps> = ({
                                                  mApp: { name: mApp, isOpen: open },
                                                  handleOpenDialog,
                                                  logo,
                                                  isLoggedIn,
                                                  handleOpenSignInDialog,
                                                  connectedEns,
                                                  isEnsAuthPending
                                                }) => {
  const [openOnConnect] = useState(open);
  const { records: mAppRecords, isRecordsPending: isMAppRecordsPending } = useRecords({
    ens: mApp || ''
  });
  const { records } = useRecords({
    ens: connectedEns || ''
  })
  const { canEnableMApps, isCanEnableMAppsPending } = useCanEnableMApps({
    ens: connectedEns || ''
  });
  const { isMAppEnabled, isMAppEnabledPending } = useIsMAppEnabled({
    ens: connectedEns || '',
    mApp
  });
  const { addMAppPermission, isAddMAppPermissionPending } = useAddMAppPermission({
    mApp
  });

  const mAppFieldsInEnsRecords = useMemo(() => {
    return records?.records.texts?.filter((text) => text.key.endsWith(`_${mApp}`));
  }, [records, mApp]);

  const mAppDescription = useMemo(() => {
    return mAppRecords?.records.texts?.find((text) => text.key === `mApp_description`)?.value;
  }, [mAppRecords]);

  const mAppPermissions = useMemo((): string[] => {
    if (!mAppRecords) {
      return [];
    }

    const permissions = mAppRecords?.records.texts?.find((text) => text.key === `mApp_permissions`)?.value;
    if (!permissions) {
      return [];
    }

    if (!isParseable(permissions)) {
      return [];
    }

    const parsedPermissions = JSON.parse(permissions) as string[];
    if (!Array.isArray(parsedPermissions)) {
      return [];
    }

    return parsedPermissions;
  }, [mAppRecords]);

  const handleOpenDialogInternal = (_open: boolean) => {
    if (!connectedEns) {
      handleOpenSignInDialog(true);
      return;
    }

    if (_open !== open) {
      handleOpenDialog(_open);
    }
  };

  useEffect(() => {
    if (connectedEns) {
      if (isCanEnableMAppsPending) {
        return;
      }

      if (!canEnableMApps && canEnableMApps !== undefined) {
        handleOpenDialogInternal(false);
        return;
      }
      if (isLoggedIn) {
        if (isMAppEnabledPending || isMAppEnabled === undefined) {
          return;
        }
        handleOpenDialogInternal(!isMAppEnabled && openOnConnect);
      } else {
        handleOpenDialogInternal(false);
      }
    }
  }, [isMAppEnabled, isLoggedIn, isMAppEnabledPending, connectedEns, isCanEnableMAppsPending, canEnableMApps]);

  if (isEnsAuthPending || !connectedEns || !records) {
    return null;
  }

  if ((isMAppRecordsPending || isCanEnableMAppsPending || isMAppEnabledPending) && open) {
    return null;
  }

  return (
    <DefaultDialog open={open} handleClose={() => handleOpenDialogInternal(false)} header={
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

      <Badge>
        <SPAN
          style={{
            fontSize: '10px',
            lineHeight: '10px',
            fontWeight: 900,
          }}>
          {connectedEns}
        </SPAN>
      </Badge>
      <Flex
        justify="space-between"
        direction="column"
        gap="10px"
      >
        <H2>
          Authorise {mApp} mApp
        </H2>
      </Flex>

      <Flex
      >
        <P>
          {mAppDescription}
        </P>
      </Flex>

      <Flex
        direction={'column'}
        gap={'15px'}
        style={{
          maxHeight: '20vh',
          overflowY: 'scroll',
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For IE and Edge
          }}
      >

        {
          mAppPermissions.map((permission, index) => {
            return (<Fragment key={'permission_' + index}>
                <Flex
                  direction={'column'}
                  gap={'5px'}
                  style={{
                    padding: '10px',
                    borderRadius: '16px',
                    border: '1px solid var(--justaname-foreground-color-4)'
                  }}
                >

                  <P>
                    Permission
                  </P>

                  <P>
                    {permission}
                  </P>
                </Flex>
              </Fragment>
            );
          })
        }

        {
          mAppFieldsInEnsRecords && mAppFieldsInEnsRecords.length > 0 &&
          <>
            <P>
              Installing this mApp will remove the following fields:
            </P>
            <Flex
              direction="column"
              gap="10px"
            >
              {
                mAppFieldsInEnsRecords.map((field) => {
                  return (
                    <Fragment key={'mapp-fields-'+field.key}>
                      <ClickableItem
                        name={field.key}
                        status={field.value}
                        clickable={false}
                      />
                    </Fragment>
                  );
                })
              }
            </Flex>
          </>
        }
      </Flex>

      <Button
        style={{
          width: '100%'
        }}
        size="lg"
        loading={isAddMAppPermissionPending}
        onClick={() => {
          addMAppPermission({
            subname: connectedEns || ''
          }).then(() => {
            handleOpenDialogInternal(false);
          });
        }}
      >
        Authorise
      </Button>


    </DefaultDialog>
  );
};