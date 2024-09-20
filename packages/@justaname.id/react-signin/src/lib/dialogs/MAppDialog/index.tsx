import { FC, Fragment, useEffect, useMemo } from 'react';
import { useAddMAppPermission, useEnsAuth, useIsMAppEnabled, useRecords } from '@justaname.id/react';
import { Badge, Button, CloseIcon, Dialog, DialogContent, DialogTitle, Flex, H2, P } from '@justaname.id/react-ui';
import { Footer } from '../../components';
import { isParseable } from '../../utils';
import { LoadingDialog } from '../LoadingDialog';

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
  const { connectedEns, isLoggedIn, isEnsAuthPending } = useEnsAuth();
  const { records , isRecordsPending} = useRecords({
    fullName: mApp || ''
  });
  const { isMAppEnabled, refetchIsMAppEnabled , isMAppEnabledPending } = useIsMAppEnabled({
    subname: connectedEns?.ens || '',
    mApp
  });
  const { addMAppPermission, isAddMAppPermissionPending } = useAddMAppPermission({
    mApp
  });

  const mAppDescription = useMemo(() => {
    return records?.texts?.find((text) => text.key === `mApp_description`)?.value;
  }, [records]);

  const mAppPermissions = useMemo((): string[] => {
    console.log(records)
    if (!records) {
      return [];
    }

    const permissions = records?.texts?.find((text) => text.key === `mApp_permissions`)?.value;
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
  }, [records]);

  console.log(isMAppEnabled, open)
  useEffect(() => {
    if(isLoggedIn){

      if(isMAppEnabledPending || isMAppEnabled === undefined){
        return
      }

      handleOpenDialog(!isMAppEnabled)
    }
    else{
      handleOpenDialog(false)
    }
  }, [isMAppEnabled, isLoggedIn, isMAppEnabledPending])

  if (( isEnsAuthPending || isRecordsPending || isMAppEnabledPending) && open) {
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
                {connectedEns?.ens}
              </Badge>

              <CloseIcon
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => handleOpenDialog(false)}
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
                  handleOpenDialog(false);
                  refetchIsMAppEnabled();
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