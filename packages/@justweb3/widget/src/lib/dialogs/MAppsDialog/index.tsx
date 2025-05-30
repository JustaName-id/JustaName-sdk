import { FC, Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { useEnabledMApps, useEnsAvatar, useRecords } from '@justaname.id/react';
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
  LoadingSpinner,
  P,
  SPAN,
  TrashIcon,
} from '@justweb3/ui';
import { DefaultDialog } from '../DefaultDialog';
import { JustWeb3Context, useJustWeb3 } from '../../providers';
import { useMApps } from '../../providers/MAppProvider';

export interface AuthorizeMAppDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
}

export const MAppsDialog: FC<AuthorizeMAppDialogProps> = ({
  open,
  handleOpenDialog,
}) => {
  const {
    config: { logo, disableOverlay },
    mApps,
  } = useContext(JustWeb3Context);
  const { handleOpenRevokeMAppDialog, handleOpenAuthorizeMAppDialog } =
    useMApps();
  const { connectedEns, isEnsAuthPending } = useJustWeb3();
  const { getRecords } = useRecords();
  const { enabledMApps, isMAppEnabledPending } = useEnabledMApps({
    ens: connectedEns?.ens || '',
  });
  const { getEnsAvatar } = useEnsAvatar();
  const [mAppsDescription, setMAppsDescription] = useState<
    { mApp: string; description: string }[] | undefined
  >(undefined);
  const [mAppsAvatar, setMAppsAvatar] = useState<
    { mApp: string; avatar: string }[] | undefined
  >(undefined);
  const mAppsToEnable = useMemo(() => {
    if (!mApps || !enabledMApps) {
      return undefined;
    }
    return mApps.filter((mApp) => !enabledMApps.includes(mApp));
  }, [mApps, enabledMApps]);

  const mAppsAlreadyEnabled = useMemo(() => {
    if (!mApps || !enabledMApps) {
      return undefined;
    }
    return mApps.filter((mApp) => enabledMApps.includes(mApp));
  }, [mApps, enabledMApps]);

  useEffect(() => {
    if (!mApps) {
      return;
    }
    Promise.allSettled(mApps.map((mApp) => getRecords({ ens: mApp }))).then(
      (records) => {
        setMAppsDescription(
          records
            ?.filter((record) => record.status === 'fulfilled')
            .map((record) => record.value)
            .map((record, index) => ({
              mApp: mApps[index],
              description:
                record?.records?.texts.find(
                  (text) => text.key === `mApp_description`
                )?.value || '',
            }))
        );
      }
    );

    Promise.allSettled(mApps.map((mApp) => getEnsAvatar({ name: mApp }))).then(
      (avatars) => {
        setMAppsAvatar(
          avatars
            ?.filter((avatar) => avatar.status === 'fulfilled')
            .map((avatar) => avatar.value)
            .map((avatar, index) => ({
              mApp: mApps[index],
              avatar: avatar || '',
            }))
        );
      }
    );
  }, [mApps]);

  // if (!connectedEns || isEnsAuthPending || isMAppEnabledPending) {
  //   return <LoadingDialog open={true} disableOverlay={disableOverlay} />;
  // }

  return (
    <DefaultDialog
      contentStyle={{
        maxWidth: '400px',
      }}
      open={open}
      disableOverlay={disableOverlay}
      handleClose={() => handleOpenDialog(false)}
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
      {!connectedEns || isEnsAuthPending || isMAppEnabledPending ? (
        <div
          style={{
            position: 'relative',
            padding: '24px',
          }}
        >
          <LoadingSpinner color={'var(--justweb3-primary-color)'} />
        </div>
      ) : (
        <Flex justify="space-between" direction="column" gap="20px">
          <Badge value={connectedEns?.ens}>
            <SPAN
              style={{
                fontSize: '10px',
                lineHeight: '10px',
                fontWeight: 900,
                color: 'var(--justweb3-primary-color)',
              }}
            >
              {connectedEns.ens}
            </SPAN>
          </Badge>
          <Flex justify="space-between" direction="column" gap="10px">
            <H2>mApps Configuration</H2>
          </Flex>

          <Flex direction="column" gap="15px">
            {mAppsToEnable && mAppsToEnable.length > 0 && (
              <Flex direction="column" gap="10px">
                <P>Installable mApps</P>

                <Flex direction="column" gap="5px">
                  {mAppsToEnable.map((mApp, index) => {
                    return (
                      <Fragment key={'mApp-' + mApp}>
                        <ClickableItem
                          title={mApp}
                          left={
                            <Avatar
                              src={
                                mAppsAvatar?.find(
                                  (avatar) => avatar.mApp === mApp
                                )?.avatar
                              }
                              size={34}
                            />
                          }
                          style={{
                            width: '100%',
                          }}
                          subtitle={
                            mAppsDescription?.find(
                              (description) => description.mApp === mApp
                            )?.description
                          }
                          clickable={false}
                          right={
                            <Button
                              variant={'secondary'}
                              size={'md'}
                              rightIcon={<ArrowIcon width={15} />}
                              onClick={() =>
                                handleOpenAuthorizeMAppDialog(mApp)
                              }
                            >
                              Install
                            </Button>
                          }
                        />
                      </Fragment>
                    );
                  })}
                </Flex>
              </Flex>
            )}

            {mAppsToEnable &&
            mAppsToEnable.length > 0 &&
            mAppsAlreadyEnabled &&
            mAppsAlreadyEnabled.length > 0 ? (
              <Divider />
            ) : null}

            {mAppsAlreadyEnabled && mAppsAlreadyEnabled.length > 0 && (
              <Flex direction="column" gap="10px">
                <P>Configured mApps</P>

                <Flex direction="column" gap="5px">
                  {mAppsAlreadyEnabled.map((mApp, index) => {
                    return (
                      <Fragment key={'mApp-' + mApp}>
                        <ClickableItem
                          title={mApp}
                          left={
                            <Avatar
                              src={
                                mAppsAvatar?.find(
                                  (avatar) => avatar.mApp === mApp
                                )?.avatar
                              }
                              size={34}
                            />
                          }
                          subtitle={
                            mAppsDescription?.find(
                              (description) => description.mApp === mApp
                            )?.description
                          }
                          clickable={false}
                          style={{
                            width: '100%',
                          }}
                          right={
                            <Button
                              variant={'destructive-outline'}
                              size={'md'}
                              rightIcon={<TrashIcon width={15} />}
                              onClick={() => handleOpenRevokeMAppDialog(mApp)}
                            >
                              Revoke
                            </Button>
                          }
                        />
                      </Fragment>
                    );
                  })}
                </Flex>
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </DefaultDialog>
  );
};
