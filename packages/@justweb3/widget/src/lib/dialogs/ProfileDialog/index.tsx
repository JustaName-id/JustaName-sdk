import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useMemo } from 'react';

import {
    useRecords,
    useUpdateSubname
} from '@justaname.id/react';
import { Address, getCoinTypeDetails, sanitizeRecords, SubnameRecordsRoute, SupportedCoins, TextRecord } from '@justaname.id/sdk';
import {
    ArrowIcon,
    AttachmentIcon,
    Button,
    ComicIcon,
    ContactsIcon,
    Flex,
    Form,
    LinkCard,
    P,
    WalletIcon,
    WebsiteIcon
} from '@justweb3/ui';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { AddressesSection, ContentHashSection, CustomSection, GeneralSection, SocialsSection } from '../../components/Profile';
import ContentSection from '../../components/Profile/ContentSection';
import { metadataForm } from '../../forms';
import { useJustWeb3 } from '../../providers';
import { buildInitialValues, filterUpdatedAddresses, filterUpdatedContentHash, filterUpdatedMetadata } from '../../utils';
import { DefaultDialog } from '../DefaultDialog';
import { LoadingDialog } from '../LoadingDialog';
import { UnsavedChangesDialog } from '../UnsavedChangesDialog';

const FormContainer = styled.div<{ editMode: boolean }>`
  background-color: white;
  transition: width 300ms;
  transform-origin: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateZ(0);

  @media (min-width: 850px) {
    height: ${(props) => (props.editMode ? '100%' : 'auto')};
  }

  ${(props) =>
        props.editMode
            ? `
    flex: 1 1 0%;
    min-width: 100%;

    @media (min-width: 850px) {
      min-width: 350px;
      max-width: 350px;
    }
  `
            : `
    max-width: 0;
    min-width: 0;
    overflow: hidden;
  `}
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Poppins', sans-serif;
  max-height: calc(100vh - 220px);
  position: relative;
  height: 100%;

  @media (min-width: 850px) {
    max-height: calc(100vh - 123px);
  }
`;


export interface ProfileDialogProps {
    open: boolean;
    handleOpenDialog: (open: boolean) => void;
}

const ContentSectionWrapper = styled.div<{ editMode: boolean }>`
  flex: 1 1 0%;
  overflow-y: auto;
  transition: all 300ms linear;
  transform: translate3d(0, 0, 0) scale(1); 

  ${(props) =>
        props.editMode
            ? `
    transform: translate3d(0, 0, 0) scale(0);
    background-color: white;
    border-radius: 20px;

    @media (min-width: 850px) {
      transform: translate3d(0, 0, 0) scale(0.9);
    }
  `
            : `
    @media (min-width: 850px) {
      padding-left: 1.25rem;
    }
  `}
`;

const menuTabs = [
    {
        title: 'General',
        icon: <ContactsIcon height={24} width={24} />
    },
    {
        title: 'Socials',
        icon: <ComicIcon height={24} width={24} />
    },
    {
        title: 'Addresses',
        icon: <WalletIcon height={24} width={24} />
    },
    {
        title: 'Content Hash',
        icon: <WebsiteIcon height={24} width={24} />
    },
    {
        title: 'Custom',
        icon: <AttachmentIcon height={24} width={24} />
    }
];

