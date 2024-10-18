
import { useAccountSubnames, useEnsAuth, useEnsAvatar } from '@justaname.id/react';
import { SanitizedRecords, SubnameRecordsRoute } from '@justaname.id/sdk';
import { A, Avatar, Button, Flex, LinkCard, LocationIcon, P, PersonEditIcon, ExpandibleText } from '@justweb3/ui';
import React, { useMemo } from 'react';
import { getChainIcon } from '../../../icons/chain-icons';
import { getContentHashIcon } from '../../../icons/contentHash-icons';
import { getTextRecordIcon } from '../../../icons/records-icons';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.625rem;

  @media (max-width: 850px) {
    padding-left: 0;
  }
`;

const BannerContainer = styled.div`
  width: 100%;
  aspect-ratio: 7 / 1;
  box-shadow: 1px 1px 0px 0px #000;
  overflow: hidden;
  position: relative;

  @media (max-width: 850px) {
    aspect-ratio: 2 / 1;
  }
`;

const SectionCard = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: white;
  border: 1px solid #F2F2F2;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SectionTitle = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: #0F172A;
  line-height: 100%;
`;

const SectionItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: center;
  gap: 1.25rem;

  @media (max-width: 850px) {
    gap: 0.625rem;
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
    records: SubnameRecordsRoute["response"];
    sanitized: SanitizedRecords;
    onEdit?: () => void;
    editMode?: boolean;
}


