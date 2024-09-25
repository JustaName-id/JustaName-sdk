import { FC, Fragment, useEffect, useMemo } from 'react';
import { useAddMAppPermission, useCanEnableMApps, useIsMAppEnabled, useRecords } from '@justaname.id/react';
import { Badge, Button, Flex, H2, P, SPAN } from '@justaname.id/react-ui';
import { isParseable } from '../../utils';
import { LoadingDialog } from '../LoadingDialog';
import { useSignInWithJustaName } from '../../providers';
import { DefaultDialog } from '../../components/DefaultDialog';

export interface AuthorizeMAppDialogProps {
  mApp: string;
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
}

export const AuthorizeMAppDialog: FC<AuthorizeMAppDialogProps> = ({
                                                  mApp,
                                                  open,
                                                  handleOpenDialog
                                                }) => {
  const { connectedEns, isLoggedIn, isEnsAuthPending, handleOpenSignInDialog } = useSignInWithJustaName();
  const { records: mAppRecords, isRecordsPending: isMAppRecordsPending } = useRecords({
    fullName: mApp || ''
  });
  const { canEnableMApps, isCanEnableMAppsPending } = useCanEnableMApps({
    ens: connectedEns?.ens || ''
  });
  const { isMAppEnabled, isMAppEnabledPending } = useIsMAppEnabled({
    ens: connectedEns?.ens || '',
    mApp
  });
  const { addMAppPermission, isAddMAppPermissionPending } = useAddMAppPermission({
    mApp
  });

  const mAppDescription = useMemo(() => {
    return mAppRecords?.texts?.find((text) => text.key === `mApp_description`)?.value;
  }, [mAppRecords]);

  const mAppPermissions = useMemo((): string[] => {
    if (!mAppRecords) {
      return [];
    }

    const permissions = mAppRecords?.texts?.find((text) => text.key === `mApp_permissions`)?.value;
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
        handleOpenDialogInternal(!isMAppEnabled);
      } else {
        handleOpenDialogInternal(false);
      }
    }
  }, [isMAppEnabled, isLoggedIn, isMAppEnabledPending, connectedEns, isCanEnableMAppsPending, canEnableMApps]);

  if (isEnsAuthPending || !connectedEns) {
    return null;
  }


  if ((isMAppRecordsPending || isCanEnableMAppsPending || isMAppEnabledPending) && open) {
    return <LoadingDialog open={true} />;
  }

  return (
    <DefaultDialog open={open} handleClose={() => handleOpenDialogInternal(false)} leftHeader={<Badge>
      <SPAN style={{
        fontSize: '10px',
        lineHeight: '10px',
        fontWeight: 900
      }}>{connectedEns?.ens}</SPAN>
    </Badge>}
                   headerStyle={{
                     paddingTop: '40px',
                     maxWidth: '500px'
                   }}
    >

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
      </Flex>

      <Button
        style={{
          width: '100%'
        }}
        size="lg"
        loading={isAddMAppPermissionPending}
        onClick={() => {
          addMAppPermission({
            subname: connectedEns?.ens || ''
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