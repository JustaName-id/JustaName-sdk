import {
  useAccountEnsNames,
  useAccountSubnames,
  useEnsAvatar,
  useEnsSubnames,
  useMountedAccount,
  useRecords,
} from '@justaname.id/react';
import {
  ChainId,
  SanitizedRecords,
  SubnameRecordsRoute,
} from '@justaname.id/sdk';
import {
  A,
  Avatar,
  Button,
  ExpandableText,
  Flex,
  LocationIcon,
  P,
  PersonEditIcon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@justweb3/ui';
import React, { Fragment, useContext, useEffect, useMemo } from 'react';
import { getChainIcon } from '../../../icons/chain-icons';
import { getContentHashIcon } from '../../../icons/contentHash-icons';
import { getTextRecordIcon } from '../../../icons/records-icons';
import { JustaPlugin } from '../../../plugins';
import { useJustWeb3 } from '../../../providers';
import { PluginContext } from '../../../providers/PluginProvider';
import MetadataCard from '../../MetadataCard';
import MembersSection from '../MembersSection';
import { ProfileSection } from '../ProfileSection';
import styles from './ContentSection.module.css';

export interface ContentProps {
  fullSubname?: string;
  chainId: 1 | 11155111 | undefined;
  records: SubnameRecordsRoute['response'];
  sanitized: SanitizedRecords;
  onEdit?: () => void;
  editMode?: boolean;
  plugins: JustaPlugin[];
}

const ENS_MAINNET_RESOLVER = '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41';
const ENS_SEPOLIA_RESOLVER = '0x8FADE66B79cC9f707aB26799354482EB93a5B7dD';

const ContentSection: React.FC<ContentProps> = ({
  fullSubname = '',
  chainId = 1,
  editMode,
  sanitized,
  records,
  onEdit,
  plugins,
}) => {
  const { chainId: connectedWalletChainId } = useMountedAccount();
  const { accountSubnames } = useAccountSubnames();
  const { accountEnsNames } = useAccountEnsNames();
  const [tab, setTab] = React.useState('Main');
  const { openEnsProfile } = useJustWeb3();
  // const { offchainResolvers } = useOffchainResolvers()
  const isProfileSelf = useMemo(() => {
    const tempEns = accountEnsNames
      ?.map((ens) => ens.ens)
      .find((e) => e === fullSubname);

    if (tempEns) {
      if (!accountSubnames?.find((subname) => subname.ens === tempEns)) {
        return chainId === connectedWalletChainId;
      }
    }

    return (
      (accountSubnames?.map((subname) => subname.ens).includes(fullSubname) ||
        accountEnsNames?.map((ens) => ens.ens).includes(fullSubname)) &&
      !(chainId === 1 && connectedWalletChainId === 11155111) &&
      !(chainId === 11155111 && connectedWalletChainId !== 11155111)
    );
  }, [
    fullSubname,
    accountSubnames,
    accountEnsNames,
    connectedWalletChainId,
    chainId,
  ]);

  const { data } = useEnsSubnames({
    ensDomain: decodeURIComponent(fullSubname),
    chainId: chainId as ChainId,
    isClaimed: true,
    limit: 15,
    enabled: fullSubname.split('.').length === 2,
  });

  const isProfileCommunity = useMemo(() => {
    return (
      data?.pages &&
      data?.pages
        .flatMap((subnameData) => subnameData.data)
        .flatMap((sub) => sub.ens).length > 0
    );
  }, [data]);

  const communityName = useMemo(() => {
    if (fullSubname.split('.').length === 2) return '';
    return `${fullSubname.split('.')[1]}.${fullSubname.split('.')[2]}`;
  }, [fullSubname]);

  const { records: communityRecords } = useRecords({
    ens: communityName,
    chainId,
    enabled: !isProfileCommunity,
  });

  const memberTabName = useMemo(() => {
    return `Members (${
      data?.pages?.flatMap((subnameData) => subnameData)[0].pagination
        .totalCount
    })`;
  }, [data]);

  const { createPluginApi } = useContext(PluginContext);

  const { sanitizeEnsImage } = useEnsAvatar();

  useEffect(() => {
    setTab('Main');
  }, [fullSubname, chainId]);

  const hasTabs = useMemo(() => {
    return (
      plugins.some((plugin) => plugin.components?.ProfileTab) ||
      isProfileCommunity
    );
  }, [plugins, isProfileCommunity]);

  const MainTab = (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Flex
        direction={'column'}
        gap={'10px'}
        style={{
          flex: '1',
        }}
      >
        {plugins.map((plugin) => {
          const component = plugin.components?.ProfileSection;
          if (!component) {
            return null;
          }

          return (
            <Fragment key={'profile-item-' + plugin.name}>
              {component(
                createPluginApi(plugin.name),
                fullSubname,
                chainId,
                sanitized.ethAddress.value
              )}
            </Fragment>
          );
        })}

        {sanitized?.socials?.length > 0 && (
          <ProfileSection
            title={'Socials'}
            items={sanitized?.socials
              ?.filter((social) => social.value !== '')
              .map((social) => (
                <MetadataCard
                  key={social.key}
                  variant={'social'}
                  title={social.key}
                  value={social.value}
                  icon={getTextRecordIcon(social.key)}
                />
              ))}
          />
        )}

        <ProfileSection
          title={'Addresses'}
          items={sanitized?.allAddresses?.map((address) => {
            return (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <MetadataCard
                        key={address.id}
                        variant={'address'}
                        title={address.name}
                        value={address.value}
                        icon={getChainIcon(address.symbol)}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent style={{ zIndex: 9999 }}>
                    <P
                      style={{
                        fontSize: '9px',
                        fontWeight: 900,
                        lineHeight: '150%',
                        color: 'inherit',
                      }}
                    >
                      {address.symbol.toUpperCase()}: {address.value}
                    </P>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        />
        {sanitized?.allTexts?.length > 0 && (
          <ProfileSection
            title={'Custom'}
            items={sanitized?.allTexts
              ?.sort((a, b) => a.key.localeCompare(b.key))
              .map((other) => (
                <MetadataCard
                  key={other.key}
                  variant={'other'}
                  title={other.key}
                  value={other.value}
                />
              ))}
          />
        )}

        {sanitized?.contentHash && (
          <ProfileSection
            title={'Content Hash'}
            items={[
              <MetadataCard
                key={sanitized.contentHash.protocolType}
                variant={'contentHash'}
                title={'Content Hash'}
                value={
                  sanitized.contentHash.protocolType +
                  '://' +
                  sanitized.contentHash.decoded
                }
                icon={getContentHashIcon(sanitized.contentHash.protocolType)}
              />,
            ]}
          />
        )}
      </Flex>
    </div>
  );

  return (
    <Flex
      direction={'column'}
      gap={'10px'}
      style={{
        overflow: 'hidden',
        maxHeight: '100%',
        height: '100%',
      }}
    >
      <div className={styles.container}>
        <div className={styles.bannerContainer}>
          <img
            src={
              sanitizeEnsImage({
                name: fullSubname,
                chainId,
                image: sanitized?.header || sanitized?.banner,
              }) ||
              'https://justaname-bucket.s3.eu-central-1.amazonaws.com/default-banner.png'
            }
            alt="profile-banner"
            className={styles.bannerImage}
          />
          <Flex
            gap="12px"
            align="center"
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
            }}
          >
            {!editMode && isProfileSelf && (
              <Button
                variant={'secondary'}
                size={'sm'}
                onClick={() => {
                  onEdit && onEdit();
                }}
                style={{
                  color: 'var(--justweb3-primary-color)',
                  height: '16px',
                  fontSize: '12px',
                  border: 'none',
                }}
                leftIcon={<PersonEditIcon height={16} width={16} />}
              >
                Edit Profile
              </Button>
            )}
          </Flex>
        </div>
        <Flex
          direction={'column'}
          gap={'5px'}
          style={{
            marginTop: '-50px',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex' }}>
            <Avatar
              src={sanitizeEnsImage({
                image: sanitized?.avatar,
                name: fullSubname,
                chainId,
              })}
              size={74}
              borderSize={'4px'}
              style={{
                margin: '0 15px',
              }}
            />
            <div
              style={{
                display: 'flex',
                height: 'fit-content',
                marginLeft: '-35px',
                marginTop: 'auto',
                marginBottom: '5px',
              }}
            >
              {plugins.map((plugin) => {
                const component = plugin.components?.Badge;
                if (!component) {
                  return null;
                }
                const componentApi = component(
                  createPluginApi(plugin.name),
                  fullSubname,
                  chainId,
                  sanitized.ethAddress.value
                );

                if (!componentApi) {
                  return null;
                }

                return (
                  <Fragment key={'profile-badge-' + plugin.name + fullSubname}>
                    {componentApi}
                  </Fragment>
                );
              })}
            </div>
          </div>
          {communityName.length > 0 && (
            <button
              onClick={() => {
                openEnsProfile(communityName, chainId);
              }}
              className={styles.communityBtn}
            >
              <Avatar
                src={sanitizeEnsImage({
                  image: communityRecords?.sanitizedRecords.avatar,
                  name: communityName,
                  chainId,
                })}
                style={{
                  border: 'none',
                  padding: 0,
                }}
                size={10}
              />
              {communityName}
            </button>
          )}
          <Flex direction={'row'} justify={'space-between'} align={'center'}>
            <P
              style={{
                fontSize: '20px',
                fontWeight: '700',
                lineHeight: '20px',
              }}
            >
              {decodeURIComponent(sanitized?.display || fullSubname)}
            </P>
            <Flex direction={'row'} gap={'5px'} align={'center'}>
              {plugins.map((plugin) => {
                const component = plugin.components?.ProfileHeader;
                if (!component) {
                  return null;
                }

                return (
                  <Fragment key={'profile-item-' + plugin.name}>
                    {component(
                      createPluginApi(plugin.name),
                      fullSubname,
                      chainId,
                      sanitized.ethAddress.value
                    )}
                  </Fragment>
                );
              })}
            </Flex>
          </Flex>
          {sanitized?.description && (
            <ExpandableText text={sanitized?.description} maxLength={100} />
          )}

          {sanitized?.url &&
            (() => {
              try {
                const url = sanitized.url.startsWith('http')
                  ? sanitized.url
                  : `https://${sanitized.url}`;
                new URL(url);
                return (
                  <A
                    href={url}
                    target={'_blank'}
                    style={{
                      fontSize: '10px',
                      color: 'var(--justweb3-primary-color)',
                      textDecoration: 'underline',
                      width: 'fit-content',
                      fontWeight: 500,
                      lineHeight: '100%',
                    }}
                  >
                    {sanitized.url}
                  </A>
                );
              } catch (e) {
                console.error('Invalid URL:', sanitized.url);
                return (
                  <P
                    style={{
                      fontSize: '10px',
                      fontWeight: 500,
                      textDecoration: 'underline',
                      width: 'fit-content',
                    }}
                  >
                    {sanitized.url}
                  </P>
                );
              }
            })()}

          {records?.records.texts?.find((text) => text.key === 'location') && (
            <Flex direction={'row'} gap={'5px'} align={'center'}>
              <LocationIcon width={10} height={10} />
              <P
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                }}
              >
                {
                  records?.records.texts?.find(
                    (text) => text.key === 'location'
                  )?.value
                }
              </P>
            </Flex>
          )}
        </Flex>
      </div>
      <div
        style={{
          flex: '1',
          overflow: 'hidden',
          maxHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {hasTabs ? (
          <Tabs
            defaultValue={'Main'}
            value={tab}
            onValueChange={(value) => setTab(value)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '0px',
              overflow: 'hidden',
              flex: '1',
            }}
          >
            <TabsList>
              <TabsTrigger value={'Main'}>Main</TabsTrigger>
              {isProfileCommunity && (
                <TabsTrigger value={'Members'}>{memberTabName}</TabsTrigger>
              )}
              {plugins.map((plugin) => {
                const component = plugin.components?.ProfileTab;
                if (!component) {
                  return null;
                }
                const componentApi = component(
                  createPluginApi(plugin.name),
                  fullSubname,
                  chainId,
                  sanitized.ethAddress.value
                );
                if (!componentApi) {
                  return null;
                }

                return (
                  <TabsTrigger key={plugin.name} value={plugin.name}>
                    {componentApi.title}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <TabsContent value={'Main'}>
              {React.cloneElement(MainTab)}
            </TabsContent>
            {isProfileCommunity && (
              <TabsContent value={'Members'}>
                <MembersSection fullSubname={fullSubname} chainId={chainId} />
              </TabsContent>
            )}
            {plugins.map((plugin) => {
              const component = plugin.components?.ProfileTab;
              if (!component) {
                return null;
              }
              const componentApi = component(
                createPluginApi(plugin.name),
                fullSubname,
                chainId,
                sanitized.ethAddress.value
              );
              if (!componentApi) {
                return null;
              }

              return (
                <TabsContent
                  key={plugin.name}
                  value={plugin.name}
                  style={{
                    flex: 1,
                  }}
                >
                  {componentApi.content}
                </TabsContent>
              );
            })}
          </Tabs>
        ) : (
          React.cloneElement(MainTab)
        )}
      </div>
    </Flex>
  );
};

export default ContentSection;
