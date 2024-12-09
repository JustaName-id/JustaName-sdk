import { FC, ReactNode, useContext, useMemo, useState } from 'react';
import { JustWeb3Context, useJustWeb3 } from '../../providers';
import {
  ArrowIcon,
  Avatar,
  Badge,
  ClickableItem,
  Flex,
  formatText,
  LoadingSpinner,
  LogoutIcon,
  MappIcon,
  P,
  Popover,
  PopoverTrigger,
  ProfileIcon,
  SPAN,
} from '@justweb3/ui';
import {
  useCanEnableMApps,
  useEnabledMApps,
  useEnsAvatar,
  useMountedAccount,
  useRecords,
} from '@justaname.id/react';
import { useDisconnect } from 'wagmi';
import { BasePopoverContent } from '../DefaultPopover';
import { PluginContext } from '../../providers/PluginProvider';
import { MAppsDialog } from '../../dialogs/MAppsDialog';
import { getChainIcon } from '../../icons/chain-icons';
import { getTextRecordIcon } from '../../icons/records-icons';
import MetadataCard from '../MetadataCard';
import { DefaultDialog } from '../../dialogs/DefaultDialog';
import styles from './JustWeb3Button.module.css';

export interface JustWeb3Buttonrops {
  children: ReactNode;
  style?: React.CSSProperties;
  logout?: () => void;
}

