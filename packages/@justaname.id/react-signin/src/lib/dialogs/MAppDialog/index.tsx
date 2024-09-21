import { FC, Fragment, useEffect, useMemo } from 'react';
import { useAddMAppPermission, useCanEnableMApps, useIsMAppEnabled, useRecords } from '@justaname.id/react';
import { Badge, Button, CloseIcon, Dialog, DialogContent, DialogTitle, Flex, H2, P, SPAN } from '@justaname.id/react-ui';
import { Footer } from '../../components';
import { isParseable } from '../../utils';
import { LoadingDialog } from '../LoadingDialog';
import { useSignInWithEns } from '../../providers';

export interface MAppDialogProps {
  mApp: string;
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
}

export const MAppDialog: FC<MAppDialogProps> = ({
                                                  mApp,
                                                  open,
                                                  handleOpenDialog
                                                }) => {
  const { connectedEns, isLoggedIn, isEnsAuthPending, handleOpenSignInDialog} = useSignInWithEns()
  const { records: mAppRecords , isRecordsPending: isMAppRecordsPending} = useRecords({
    fullName: mApp || ''
  });
  const { canEnableMApps, isCanEnableMAppsPending} = useCanEnableMApps({
    ens: connectedEns?.ens || ''
  })
  const { isMAppEnabled  , isMAppEnabledPending } = useIsMAppEnabled({
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
    if(!connectedEns){
      handleOpenSignInDialog(true)
      return
    }

    if (_open !== open) {
      handleOpenDialog(_open);
    }
  }

  useEffect(() => {
    if(connectedEns) {
      if(isCanEnableMAppsPending){
        return
      }

      if(!canEnableMApps && canEnableMApps !== undefined){
        handleOpenDialogInternal(false)
        return
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
  }, [isMAppEnabled, isLoggedIn, isMAppEnabledPending, connectedEns, isCanEnableMAppsPending, canEnableMApps])

  if(isEnsAuthPending || !connectedEns){
    return null
  }


  if (( isMAppRecordsPending || isCanEnableMAppsPending || isMAppEnabledPending) && open) {
    return <LoadingDialog open={true} />
  }

  return (
    <Dialog open={open}>
      <div style={{
        display: 'hidden'
      }}>
        <DialogTitle>

        </DialogTitle>
      </div>
      <DialogContent style={{
        padding: 0,
        maxWidth: '500px',
        transition: 'all 0.4 ease-in-out'
      }}>
        <Flex
          style={{
            padding: '0px 0 0 0',
            borderRadius: '16px',
            background: 'var(--justaname-foreground-color-4)'
          }}
          direction={'column'}
        >
          <Flex
            style={{
              padding: '40px 20px 20px 20px',
              // border: "1px solid var(--justaname-input-border-color)",
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
                }}>{connectedEns?.ens}</SPAN>
              </Badge>

              <CloseIcon
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => handleOpenDialogInternal(false)}
              />
            </Flex>

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
              direction={"column"}
              gap={"15px"}
              >

            {
              mAppPermissions.map((permission, index) => {
                return (<Fragment key={'permission_'+index}>
                    <Flex
                      direction={"column"}
                      gap={"5px"}
                      style={{
                        padding:"10px",
                        borderRadius:"16px",
                        border:"1px solid var(--justaname-foreground-color-4)"
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
                )
                })
            }
            </Flex>

            <Button
              style={{
                width:'100%',
              }}
              size="lg"
              loading={isAddMAppPermissionPending}
              onClick={() => {
                addMAppPermission({
                  subname: connectedEns?.ens || '',
                }).then(() => {
                  handleOpenDialogInternal(false);
                })
              }}
            >
              Authorise
            </Button>
          </Flex>


          <Footer />
        </Flex>
      </DialogContent>
    </Dialog>
  );
};