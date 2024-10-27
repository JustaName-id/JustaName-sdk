import { FC, Fragment, ReactNode, useContext, useMemo, useState } from 'react';
import { JustWeb3Context, useJustWeb3 } from '../../providers';
import {
  ArrowIcon,
  ArrowWhiteIcon,
  Avatar,
  Badge,
  Button,
  ClickableItem,
  Flex, formatText,
  LoadingSpinner,
  LogoutIcon,
  MappIcon,
  P,
  Popover,
  PopoverTrigger,
  SPAN, WalletIcon
} from '@justweb3/ui';
import {
  useCanEnableMApps,
  useEnabledMApps,
  useEnsAvatar,
  useMountedAccount,
  useRecords,
} from '@justaname.id/react';
import { useBalance } from 'wagmi';
import { formatUnits } from 'viem';
import { BasePopoverContent } from '../DefaultPopover';
import { PluginContext } from '../../providers/PluginProvider';
import { MAppsDialog } from '../../dialogs/MAppsDialog';
import { getChainIcon } from '../../icons/chain-icons';
import { getTextRecordIcon } from '../../icons/records-icons';
import MetadataCard from '../MetadataCard';

export interface JustWeb3Buttonrops {
  children: ReactNode;
}

export const JustWeb3Button: FC<JustWeb3Buttonrops> = ({ children }) => {
  const [openMApps, setOpenMApps] = useState(false);
  const { plugins, mApps } = useContext(JustWeb3Context);
  const { createPluginApi } = useContext(PluginContext);
  const { address, isConnected } = useMountedAccount();
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
  const { data, isLoading } = useBalance({
    address: connectedEns?.address as `0x${string}`,
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

  if (isEnsAuthLoading || isLoading || (connectedEns && isRecordsPending)) {
    // if (true) {
    return (
      <ClickableItem
        title={'loading'}
        clickable={false}
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

  if (!connectedEns) {
    if (address && isConnected) {
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

            <WalletIcon
              width={15}
              />
          </Badge>
          }
        />
      );
    }
    return children;
  }

  return (
    <>
      <MAppsDialog open={openMApps} handleOpenDialog={handleOpenMAppsDialog} />
      <Popover>
        <PopoverTrigger>
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
            }}
            contentStyle={{
              alignItems: 'start',
            }}
            right={
              <Badge
                withCopy={false}
                style={{
                  padding: '5px',
                  fontSize: '10px',
                  fontWeight: 800,
                }}
              >
                     {data ? (
                       <>
                         {parseFloat(
                           formatUnits(data?.value, data?.decimals)
                         ).toFixed(2)}{' '}
                         {data?.symbol}
                       </>
                     ) : (
                       '0'
                     )}
                   <LogoutIcon
                     width={15}
                     onClick={(e) => {
                       e.stopPropagation();
                       signOut();
                     }}
                   />
              </Badge>
            }
          />
        </PopoverTrigger>

        <BasePopoverContent sideOffset={10} align={'end'}>
          <Flex direction="column" gap={'10px'}>
            <Flex direction="column" gap={'10px'}>
              <Flex direction="row" align="center" justify="space-between">
                <P
                  style={{
                    fontSize: '12px',
                    fontWeight: 300,
                  }}
                >
                  Profile Overview
                </P>
                <Button
                  variant={'primary'}
                  size={'sm'}
                  rightIcon={<ArrowWhiteIcon width={15} />}
                  onClick={() => {
                    openEnsProfile(connectedEns?.ens, connectedEns?.chainId);
                  }}
                >
                  View Full Profile
                </Button>
              </Flex>
              {/* Profile */}
              <Flex
                direction="column"
                gap="15px"
                padding="10px"
                border="1px solid #E5E5E5"
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
              {plugins.map((plugin) => {
                const component = plugin.components?.SignInMenu;
                if (!component) {
                  return null;
                }

                return (
                  <Fragment key={'signin-item-' + plugin.name}>
                    {component(createPluginApi(plugin.name))}
                  </Fragment>
                );
              })}

              <ClickableItem
                left={<MappIcon width={20} />}
                title={'mApps'}
                style={{
                  width: '100%',
                }}
                onClick={() => setOpenMApps(true)}
                right={
                  <Flex justify={'space-between'} align={'center'} gap={'5px'}>
                    {mAppsToEnable &&
                      canEnableMApps &&
                      mAppsToEnable.length > 0 && (
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
        </BasePopoverContent>
      </Popover>
    </>
  );
};
