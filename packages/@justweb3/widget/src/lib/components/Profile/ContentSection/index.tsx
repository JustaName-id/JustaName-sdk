import {
  useAccountEnsNames,
  useAccountSubnames,
  useEnsAvatar,
} from '@justaname.id/react';
import { SanitizedRecords, SubnameRecordsRoute } from '@justaname.id/sdk';
import {
  A,
  Avatar,
  Button,
  ExpandableText,
  Flex,
  LocationIcon,
  MetadataCard,
  P,
  PersonEditIcon,
} from '@justweb3/ui';
import React, { useMemo } from 'react';
import { getChainIcon } from '../../../icons/chain-icons';
import { getContentHashIcon } from '../../../icons/contentHash-icons';
import { getTextRecordIcon } from '../../../icons/records-icons';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 850px) {
    padding-left: 0;
  }
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 200px;
  aspect-ratio: 7 / 1;
  //box-shadow: 1px 1px 0px 0px #000;
  overflow: hidden;
  position: relative;

  @media (max-width: 850px) {
    aspect-ratio: 2 / 1;
  }
`;

const SectionCard = styled.div`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--justweb3-foreground-color-4);
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SectionItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: center;
  gap: 10px;
  overflow-x: auto;

  @media (max-width: 850px) {
    gap: 0.625rem;
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }
`;

const SectionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-column: span 6 / span 6;
  }
`;

export interface ContentProps {
  fullSubname: string;
  chainId: 1 | 11155111 | undefined;
  records: SubnameRecordsRoute['response'];
  sanitized: SanitizedRecords;
  onEdit?: () => void;
  editMode?: boolean;
}

const ContentSection: React.FC<ContentProps> = ({
  fullSubname,
  chainId,
  editMode,
  sanitized,
  records,
  onEdit,
}) => {
  const { accountSubnames } = useAccountSubnames();
  const { accountEnsNames } = useAccountEnsNames();

  const isProfileSelf = useMemo(() => {
    return (
      accountSubnames?.map((subname) => subname.ens).includes(fullSubname) ||
      accountEnsNames?.map((ens) => ens.ens).includes(fullSubname)
    );
  }, [fullSubname, accountSubnames, accountEnsNames]);

  const { sanitizeEnsImage } = useEnsAvatar();

  return (
    <Flex direction={'column'} gap={'10px'}>
      <Container>
        <BannerContainer>
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
        </BannerContainer>
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
          <Flex direction={'column'} gap={'5px'}>
            <P
              style={{
                fontSize: '20px',
                fontWeight: '700',
                lineHeight: '100%',
              }}
            >
              {decodeURIComponent(
                sanitized?.display || fullSubname.split('.')[0]
              )}
            </P>
            {/*<Badge*/}
            {/*  withCopy={false}*/}
            {/*  style={{*/}
            {/*    padding: '5px',*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <SPAN*/}
            {/*    style={{*/}
            {/*      fontSize: '10px',*/}
            {/*      lineHeight: '10px',*/}
            {/*      fontWeight: 900,*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    {decodeURIComponent(fullSubname)}*/}
            {/*  </SPAN>*/}
            {/*</Badge>*/}
          </Flex>
          <ExpandableText
            text={sanitized?.description || 'No description available'}
            maxLength={100}
          />

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
      </Container>
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Flex
          direction={'column'}
          gap={'10px'}
          style={{
            flex: '1',
          }}
        >
          {sanitized?.socials?.length > 0 && (
            <SectionCard>
              <P>Handles</P>
              <SectionItemList className={'justweb3scrollbar'}>
                {sanitized?.socials
                  ?.filter((social) => social.value !== '')
                  .map((social) => (
                    <SectionItem key={social.key}>
                      <MetadataCard
                        key={social.key}
                        variant={'social'}
                        title={social.key}
                        value={social.value}
                        icon={getTextRecordIcon(social.key)}
                      />
                    </SectionItem>
                  ))}
              </SectionItemList>
            </SectionCard>
          )}
          <SectionCard>
            <P>Addresses</P>
            <SectionItemList className={'justweb3scrollbar'}>
              {sanitized?.allAddresses?.map((address) => {
                return (
                  <SectionItem key={address.id}>
                    <MetadataCard
                      key={address.id}
                      variant={'address'}
                      title={address.name}
                      value={address.value}
                      icon={getChainIcon(address.symbol)}
                    />
                  </SectionItem>
                );
              })}
            </SectionItemList>
          </SectionCard>
          {sanitized?.allTexts?.length > 0 && (
            <SectionCard>
              <P>Custom</P>
              <SectionItemList className={'justweb3scrollbar'}>
                {sanitized?.allTexts
                  ?.sort((a, b) => a.key.localeCompare(b.key))
                  .map((other) => (
                    <SectionItem key={other.key}>
                      <MetadataCard
                        key={other.key}
                        variant={'other'}
                        title={other.key}
                        value={other.value}
                      />
                    </SectionItem>
                  ))}
              </SectionItemList>
            </SectionCard>
          )}

          {sanitized?.contentHash && (
            <SectionCard>
              <P>Content Hash</P>
              <SectionItemList className={'justweb3scrollbar'}>
                <SectionItem>
                  <MetadataCard
                    variant={'contentHash'}
                    title={'Content Hash'}
                    value={
                      sanitized?.contentHash?.protocolType +
                      '://' +
                      sanitized?.contentHash?.decoded
                    }
                    icon={getContentHashIcon(
                      sanitized?.contentHash?.protocolType
                    )}
                  />
                </SectionItem>
              </SectionItemList>
            </SectionCard>
          )}
        </Flex>
      </div>
    </Flex>
  );
};

export default ContentSection;
