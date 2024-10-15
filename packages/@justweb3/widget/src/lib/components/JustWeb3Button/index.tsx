import { FC, Fragment, ReactNode, useContext, useMemo, useState } from 'react';
import { JustWeb3Context, useJustWeb3 } from '../../providers';
import {
  ArrowIcon,
  Avatar,
  Badge,
  Button,
  ClickableItem,
  Flex,
  LoadingSpinner,
  LogoutIcon, MappIcon,
  P,
  Popover,
  PopoverTrigger, SPAN
} from '@justweb3/ui';
import { useEnsAvatar, useCanEnableMApps, useEnabledMApps, useMountedAccount } from '@justaname.id/react';
import { useBalance } from 'wagmi';
import { formatUnits } from 'viem';
import { BasePopoverContent } from '../DefaultPopover';
import { PluginContext } from '../../providers/PluginProvider';
import { MAppsDialog } from '../../dialogs/MAppsDialog';

export interface JustWeb3Buttonrops {
  children: ReactNode;
}

export const JustWeb3Button: FC<JustWeb3Buttonrops> = ({
  children
}) => {
  const [openMApps, setOpenMApps] = useState(false);
  const { plugins, mApps } = useContext(JustWeb3Context)
  const { createPluginApi } = useContext(PluginContext)
  const { address } = useMountedAccount()
  const { connectedEns, signOut, isEnsAuthPending, handleOpenSignInDialog } = useJustWeb3();
  const { canEnableMApps, isCanEnableMAppsPending } = useCanEnableMApps({
    ens: connectedEns?.ens || ''
  })
  const { enabledMApps } = useEnabledMApps({
    ens: connectedEns?.ens || "",
  })
  const mAppsToEnable = useMemo(() => {
    if (!mApps || !enabledMApps) {
      return undefined;
    }
    return mApps.filter((mApp) => !enabledMApps.includes(mApp))
  }, [mApps, enabledMApps]);

  const { avatar } = useEnsAvatar({
    ens: connectedEns?.ens
  });
  const { data, isLoading } = useBalance({
    address: connectedEns?.address as `0x${string}`
  });


  const handleOpenMAppsDialog = (open: boolean) => {
    if (open !== openMApps) {
      setOpenMApps(open)
    }
  }

  if (isEnsAuthPending || isLoading) {
    return <ClickableItem
      name={'loading'}
      clickable={false}
      style={{
        maxWidth: '278px',
        width: '100%'
      }}
      left={
        <div style={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          height: '30px',
          width: '30px'
        }}>
          <LoadingSpinner color={'var(--justweb3-primary-color)'} />
        </div>
      }
    />;
  }

  if (!connectedEns) {
    if (address) {
      return <ClickableItem
        name={'Sign In'}
        onClick={() => handleOpenSignInDialog(true)}
        left={<Avatar
          size="28px"
          bgColor={avatar ? 'var(--justweb3-foreground-color-4)' : 'var(--justweb3-primary-color)'}
          borderColor={avatar ? 'var(--justweb3-foreground-color-4)' : 'var(--justweb3-primary-color)'}
          color="#ffffff"
        />}
        style={{
          maxWidth: '278px',
          width: '100%'
        }}
      />
    }
    return children;
  }

  return (
    <>
      <MAppsDialog
        open={openMApps}
        handleOpenDialog={handleOpenMAppsDialog}
      />
      <Popover>
        <PopoverTrigger
          style={{
            maxWidth: '300px',
            width: '100%'
          }}
        >
          <ClickableItem
            name={connectedEns?.ens}

            left={<Avatar
              src={avatar}
              size="28px"
              bgColor={avatar ? 'var(--justweb3-foreground-color-4)' : 'var(--justweb3-primary-color)'}
              borderColor={avatar ? 'var(--justweb3-foreground-color-4)' : 'var(--justweb3-primary-color)'}
              color="#ffffff"
            />}

            style={{
              maxWidth: '400px',
              backgroundColor: 'var(--justweb3-background-color)',
            }}

            contentStyle={{
              alignItems: "start"
            }}
            right={<Flex
              align={"center"}
              justify={"center"}
              gap={"10px"}
            >
              <SPAN>
                {
                  data ?

                    <>{parseFloat(formatUnits(data?.value, data?.decimals)).toFixed(2)} {data?.symbol}</>
                    :
                    '0'
                }
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

        <BasePopoverContent style={{ minWidth: "400px" }}>
          <Flex
            direction="column"
            gap={"20px"}
          >
            <Flex
              direction='column'
              gap={'10px'}
            >
              <Flex
                direction='row'
                align='center'
                justify='space-between'
              >
                <P
                  style={{
                    color: '#0F172A',
                    fontSize: '12px',
                    fontWeight: 300,
                  }}>
                  Profile Overview
                </P>
                <Button
                  variant={'primary'}
                  rightIcon={<ArrowIcon width={15} fill='white' color='white' />}
                  style={{
                    fontSize: '10px',
                    padding: "5px 10px",
                    height: "22px"
                  }}
                  onClick={() => { }}
                >
                  View Full Profile
                </Button>
              </Flex>
              {/* Profile */}
              <Flex direction='column' gap='15px' padding="10px" border="1px solid #E5E5E5" borderRadius='10px' >
                <Flex direction='row' align='center' gap="10px">
                  <Avatar
                    src={avatar}
                    size="55px"
                    bgColor={avatar ? 'var(--justweb3-foreground-color-4)' : 'var(--justweb3-primary-color)'}
                    borderColor={avatar ? 'var(--justweb3-foreground-color-4)' : 'var(--justweb3-primary-color)'}
                    color="#ffffff"
                  />
                  <Flex direction='column' gap='5px'>
                    <P style={{
                      color: 'black',
                      fontSize: '14px',
                      fontWeight: 700,
                    }}>{connectedEns.ens}</P>
                    <Badge variant='default' style={{
                      fontSize: "10px",
                      color: "#3280F4",

                    }} withCopy value={connectedEns.ens}>{connectedEns.ens}</Badge>
                  </Flex>
                </Flex>

              </Flex>

            </Flex>
            <Flex
              direction="column"
              gap={"10px"}
            >
              <ClickableItem
                left={<MappIcon width={20} />}
                name={'mApps'}
                onClick={() => setOpenMApps(true)}
                right={<Flex
                  justify={"space-between"}
                  align={"center"}
                  gap={"5px"}
                >
                  {
                    mAppsToEnable && canEnableMApps && mAppsToEnable.length > 0 &&
                    <SPAN style={{
                      color: '#FEA801',
                      fontSize: '10px',
                      fontWeight: 900,
                    }}>
                      Configuration Required
                    </SPAN>
                  }
                  <ArrowIcon width={20} />
                </Flex>}
                disabled={!canEnableMApps}
                loading={isCanEnableMAppsPending}
              />
              {
                plugins.map((plugin) => {
                  const component = plugin.components?.SignInMenu;

                  if (!component) {
                    return null;
                  }

                  return (<Fragment key={"signin-item-" + plugin.name}>{component(createPluginApi(plugin.name))}</Fragment>)
                })
              }

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