import { FC, Fragment, ReactNode, useContext, useMemo, useState } from 'react';
import { JustWeb3Context, useJustWeb3 } from '../../providers';
import {
  ArrowIcon,
  ArrowWhiteIcon,
  Avatar,
  Badge,
  Button,
  ClickableItem,
  Flex,
  LinkCard,
  LoadingSpinner,
  LogoutIcon,
  MappIcon,
  P,
  Popover,
  PopoverTrigger,
  SPAN,
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

export interface JustWeb3Buttonrops {
  children: ReactNode;
}

export const JustWeb3Button: FC<JustWeb3Buttonrops> = ({ children }) => {
  const [openMApps, setOpenMApps] = useState(false);
  const { plugins, mApps } = useContext(JustWeb3Context);
  const { createPluginApi } = useContext(PluginContext);
  const { address } = useMountedAccount();
  const {
    connectedEns,
    signOut,
    isEnsAuthPending,
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

  if (isEnsAuthPending || isLoading || (connectedEns && isRecordsPending)) {
    // if (true) {
    return (
      <ClickableItem
        name={'loading'}
        clickable={false}
        style={{
          maxWidth: '278px',
          width: '100%',
        }}
        left={
          <div
            style={{
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              height: '30px',
              width: '30px',
            }}
          >
            <LoadingSpinner color={'var(--justweb3-primary-color)'} />
          </div>
        }
      />
    );
  }

  if (!connectedEns) {
    if (address) {
      return (
        <ClickableItem
          name={'Sign In'}
          onClick={() => handleOpenSignInDialog(true)}
          left={
            <Avatar
              size="28px"
              bgColor={
                avatar
                  ? 'var(--justweb3-foreground-color-4)'
                  : 'var(--justweb3-primary-color)'
              }
              borderColor={
                avatar
                  ? 'var(--justweb3-foreground-color-4)'
                  : 'var(--justweb3-primary-color)'
              }
              color="#ffffff"
            />
          }
          style={{
            maxWidth: '278px',
            width: '100%',
          }}
        />
      );
    }
    return children;
  }

  console.log(connectedEns?.ens, records);
  return (
    <>
      <MAppsDialog open={openMApps} handleOpenDialog={handleOpenMAppsDialog} />
      {/*{records && (*/}
      {/*  <ProfileDialog*/}
      {/*    open={openProfile}*/}
      {/*    handleOpenDialog={handleOpenProfileDialog}*/}
      {/*  />*/}
      {/*)}*/}
      <Popover>
        <PopoverTrigger
          style={{
            maxWidth: '278px',
            width: '100%',
          }}
        >
          <ClickableItem
            name={connectedEns?.ens}
            left={
              <Avatar
                src={avatar}
                size="28px"
                bgColor={
                  avatar
                    ? 'var(--justweb3-foreground-color-4)'
                    : 'var(--justweb3-primary-color)'
                }
                borderColor={
                  avatar
                    ? 'var(--justweb3-foreground-color-4)'
                    : 'var(--justweb3-primary-color)'
                }
                color="#ffffff"
              />
            }
            style={{
              maxWidth: '278px',
              backgroundColor: 'var(--justweb3-background-color)',
            }}
            contentStyle={{
              alignItems: 'start',
            }}
            right={
              <Flex align={'center'} justify={'center'} gap={'10px'}>
                <SPAN>
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
                </SPAN>

                <LogoutIcon
                  width={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    signOut();
                  }}
                />
              </Flex>
            }
          />
        </PopoverTrigger>

        <BasePopoverContent sideOffset={10} align={'end'}>
          <Flex direction="column" gap={'10px'}>
            <Flex direction="column" gap={'10px'}>
              <Flex direction="row" align="center" justify="space-between">
                <P
                  style={{
                    color: '#0F172A',
                    fontSize: '12px',
                    fontWeight: 300,
                  }}
                >
                  Profile Overview
                </P>
                <Button
                  variant={'primary'}
                  rightIcon={<ArrowWhiteIcon width={15} />}
                  style={{
                    fontSize: '8px',
                    padding: '5px 10px',
                    height: '25px',
                  }}
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
                  <div
                    style={{
                      boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
                      border: '2px solid white',
                      width: '62px',
                      height: '62px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      boxSizing: 'content-box',
                    }}
                  >
                    <Avatar
                      src={avatar}
                      size={'62px'}
                      border={false}
                      bgColor={'white'}
                    />
                  </div>
                  <Flex direction="column" gap="5px" justify="flex-start">
                    <P
                      style={{
                        color: 'black',
                        fontSize: '14px',
                        fontWeight: 700,
                        textAlign: 'left',
                      }}
                    >
                      {records?.sanitizedRecords.display ?? connectedEns.ens}
                    </P>
                    <Badge
                      variant="default"
                      style={{
                        fontSize: '10px',
                        color: '#3280F4',
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
                  <LinkCard
                    variant="address"
                    title="Address"
                    value={connectedEns.address}
                    icon={getChainIcon('eth')}
                  />
                  {!!hasTwitterOrX && (
                    <LinkCard
                      variant="social"
                      title={hasTwitterOrX.key}
                      value={hasTwitterOrX.value}
                      icon={getTextRecordIcon(hasTwitterOrX.key)}
                    />
                  )}
                  {!!records?.sanitizedRecords.email && (
                    <LinkCard
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
                left={<MappIcon width={20} />}
                name={'mApps'}
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
                    <ArrowIcon width={20} />
                  </Flex>
                }
                disabled={!canEnableMApps}
                loading={isCanEnableMAppsPending}
              />
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
                left={<LogoutIcon width={20} />}
                name={'Sign Out'}
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
