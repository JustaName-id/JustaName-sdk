import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import {
  useAddMAppPermission,
  useCanEnableMApps,
  useIsMAppEnabled,
  useRecords,
} from '@justaname.id/react';
import {
  Badge,
  Button,
  ClickableItem,
  Flex,
  H2,
  JustaNameLogoIcon,
  P,
  SPAN,
} from '@justweb3/ui';
import { isParseable } from '../../utils';
import { DefaultDialog } from '../DefaultDialog';

export interface AuthorizeMAppDialogProps {
  mApp: {
    name: string;
    isOpen: boolean;
  };
  handleOpenDialog: (open: boolean) => void;
  logo?: string;
  isLoggedIn: boolean;
  handleOpenSignInDialog: (open: boolean) => void;
  connectedEns: string | undefined;
  isEnsAuthPending: boolean;
  disableOverlay?: boolean;
}

export const AuthorizeMAppDialog: FC<AuthorizeMAppDialogProps> = ({
  mApp: { name: mApp, isOpen: open },
  handleOpenDialog,
  logo,
  isLoggedIn,
  handleOpenSignInDialog,
  connectedEns,
  isEnsAuthPending,
  disableOverlay,
}) => {
  const [openOnConnect] = useState(open);
  const { records: mAppRecords, isRecordsPending: isMAppRecordsPending } =
    useRecords({
      ens: mApp || '',
    });
  const { records } = useRecords({
    ens: connectedEns || '',
  });
  const { canEnableMApps, isCanEnableMAppsPending } = useCanEnableMApps({
    ens: connectedEns || '',
  });
  const { isMAppEnabled, isMAppEnabledPending } = useIsMAppEnabled({
    ens: connectedEns || '',
    mApp,
  });
  const { addMAppPermission, isAddMAppPermissionPending } =
    useAddMAppPermission({
      mApp,
    });

  const mAppFieldsInEnsRecords = useMemo(() => {
    return records?.records.texts?.filter((text) =>
      text.key.endsWith(`_${mApp}`)
    );
  }, [records, mApp]);

  const mAppDescription = useMemo(() => {
    return mAppRecords?.records.texts?.find(
      (text) => text.key === `mApp_description`
    )?.value;
  }, [mAppRecords]);

  const mAppPermissions = useMemo((): string[] => {
    if (!mAppRecords) {
      return [];
    }

    const permissions = mAppRecords?.records.texts?.find(
      (text) => text.key === `mApp_permissions`
    )?.value;
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
  }, [
    isMAppEnabled,
    isLoggedIn,
    isMAppEnabledPending,
    connectedEns,
    isCanEnableMAppsPending,
    canEnableMApps,
  ]);

  if (isEnsAuthPending || !connectedEns || !records) {
    return null;
  }

  if (
    (isMAppRecordsPending || isCanEnableMAppsPending || isMAppEnabledPending) &&
    open
  ) {
    return null;
  }

  return (
    <DefaultDialog
      open={open}
      contentStyle={{
        maxWidth: '400px',
      }}
      handleClose={() => handleOpenDialogInternal(false)}
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
      disableOverlay={disableOverlay}
    >
      <Flex gap={'20px'} direction={'column'}>
        <Flex gap={'10px'} justify={'space-between'} direction={'column'}>
          <Badge value={connectedEns}>
            <SPAN
              style={{
                fontSize: '10px',
                lineHeight: '10px',
                fontWeight: 900,
                color: 'var(--justweb3-primary-color)',
              }}
            >
              {connectedEns}
            </SPAN>
          </Badge>
          <Flex justify="space-between" direction="column" gap="10px">
            <H2>Authorise {mApp} mApp</H2>
          </Flex>
        </Flex>

        <Flex style={{ padding: '10px 0' }} direction={'column'} gap={'10px'}>
          {!mAppDescription && !mAppPermissions.length && (
            <P>
              This mApp does not have any permissions or description, be
              cautious when authorising it.
            </P>
          )}

          {mAppDescription && (
            <Flex>
              <P>{mAppDescription}</P>
            </Flex>
          )}

          {mAppPermissions?.length > 0 ||
          (mAppFieldsInEnsRecords && mAppFieldsInEnsRecords?.length > 0) ? (
            <Flex
              direction={'column'}
              gap={'15px'}
              className={'justweb3scrollbar'}
              style={{
                maxHeight: '20vh',
                overflowY: 'auto',
              }}
            >
              {mAppPermissions.map((permission, index) => {
                return (
                  <Fragment key={'permission_' + index}>
                    <Flex
                      direction={'column'}
                      gap={'5px'}
                      style={{
                        padding: '10px',
                        borderRadius: '16px',
                        border: '1px solid var(--justweb3-foreground-color-4)',
                      }}
                    >
                      <P>Permission</P>

                      <P style={{ fontSize: '10px' }}>{permission}</P>
                    </Flex>
                  </Fragment>
                );
              })}

              {mAppFieldsInEnsRecords && mAppFieldsInEnsRecords.length > 0 && (
                <>
                  <P>Installing this mApp will remove the following fields:</P>
                  <Flex direction="column" gap="15px">
                    {mAppFieldsInEnsRecords.map((field) => {
                      return (
                        <Fragment key={'mapp-fields-' + field.key}>
                          <ClickableItem
                            title={field.key}
                            subtitle={field.value}
                            style={{
                              width: '100%',
                              borderRadius: '16px',
                            }}
                            clickable={false}
                          />
                        </Fragment>
                      );
                    })}
                  </Flex>
                </>
              )}
            </Flex>
          ) : null}
        </Flex>
        <Button
          style={{}}
          size="lg"
          loading={isAddMAppPermissionPending}
          onClick={() => {
            addMAppPermission({
              subname: connectedEns || '',
            }).then(() => {
              handleOpenDialogInternal(false);
            });
          }}
        >
          Authorise
        </Button>
      </Flex>
    </DefaultDialog>
  );
};
