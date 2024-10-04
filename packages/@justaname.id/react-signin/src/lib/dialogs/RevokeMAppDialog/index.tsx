import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import {
  useCanEnableMApps,
  useIsMAppEnabled,
  useRecords,
  useRevokeMAppPermission
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
  TrashWhiteIcon
} from '@justaname.id/react-ui';
import { DefaultDialog } from '../DefaultDialog';

export interface RevokeMAppDialogProps {
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

export const RevokeMAppDialog: FC<RevokeMAppDialogProps> = ({
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
  const { revokeMAppPermission, isRevokeMAppPermissionPending } = useRevokeMAppPermission({
    mApp
  });

  const mAppDescription = useMemo(() => {
    return mAppRecords?.texts?.find((text) => text.key === `mApp_description`)?.value;
  }, [mAppRecords]);

  const mAppFieldsInEnsRecords = useMemo(() => {
    return records?.texts?.filter((text) => text.key.endsWith(`_${mApp}`));
  }, [records, mApp]);

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
          Revoke {mApp} mApp
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
        gap={"10px"}
      >
        <P>
          Removing this mApp will revoke all permissions granted to it.
        </P>
        {
          mAppFieldsInEnsRecords && mAppFieldsInEnsRecords.length > 0 &&
          <>
            <P>
              The following fields will be removed:
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

      <Flex
        justify="space-between"
        gap="10px"
      >

        <Button
          style={{
            width: '100%'
          }}
          size="lg"
          variant={"secondary"}
          onClick={() => {
            handleOpenDialogInternal(false);
          }}
        >
          Cancel
        </Button>

        <Button
          style={{
            width: '100%'
          }}
          size="lg"
          loading={isRevokeMAppPermissionPending}
          variant={"destructive"}
          onClick={() => {
            revokeMAppPermission({
              ens: connectedEns || ''
            }).then(() => {
              handleOpenDialogInternal(false);
            });
          }}
          rightIcon={<TrashWhiteIcon width={15}/>}
        >
          Revoke
        </Button>
      </Flex>
    </DefaultDialog>
  );
};