export const JustWeb3Button: FC<JustWeb3Buttonrops> = ({
  children,
  logout,
  style,
}) => {
  const [openMApps, setOpenMApps] = useState(false);
  const { plugins, mApps, config } = useContext(JustWeb3Context);
  const { createPluginApi } = useContext(PluginContext);
  const { address, isConnected } = useMountedAccount();
  const [mobileDialogOpen, setMobileDialogOpen] = useState(false);
  const { disconnect } = useDisconnect();
  const {
    connectedEns,
    signOut,
    isEnsAuthLoading,
    handleOpenSignInDialog,
    openEnsProfile,
  } = useJustWeb3();
  const { canEnableMApps, isCanEnableMAppsPending } = useCanEnableMApps({
    ens: connectedEns?.ens || '',
  });
  const { enabledMApps } = useEnabledMApps({
    ens: connectedEns?.ens || '',
  });
  const { records, isRecordsPending } = useRecords({ ens: connectedEns?.ens });
  const mAppsToEnable = useMemo(() => {
    if (!mApps || !enabledMApps) {
      return undefined;
    }
    return mApps.filter((mApp) => !enabledMApps.includes(mApp));
  }, [mApps, enabledMApps]);

  const { avatar } = useEnsAvatar({
    ens: connectedEns?.ens,
  });
  const hasTwitterOrX = useMemo(() => {
    return records?.sanitizedRecords.socials.find(
      (social) => social.key === 'com.twitter' || social.key === 'com.x'
    );
  }, [records]);

  const handleOpenMAppsDialog = (open: boolean) => {
    if (open !== openMApps) {
      setOpenMApps(open);
    }
  };

  if (isEnsAuthLoading || (connectedEns?.ens && isRecordsPending)) {
    return (
      <ClickableItem
        title={'loading'}
        clickable={false}
        style={{
          ...style,
        }}
        left={
          <div
            style={{
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              height: '32px',
              width: '32px',
            }}
          >
            <LoadingSpinner color={'var(--justweb3-primary-color)'} />
          </div>
        }
      />
    );
  }

  if (!connectedEns?.ens) {
    if (isConnected && address) {
      return (
        <ClickableItem
          title={
            <P
              style={{
                color: 'var(--justweb3-primary-color)',
                fontWeight: 700,
              }}
            >
              Sign In
            </P>
          }
          onClick={() => {
            handleOpenSignInDialog(true);
          }}
          style={{
            ...style,
          }}
          left={<Avatar />}
          right={
            <Badge
              withCopy={false}
              style={{
                padding: '5px',
                fontSize: '10px',
                fontWeight: 800,
              }}
            >
              {formatText(address, 4)}

              <LogoutIcon
                width={15}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  disconnect();
                  logout && logout();
                }}
              />
            </Badge>
          }
        />
      );
    }
    return children;
  }

  const connectedEnsBtn = (withDialog: boolean) => {
    const right = plugins.map((plugin) => {
      const component = plugin.components?.JustWeb3ButtonRight;
      if (!component) {
        return null;
      }

      return (
        <div
          key={'signin-item-' + plugin.name}
          onClick={() => {
            setMobileDialogOpen(false);
          }}
        >
          {component(createPluginApi(plugin.name))}
        </div>
      );
    });

    return (
      <ClickableItem
        title={
          <P
            style={{
              fontWeight: 700,
              color: 'var(--justweb3-primary-color)',
              fontSize: '12px',
            }}
          >
            {connectedEns.ens}
          </P>
        }
        left={<Avatar src={avatar} />}
        style={{
          backgroundColor: 'var(--justweb3-background-color)',
          color: 'var(--justweb3-primary-color)',
          ...style,
        }}
        right={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginRight: '10px',
            }}
          >
            {right}
          </div>
        }
        contentStyle={{
          alignItems: 'start',
        }}
        onClick={() => {
          if (withDialog) {
            setMobileDialogOpen(true);
          }
        }}
      />
    );
  };

  const connectedEnsProfileContent = (
    <Flex direction="column" gap={'10px'}>
      <Flex direction="column" gap={'10px'}>
        <Flex
          direction="column"
          gap="15px"
          padding="10px"
          border="1px solid var(--justweb3-foreground-color-4)"
          borderRadius="16px"
        >
          <Flex direction="row" align="center" gap="10px">
            <Avatar src={avatar} size={62} borderSize={'4px'} />
            <Flex direction="column" gap="5px" justify="flex-start">
              <P
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  textAlign: 'left',
                }}
              >
                {records?.sanitizedRecords.display ?? connectedEns.ens}
              </P>
              <Badge
                style={{
                  fontSize: '10px',
                  color: 'var(--justweb3-primary-color)',
                }}
                withCopy
                value={connectedEns.ens}
              >
                {connectedEns.ens}
              </Badge>
            </Flex>
          </Flex>
          <Flex
            direction="row"
            align="center"
            gap="10px"
            justify="flex-start"
            className={'justweb3scrollbar'}
            style={{
              overflowX: 'auto',
              width: '100%',
              paddingBottom: '0px',
            }}
          >
            <MetadataCard
              variant="address"
              title="Address"
              value={connectedEns.address}
              icon={getChainIcon('eth')}
            />
            {!!hasTwitterOrX && (
              <MetadataCard
                variant="social"
                title={hasTwitterOrX.key}
                value={hasTwitterOrX.value}
                icon={getTextRecordIcon(hasTwitterOrX.key)}
              />
            )}
            {!!records?.sanitizedRecords.email && (
              <MetadataCard
                variant="social"
                title="Email"
                value={records?.sanitizedRecords.email}
                icon={getTextRecordIcon('email')}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" gap={'10px'}>
        <ClickableItem
          left={
            <ProfileIcon width={20} color={'var(--justweb3-primary-color)'} />
          }
          title={'Profile'}
          style={{
            width: '100%',
          }}
          onClick={() =>
            openEnsProfile(connectedEns?.ens, connectedEns?.chainId)
          }
          right={
            <ArrowIcon
              width={20}
              color={'var(--justweb3-foreground-color-2)'}
            />
          }
        />
        {plugins.map((plugin) => {
          const component = plugin.components?.SignInMenu;
          if (!component) {
            return null;
          }

          return (
            <div
              key={'signin-item-' + plugin.name}
              onClick={() => {
                setMobileDialogOpen(false);
              }}
            >
              {component(createPluginApi(plugin.name))}
            </div>
          );
        })}

        <ClickableItem
          left={<MappIcon width={20} />}
          title={'mApps'}
          style={{
            width: '100%',
            display: 'none',
          }}
          onClick={() => setOpenMApps(true)}
          right={
            <Flex justify={'space-between'} align={'center'} gap={'5px'}>
              {mAppsToEnable && canEnableMApps && mAppsToEnable.length > 0 && (
                <SPAN
                  style={{
                    color: '#FEA801',
                    fontSize: '10px',
                    fontWeight: 900,
                  }}
                >
                  Configuration Required
                </SPAN>
              )}
              <ArrowIcon
                width={20}
                color={'var(--justweb3-foreground-color-2)'}
              />
            </Flex>
          }
          disabled={!canEnableMApps}
          loading={isCanEnableMAppsPending}
        />

        <ClickableItem
          style={{
            width: '100%',
          }}
          left={<LogoutIcon width={20} />}
          title={'Sign Out'}
          onClick={signOut}
          right={<ArrowIcon width={20} />}
        />
      </Flex>
    </Flex>
  );

  return (
    <>
      <MAppsDialog open={openMApps} handleOpenDialog={handleOpenMAppsDialog} />
      <div className={styles.desktopSection}>
        <Popover>
          <PopoverTrigger>{connectedEnsBtn(false)}</PopoverTrigger>
          <BasePopoverContent sideOffset={10} align={'end'} side="bottom">
            {connectedEnsProfileContent}
          </BasePopoverContent>
        </Popover>
      </div>
      <div className={styles.mobileSection}>
        {connectedEnsBtn(true)}
        <DefaultDialog
          open={mobileDialogOpen}
          disableOverlay={config.disableOverlay}
          handleClose={() => setMobileDialogOpen(false)}
          contentStyle={{
            width: '100%',
          }}
          header={<Flex />}
          fullScreen={false}
        >
          {connectedEnsProfileContent}
        </DefaultDialog>
      </div>
    </>
  );
};