const ContentSection: React.FC<ContentProps> = ({
    fullSubname,
    editMode,
    sanitized,
    records,
    onEdit
}) => {
    const { accountSubnames: currentSubnames } = useAccountSubnames();
    const { connectedEns } = useEnsAuth();

    const isProfileSelf = useMemo(() => {
        return sanitized.ethAddress.value === connectedEns?.address;
    }, [sanitized, connectedEns]);
    const { avatar } = useEnsAvatar({
        ens: connectedEns?.ens
    });

    return (
        <Flex direction={'column'} gap={'10px'}>
            <Container>
                <BannerContainer>
                    <img
                        src={sanitized?.banner || 'https://justaname-bucket.s3.eu-central-1.amazonaws.com/default-banner.png'}
                        alt="profile-banner"
                        style={{ objectFit: 'cover' }}
                    />
                    <Flex gap='12px' align='center' style={{
                        position: 'absolute',
                        top: '8px',
                        right: '10px'
                    }} >
                        {
                            !editMode && currentSubnames?.find((subname) => decodeURIComponent(subname.ens) === decodeURIComponent(fullSubname)) && (
                                <Button
                                    variant={'secondary'}
                                    onClick={() => {
                                        const sub = currentSubnames?.find((subname) => decodeURIComponent(subname.ens) === decodeURIComponent(fullSubname));
                                        if (!sub) return;
                                        onEdit && onEdit();
                                    }}
                                    style={{
                                        fontSize: '8px',
                                        fontWeight: 700,
                                        color: 'var(--justweb3-primary-color)'
                                    }}
                                    leftIcon={<PersonEditIcon height={10} width={10} />}
                                >
                                    Edit Profile
                                </Button>
                            )
                        }
                    </Flex>
                </BannerContainer >
                <Flex direction={'column'} gap={'10px'} style={{
                    marginTop: '-50px',
                    paddingBottom: '10px'
                }}>
                    <Avatar
                        src={avatar}
                        style={{
                            border: '4px solid white',
                            margin: '0px 5px',
                            width: '75px',
                            height: '75px'
                        }} />
                    <Flex direction={'column'} gap={'5px'}>
                        <P style={{
                            color: "black",
                            fontSize: '20px',
                            fontWeight: '700'
                        }} >{decodeURIComponent(sanitized?.display || fullSubname.split('.')[0])}</P>
                        <Flex align='center' justify='center' style={{
                            background: 'rgba(0, 0, 0, 0.05)',
                            padding: '5px',
                            borderRadius: '100px',
                        }}>
                            <P style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(0, 0, 0, 0.50)' }} >{decodeURIComponent(fullSubname)}</P>
                        </Flex>
                    </Flex >
                    <ExpandibleText text={
                        sanitized?.description || 'No description available'
                    } maxLength={100} />

                    {
                        sanitized?.url && (() => {
                            try {
                                const url = sanitized.url.startsWith('http') ? sanitized.url : `https://${sanitized.url}`;
                                new URL(url);
                                return (
                                    <A href={url} target={'_blank'} style={{
                                        fontSize: '14px',
                                        color: 'var(--justweb3-primary-color)',
                                        textDecoration: 'underline',
                                        width: 'fit-content'
                                    }}>
                                        {sanitized.url}
                                    </A>
                                );
                            } catch (e) {
                                console.error('Invalid URL:', sanitized.url);
                                return <P style={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    textDecoration: 'underline',
                                    width: 'fit-content'
                                }}>{sanitized.url}</P>;
                            }
                        })()
                    }

                    {

                        records?.records.texts?.find((text) => text.key === 'location') && (

                            <Flex direction={'row'} gap={'5px'} align={'center'}>
                                <LocationIcon width={16} height={16} />
                                <P style={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                }}>{records?.records.texts?.find((text) => text.key === 'location')?.value}</P>
                            </Flex>
                        )
                    }

                </Flex >
            </Container >
            <div style={{
                padding: '10px 10px 0px 10px',
                width: '100%',
                height: '100%',
            }}>

                <Flex direction={'column'} gap={'5px'} style={{
                    flex: '1'
                }}>
                    {
                        sanitized?.socials?.length > 0 && (
                            <SectionCard>
                                <SectionTitle>Handles</SectionTitle>
                                <SectionItemList>
                                    {
                                        sanitized?.socials?.filter(social => social.value !== '').map((social) => (
                                            <SectionItem key={social.key}>
                                                <LinkCard key={social.key} variant={'social'} title={social.key} value={social.value}
                                                    icon={
                                                        getTextRecordIcon(social.key)
                                                    }
                                                />
                                            </SectionItem>
                                        ))
                                    }
                                </SectionItemList>
                            </SectionCard>
                        )
                    }
                    <SectionCard>
                        <SectionTitle>Addresses</SectionTitle>
                        <SectionItemList>
                            {
                                sanitized?.allAddresses?.map((address) => {
                                    return (
                                        <SectionItem key={address.id}>
                                            <LinkCard key={address.id} variant={'address'} title={address.name}
                                                value={address.value}
                                                icon={getChainIcon(address.symbol)}
                                            />
                                        </SectionItem>);
                                })
                            }
                        </SectionItemList>
                    </SectionCard>
                    {
                        sanitized?.otherTextsWithoutStandard?.length > 0 && (
                            <SectionCard>
                                <SectionTitle>Custom</SectionTitle>
                                <SectionItemList>
                                    {
                                        sanitized?.otherTextsWithoutStandard?.map((other) => (
                                            <SectionItem key={other.key}>
                                                <LinkCard
                                                    key={other.key} variant={'other'} title={other.key} value={other.value}
                                                />
                                            </SectionItem>
                                        ))
                                    }
                                </SectionItemList>
                            </SectionCard>
                        )}

                    {
                        sanitized?.contentHash && (
                            <SectionCard>
                                <SectionTitle>Content Hash</SectionTitle>
                                <SectionItemList>
                                    <SectionItem>
                                        <LinkCard variant={'contentHash'} title={'Content Hash'}
                                            value={sanitized?.contentHash?.protocolType + '://' + sanitized?.contentHash?.decoded}
                                            icon={getContentHashIcon(sanitized?.contentHash?.protocolType)}
                                        />
                                    </SectionItem>
                                </SectionItemList>
                            </SectionCard>
                        )}

                </Flex>
            </div>
        </Flex >
    );
};

export default ContentSection;
