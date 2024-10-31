import React, { Fragment, useContext, useEffect, useMemo } from 'react';
import {
  useAccountEnsNames,
  useAccountSubnames,
  useEnsAvatar,
  useMountedAccount,
} from '@justaname.id/react';
import { SanitizedRecords, SubnameRecordsRoute } from '@justaname.id/sdk';
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
} from '@justweb3/ui';
import { getChainIcon } from '../../../icons/chain-icons';
import { getContentHashIcon } from '../../../icons/contentHash-icons';
import { getTextRecordIcon } from '../../../icons/records-icons';
import styles from './ContentSection.module.css';
import { JustaPlugin } from '../../../plugins';
import { PluginContext } from '../../../providers/PluginProvider';
import { ProfileSection } from '../ProfileSection';
import MetadataCard from '../../MetadataCard';

export interface ContentProps {
  fullSubname: string;
  chainId: 1 | 11155111 | undefined;
  records: SubnameRecordsRoute['response'];
  sanitized: SanitizedRecords;
  onEdit?: () => void;
  editMode?: boolean;
  plugins: JustaPlugin[];
}

const ContentSection: React.FC<ContentProps> = ({
  fullSubname,
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
  const isProfileSelf = useMemo(() => {
    return (
      (accountSubnames?.map((subname) => subname.ens).includes(fullSubname) ||
        accountEnsNames?.map((ens) => ens.ens).includes(fullSubname)) &&
      chainId === connectedWalletChainId
    );
  }, [
    fullSubname,
    accountSubnames,
    accountEnsNames,
    connectedWalletChainId,
    chainId,
  ]);
  const { createPluginApi } = useContext(PluginContext);

  const { sanitizeEnsImage } = useEnsAvatar();

  useEffect(() => {
    setTab('Main');
  }, [fullSubname, chainId]);

  const hasTabs = useMemo(() => {
    return plugins.some((plugin) => plugin.components?.ProfileTab);
  }, [plugins]);

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
              <MetadataCard
                key={address.id}
                variant={'address'}
                title={address.name}
                value={address.value}
                icon={getChainIcon(address.symbol)}
              />
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
            style={{
              objectFit: 'cover',
              height: '200px',
              width: '100%',
              borderRadius: '16px',
            }}
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
