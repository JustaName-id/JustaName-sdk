import { FC, Fragment, useContext, useEffect, useMemo, useState } from 'react';
import {
  useEnsAvatar,
  useEnabledMApps,
  useRecords
} from '@justaname.id/react';
import {
  ArrowIcon,
  Avatar,
  Badge,
  Button,
  ClickableItem,
  Divider,
  Flex,
  H2,
  JustaNameLogoIcon,
  P,
  SPAN, TrashIcon
} from '@justaname.id/react-ui';
import { DefaultDialog } from '../DefaultDialog';
import { JustSignInContext, useSignInWithJustaName } from '../../providers';
import { LoadingDialog } from '../LoadingDialog';
import { useMApps } from '../../providers/MAppProvider';

export interface AuthorizeMAppDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
}

export const MAppsDialog: FC<AuthorizeMAppDialogProps> = ({
  open,
  handleOpenDialog
                                                                  }) => {

  const { logo, mApps } = useContext(JustSignInContext)
  const { handleOpenRevokeMAppDialog, handleOpenAuthorizeMAppDialog } = useMApps()
  const { connectedEns, isEnsAuthPending } = useSignInWithJustaName()
  const { getRecords } = useRecords();
  const { enabledMApps, isMAppEnabledPending} = useEnabledMApps({
    ens: connectedEns?.ens || ''
  });
  const { getEnsAvatar } = useEnsAvatar()
  const [mAppsDescription, setMAppsDescription] = useState<{ mApp: string; description:string}[] | undefined>(undefined);
  const [mAppsAvatar, setMAppsAvatar] = useState<{ mApp: string; avatar:string}[] | undefined>(undefined);
  const mAppsToEnable = useMemo(() => {
    if (!mApps || !enabledMApps) {
      return undefined;
    }
    return mApps.filter((mApp) => !enabledMApps.includes(mApp))
  }, [mApps, enabledMApps]);

  const mAppsAlreadyEnabled = useMemo(() => {
    if (!mApps || !enabledMApps) {
      return undefined;
    }
    return mApps.filter((mApp) => enabledMApps.includes(mApp))
  }, [mApps, enabledMApps]);

  useEffect(() => {
    if (!mApps) {
      return;
    }
    Promise.all(mApps.map((mApp) => getRecords({  fullName: mApp })))
      .then((records) => {
        setMAppsDescription(records.map((record, index) => ({ mApp: mApps[index], description: record?.records?.texts.find((text) => text.key === `mApp_description`)?.value || '' })))

      })

    Promise.all(mApps.map((mApp) => getEnsAvatar(mApp))).then((avatars) => {
      setMAppsAvatar(avatars.map((avatar, index) => ({ mApp: mApps[index], avatar: avatar || "" })))
    })
  }, [mApps]);


  if (!connectedEns || isEnsAuthPending || isMAppEnabledPending) {
    return <LoadingDialog open={true} />
  }

  return (
    <DefaultDialog open={open} handleClose={() => handleOpenDialog(false)} header={
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
        justify="space-between"
        direction="column"
        gap="20px"
        >
        <Badge>
          <SPAN
            style={{
              fontSize: '10px',
              lineHeight: '10px',
              fontWeight: 900,
            }}>
            {connectedEns.ens}
          </SPAN>
        </Badge>
        <Flex
          justify="space-between"
          direction="column"
          gap="10px"
        >
          <H2>
            mApps Configuration
          </H2>
        </Flex>

        <Flex
          direction="column"
          gap="15px"
          >
          { mAppsToEnable && mAppsToEnable.length > 0 &&
            <>
              <Divider />

              <Flex
                direction="column"
                gap="10px"
              >
                <P>
                  Installable mApps
                </P>

                <Flex
                  direction="column"
                  gap="5px"
                >
                  {
                    mAppsToEnable.map((mApp, index) => {
                      return (
                        <Fragment key={'mApp-'+mApp}>
                          <ClickableItem
                            name={mApp}
                            left={<Avatar
                              src={mAppsAvatar?.find((avatar) => avatar.mApp === mApp)?.avatar}
                              size="34px"
                            />}
                            status={mAppsDescription?.find((description) => description.mApp === mApp)?.description}
                            clickable={false}
                            right={<Button
                              variant={"secondary"}
                              size={"md"}
                              rightIcon={<ArrowIcon width={15}/>}
                              onClick={() => handleOpenAuthorizeMAppDialog(mApp)}
                            >
                              Install
                              </Button>
                            }
                            style={{
                              height: '42px'
                            }}
                          />
                        </Fragment>
                      )
                    })
                  }
                </Flex>

              </Flex>
            </>
          }

          { mAppsAlreadyEnabled && mAppsAlreadyEnabled.length > 0 &&
            <>
              <Divider />

              <Flex
                direction="column"
                gap="10px"
              >
                <P>
                  Installed mApps
                </P>

                <Flex
                  direction="column"
                  gap="5px"
                >
                  {
                    mAppsAlreadyEnabled.map((mApp, index) => {
                      return (
                        <Fragment key={'mApp-'+mApp}>
                          <ClickableItem
                            name={mApp}
                            left={<Avatar
                              src={mAppsAvatar?.find((avatar) => avatar.mApp === mApp)?.avatar}
                              size="34px"
                            />}
                            status={mAppsDescription?.find((description) => description.mApp === mApp)?.description}
                            clickable={false}
                            right={<Button
                              variant={"destructive-outline"}
                              size={"md"}
                              rightIcon={<TrashIcon width={15}/>}
                              onClick={() => handleOpenRevokeMAppDialog(mApp)}
                            >
                              Revoke
                            </Button>
                            }
                            style={{
                              height: '42px'
                            }}
                          />
                        </Fragment>
                      )
                    })
                  }
                </Flex>

              </Flex>
            </>
          }
        </Flex>

      </Flex>
    </DefaultDialog>
  );
};