export const ProfileDialog: FC<ProfileDialogProps> = ({
    open,
    handleOpenDialog
}) => {

    const { connectedEns, isEnsAuthPending } = useJustWeb3()
    const { records, isRecordsPending, refetchRecords } = useRecords({
        ens: connectedEns?.ens || ''
    })
    const [selectedState, setSelectedState] = React.useState<string | undefined>(undefined);
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [unsavedChangesDialogOpen, setUnsavedChangesDialogOpen] = React.useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
    const { updateSubname } = useUpdateSubname();
    const [tempAvatar, setTempAvatar] = React.useState<string | null>(null);
    const [tempBanner, setTempBanner] = React.useState<string | null>(null);

    const form = useForm<metadataForm>({
        resolver: yupResolver(metadataForm),
        defaultValues: buildInitialValues(records?.sanitizedRecords),
        mode: 'onChange',
    });

    const editedRecords = useMemo<SubnameRecordsRoute["response"]>(() => {
        const newRecord = form.getValues();
        const texts = [
            ...newRecord.otherTexts,
            ...newRecord.generals,
            ...newRecord.socials.map((social) => ({
                key: social.identifier,
                value: social.value
            }))
        ].filter(text => text?.value !== '').map((text) => ({
            key: text.key,
            value: text.value as string
        }));

        const coins = newRecord.addresses
            .filter((address) => address.address !== '' && address.coin !== '')
            .map((address) => ({
                id: parseInt(address.coin),
                name: getCoinTypeDetails(address.coin as SupportedCoins).symbol.toLowerCase(),
                value: address.address as string
            }));


        return {
            ens: connectedEns?.ens || '',
            records: {
                texts,
                coins,
                contentHash: newRecord?.contentHash?.length > 0 ? {
                    protocolType: newRecord.contentHash[0].protocolType as string,
                    decoded: newRecord.contentHash[0].decoded as string
                } : null,
                resolverAddress: records?.records.resolverAddress || ''
            },
            isJAN: true,
        };
    }, [form.getValues(), records, records?.sanitizedRecords, form.watch()]);

    const editedSanitized = useMemo(() => {
        return sanitizeRecords(editedRecords);
    }, [editedRecords]);


    const renderMenuTabs = () => (
        <Flex direction="column" gap="10px" style={{
            width: '100%',
            padding: '10px',
        }}>
            {menuTabs.map((item, index) => (
                <Flex direction='column' gap='5px' key={`menu-tab-${index}`} >
                    <Flex direction='row' gap='5px' align='center' justify='space-between' style={{
                        cursor: 'pointer',
                        padding: "10px",
                        borderRadius: "100px",
                        border: "1px solid #E5E5E5"
                    }}
                        onClick={() => {
                            setSelectedState(item.title)
                        }}
                    >
                        <Flex direction='row' gap='5px' align='center' justify='flex-start'>
                            {item.icon}
                            <P style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#000000'
                            }}>{item.title}</P>
                        </Flex>
                        <ArrowIcon width={15} height={15} />
                    </Flex>
                </Flex>
            ))}
        </Flex>
    );

    const renderSelectedState = () => {
        switch (selectedState) {
            case 'General':
                return <GeneralSection form={form} fullSubname={connectedEns?.ens || ''} tempAvatar={tempAvatar} tempBanner={tempBanner} setTempAvatar={setTempAvatar} setTempBanner={setTempBanner} />;
            case 'Socials':
                return <SocialsSection form={form} />;
            case 'Addresses':
                return <AddressesSection form={form} />;
            case 'Content Hash':
                return <ContentHashSection form={form} />;
            case 'Custom':
                return <CustomSection form={form} fullSubname={connectedEns?.ens || ''} />;

        }
    };

    const handleSaveMetadata = async (data: metadataForm) => {
        setIsSubmitting(true);
        const avatar = data.otherTexts.find((text) => text.key === 'avatar')?.value;
        const banner = data.otherTexts.find((text) => text.key === 'banner')?.value;


        const addresses = data.addresses
            .reduce((acc: Address[], address) => {
                if (address.address !== '' && address.coin !== '') {
                    acc.push({
                        address: address.address as string,
                        coinType: parseInt(address.coin) as number
                    });
                }
                return acc;
            }, [])

        const texts = [
            ...data.otherTexts.filter((text) => text.key !== 'avatar' && text.key !== 'banner'),
            ...data.generals,
            ...data.socials.map((social) => ({
                key: social.identifier,
                value: social.value
            }))
        ].reduce((acc: TextRecord[], text) => {
            if (text.value !== '' && text.key !== '') {
                acc.push({
                    key: text.key as string,
                    value: text.value as string
                });
            }
            return acc;
        }, [])

        if (avatar) {
            texts.push({
                key: 'avatar',
                value: avatar
            });
        }

        if (banner) {
            texts.push({
                key: 'banner',
                value: banner
            });
        }

        updateSubname({
            ens: connectedEns?.ens || '',
            addresses: Object.fromEntries(filterUpdatedAddresses(records?.records.coins || [], addresses).map(address => [address.coinType.toString(), address.address])),
            text: Object.fromEntries(filterUpdatedMetadata(records?.records.texts || [], texts).map(text => [text.key, text.value])),
            contentHash: filterUpdatedContentHash(records?.records.contentHash, data.contentHash.length > 0 ? [{ ...data.contentHash[0], decoded: data.contentHash[0].decoded ?? '' }] : []),
        }).then(() => {
            refetchRecords().then((data) => {
                setEditMode(false);
                setIsSubmitting(false);
                setTempAvatar(null);
                setTempBanner(null);
                if (data?.data?.sanitizedRecords)
                    form.reset(
                        buildInitialValues(data.data.sanitizedRecords)
                    )
                setSelectedState(undefined);
            });
        }).catch(() => {
            console.log('error');
            setIsSubmitting(false);
        })
    };


    if (!connectedEns || isEnsAuthPending || isRecordsPending) {
        return <LoadingDialog open={true} />
    }

    return (
        <DefaultDialog
            open={open}
            handleClose={() => handleOpenDialog(false)}
            header={
                <LinkCard
                    variant='address'
                    title='Ens'
                    value={connectedEns.ens}
                    icon={<></>}
                    textExtraStyle={{
                        color: '#3280F4'
                    }}
                />
            }
        >
            <DialogContent>
                <FormContainer
                    editMode={editMode}
                >
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(
                                handleSaveMetadata,
                            )}
                            style={{
                                display: 'flex',
                                height: '100%',
                                width: '100%',
                                flexDirection: 'column',
                                justifyContent: 'between'
                            }}
                        >
                            {!selectedState
                                ? renderMenuTabs()
                                : renderSelectedState()}
                            <UnsavedChangesDialog
                                open={unsavedChangesDialogOpen}
                                onContinue={() => {
                                    setUnsavedChangesDialogOpen(false)
                                }}
                                onDiscard={(e) => {
                                    form.reset(buildInitialValues(records?.sanitizedRecords))
                                    setTempAvatar(null)
                                    setTempBanner(null)
                                    e.preventDefault()
                                    e.stopPropagation()
                                    if (selectedState) {
                                        setSelectedState(undefined)
                                    } else {
                                        setEditMode(false)
                                    }
                                    setUnsavedChangesDialogOpen(false)
                                }}
                            />
                            <Flex direction="row" justify="flex-end" align="flex-end" gap="5px" style={{
                                padding: '0px 5px'
                            }}>
                                <Button
                                    variant={'secondary'}
                                    onClick={(e) => {
                                        if (
                                            form.formState.isDirty ||
                                            tempAvatar ||
                                            tempBanner
                                        ) {
                                            setUnsavedChangesDialogOpen(
                                                true,
                                            )
                                            e.preventDefault()
                                            e.stopPropagation()
                                        } else {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            if (selectedState) {
                                                setSelectedState(
                                                    undefined,
                                                )
                                            } else {
                                                setEditMode(false)
                                            }
                                        }
                                    }}
                                    style={{
                                        width: 'fit-content',
                                        display: selectedState ? 'block' : 'hidden'
                                    }}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant={'primary'}
                                    style={{
                                        width: 'fit-content',
                                        display: selectedState ? 'block' : 'hidden'
                                    }}
                                    type={'submit'}
                                    disabled={isSubmitting}
                                >
                                    SAVE CHANGES
                                </Button>
                                <Button
                                    variant={'secondary'}
                                    style={{
                                        width: 'fit-content',
                                        display: selectedState ? 'hidden' : 'block'
                                    }}
                                    onClick={() => {
                                        setEditMode(false)
                                    }}
                                >
                                    Back
                                </Button>
                            </Flex>
                        </form>
                    </Form>
                </FormContainer>
                <ContentSectionWrapper
                    editMode={editMode}
                    id={'contentSectionScrollId'}
                >
                    <ContentSection
                        fullSubname={connectedEns?.ens || ''}
                        sanitized={
                            editMode
                                ? editedSanitized
                                : records?.sanitizedRecords
                                    ? records?.sanitizedRecords
                                    : {
                                        ethAddress: {
                                            coin: '60',
                                            coinType: '2147483658',
                                            id: 60,
                                            name: 'Ethereum',
                                            value: '',
                                            symbol: 'ETH',
                                        },
                                        otherAddresses: [],
                                        generals: [],
                                        socials: [],
                                        allOtherTexts: [],
                                        contentHash: null,
                                        allAddresses: [],
                                        otherTextsWithoutStandard: [],
                                    }
                        }
                        records={
                            editMode
                                ? editedRecords
                                : records
                                    ? records
                                    : {
                                        ens: '',
                                        isClaimed: false,
                                        claimedAt: null,
                                        isJAN: true,
                                        records: {
                                            texts: [],
                                            coins: [],
                                            contentHash: null,
                                            resolverAddress: '',
                                        }
                                    }
                        }
                        onEdit={() => setEditMode(!editMode)}
                        editMode={editMode}
                    />
                </ContentSectionWrapper>
            </DialogContent>
        </DefaultDialog>
    );
};