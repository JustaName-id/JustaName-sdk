import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Records, useRecords, useUpdateSubname } from '@justaname.id/react';
import {
  getCoinTypeDetails,
  sanitizeRecords,
  SubnameRecordsRoute,
  SupportedCoins,
} from '@justaname.id/sdk';
import {
  ArrowIcon,
  AttachmentIcon,
  Badge,
  Button,
  ClickableItem,
  ComicIcon,
  ContactsIcon,
  Flex,
  Form,
  LoadingSpinner,
  MaximizeIcon,
  MinimizeIcon,
  P,
  SPAN,
  WalletIcon,
  WebsiteIcon,
} from '@justweb3/ui';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  AddressesSection,
  ContentHashSection,
  CustomSection,
  GeneralSection,
  SocialsSection,
} from '../../components/Profile';
import ContentSection from '../../components/Profile/ContentSection';
import { metadataForm } from '../../forms';
import { buildInitialValues } from '../../utils';
import { DefaultDialog } from '../DefaultDialog';
import { UnsavedChangesDialog } from '../UnsavedChangesDialog';

const FormContainer = styled.div<{ $editMode: boolean }>`
  transform-origin: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  max-width: 0;
  min-width: 0;
  overflow: hidden;
  transition: all 300ms ease-in-out;
  ${(props) => {
    return props.$editMode
      ? `
    flex: 1 1 0%;
    min-width: 100%;
    max-width: 100%;
    
    @media (min-width: 850px) {
      min-width: 250px;
      max-width: 250px;
    }
  `
      : '';
  }};
`;

const FormInnerContainer = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  min-width: calc(max(min(1200px, 90vw), 390px) - 40px);
  max-width: calc(max(min(1200px, 90vw), 390px) - 40px);
  @media (min-width: 850px) {
    min-width: 230px;
    max-width: 230px;
  }
`;

export interface ProfileDialogProps {
  ens: string;
  chainId?: 1 | 11155111;
  handleOnClose: () => void;
  disableOverlay?: boolean;
}

const ContentSectionWrapper = styled.div<{ $editMode: boolean }>`
  flex: 1 1 0%;
  overflow-y: auto;
  transition: all 300ms linear;
  //height: fit-content;
  //min-height: 500px;
`;

const menuTabs = [
  {
    title: 'General',
    icon: <ContactsIcon height={20} width={20} />,
  },
  {
    title: 'Socials',
    icon: <ComicIcon height={20} width={20} />,
  },
  {
    title: 'Addresses',
    icon: <WalletIcon height={20} width={20} />,
  },
  {
    title: 'Content Hash',
    icon: <WebsiteIcon height={20} width={20} />,
  },
  {
    title: 'Custom',
    icon: <AttachmentIcon height={20} width={20} />,
  },
];

export const ProfileDialog: FC<ProfileDialogProps> = ({
  ens,
  chainId = 1,
  handleOnClose,
  disableOverlay,
}) => {
  console.log(ens, chainId);
  const { records, isRecordsPending, refetchRecords } = useRecords({
    ens: ens,
    chainId,
  });

  const [minimized, setMinimized] = useState<boolean>(false);

  const [selectedState, setSelectedState] = React.useState<string | undefined>(
    undefined
  );
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [unsavedChangesDialogOpen, setUnsavedChangesDialogOpen] =
    React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { updateSubname } = useUpdateSubname();
  const [tempAvatar, setTempAvatar] = React.useState<string | null>(null);
  const [tempBanner, setTempBanner] = React.useState<string | null>(null);

  const form = useForm<metadataForm>({
    resolver: yupResolver(metadataForm),
    mode: 'onChange',
    criteriaMode: 'firstError',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (records) {
      form.reset(buildInitialValues(records?.sanitizedRecords));
      form.trigger();
    }
  }, [records]);

  const editedRecords = useMemo<Records | undefined>(() => {
    if (!records || Object.entries(form.getValues()).length === 0) {
      return undefined;
    }
    const newRecord = form.getValues();
    const texts = [
      ...newRecord.otherTexts,
      ...newRecord.generals,
      ...newRecord.socials.map((social) => ({
        key: social.handle,
        value: social.value,
      })),
    ]
      .filter((text) => text?.value !== '')
      .map((text) => ({
        key: text.key,
        value: text.value as string,
      }));

    const coins = newRecord.addresses
      .filter((address) => address.address !== '' && address.coin !== '')
      .map((address) => ({
        id: parseInt(address.coin),
        name: getCoinTypeDetails(
          address.coin as SupportedCoins
        ).symbol.toLowerCase(),
        value: address.address as string,
      }));

    const subnameRecord: SubnameRecordsRoute['response'] = {
      ens: ens || '',
      records: {
        resolverAddress: records?.records.resolverAddress || '',
        coins: coins,
        texts: texts,
        contentHash: records?.sanitizedRecords?.contentHash,
      },
      claimedAt: records?.claimedAt,
      isClaimed: records?.isClaimed,
      isJAN: !!records?.isJAN,
    };

    return {
      sanitizedRecords: sanitizeRecords(subnameRecord),
      ...subnameRecord,
    };
  }, [form.getValues(), records, records?.sanitizedRecords, form.watch()]);

  const renderMenuTabs = () => (
    <Flex
      direction="column"
      gap="15px"
      style={{
        width: '100%',
        flex: 1,
      }}
    >
      <P
        style={{
          fontSize: '16px',
          fontWeight: 700,
        }}
      >
        Edit Profile
      </P>
      <Flex direction="column" gap="10px">
        {menuTabs.map((item, index) => (
          <ClickableItem
            key={'menu-tab-' + index}
            title={item.title}
            style={{
              borderRadius: '100px',
              width: '100%',
            }}
            onClick={() => setSelectedState(item.title)}
            left={item.icon}
            right={<ArrowIcon width={15} height={15} />}
          />
        ))}
      </Flex>
    </Flex>
  );

  const renderSelectedState = () => {
    switch (selectedState) {
      case 'General':
        return (
          <GeneralSection
            chainId={chainId}
            disableOverlay={disableOverlay}
            address={records?.sanitizedRecords?.ethAddress?.value || ''}
            form={form}
            fullSubname={ens}
            tempAvatar={tempAvatar}
            tempBanner={tempBanner}
            setTempAvatar={setTempAvatar}
            setTempBanner={setTempBanner}
          />
        );
      case 'Socials':
        return <SocialsSection form={form} />;
      case 'Addresses':
        return <AddressesSection form={form} />;
      case 'Content Hash':
        return <ContentHashSection form={form} />;
      case 'Custom':
        return <CustomSection form={form} fullSubname={ens} />;
      default:
        return <></>;
    }
  };

  const handleSaveMetadata = async (data: metadataForm) => {
    setIsSubmitting(true);

    const addresses = {
      ...data.addresses.reduce((acc, address) => {
        acc[parseInt(address.coin)] = address.address;
        return acc;
      }, {} as Record<number, string>),
      ...records?.records?.coins
        .filter(
          (coin) =>
            !data.addresses.find(
              (address) => address.coin === coin.id.toString()
            )
        )
        .reduce((acc, coin) => {
          acc[coin.id] = '';
          return acc;
        }, {} as Record<number, string>),
    };

    const texts = {
      ...data.otherTexts.reduce((acc, text) => {
        acc[text.key] = text.value;
        return acc;
      }, {} as Record<string, string>),
      ...data.generals.reduce((acc, general) => {
        if (general.key === undefined) {
          return acc;
        }
        acc[general.key] = general.value || '';
        return acc;
      }, {} as Record<string, string>),
      ...data.socials.reduce((acc, social) => {
        if (social.handle === undefined) {
          return acc;
        }
        acc[social.handle] = social.value || '';
        return acc;
      }, {} as Record<string, string>),
      ...records?.records?.texts
        .filter(
          (text) =>
            ![
              ...data.otherTexts,
              ...data.generals,
              ...data.socials.map((social) => ({
                key: social.handle,
                value: social.value,
              })),
            ].find((otherText) => otherText.key === text.key)
          // !data.otherTexts.find((otherText) => otherText.key === text.key)
        )
        .reduce((acc, text) => {
          acc[text.key] = '';
          return acc;
        }, {} as Record<string, string>),
    };

    updateSubname({
      ens: ens,
      addresses,
      text: texts,
      contentHash: data.contentHash[0]
        ? data.contentHash[0].protocolType + '://' + data.contentHash[0].decoded
        : '',
    })
      .then(() => {
        refetchRecords().then((data) => {
          setIsSubmitting(false);
          setTempAvatar(null);
          setTempBanner(null);
          if (data?.data?.sanitizedRecords)
            form.reset(buildInitialValues(data.data.sanitizedRecords));
          // setSelectedState(undefined);
        });
      })
      .catch(() => {
        console.log('error');
        setIsSubmitting(false);
      });
  };

  return (
    <DefaultDialog
      open={true}
      disableOverlay={disableOverlay}
      handleClose={() => {
        handleOnClose();
        setEditMode(false);
        setSelectedState(undefined);
        form.reset(buildInitialValues(records?.sanitizedRecords));
      }}
      contentStyle={{
        width: '100%',
        height: '100%',
      }}
      fullScreen={minimized}
      header={
        ens && (
          <Flex gap={'5px'}>
            {minimized ? (
              <MinimizeIcon
                height={25}
                width={25}
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setMinimized(false);
                }}
              />
            ) : (
              <MaximizeIcon
                height={25}
                width={25}
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setMinimized(true);
                }}
              />
            )}
            <Badge>
              <SPAN
                style={{
                  fontSize: '10px',
                  lineHeight: '10px',
                  fontWeight: 900,
                  color: 'var(--justweb3-primary-color)',
                }}
              >
                {ens}
              </SPAN>
            </Badge>
          </Flex>
        )
      }
    >
      {isRecordsPending || !records || !editedRecords ? (
        <div
          style={{
            height: '100%',
            position: 'relative',
            padding: '24px',
          }}
        >
          <LoadingSpinner color={'var(--justweb3-primary-color)'} />
        </div>
      ) : (
        <Flex
          style={{
            flex: 1,
            maxHeight: 'calc(100% - 20px - 25px)',
          }}
        >
          <FormContainer
            $editMode={editMode}
            style={{
              position: 'relative',
            }}
          >
            <FormInnerContainer>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSaveMetadata)}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    maxHeight: '100%',
                    height: '100%',
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'between',
                  }}
                >
                  {!selectedState ? renderMenuTabs() : renderSelectedState()}
                  <UnsavedChangesDialog
                    open={unsavedChangesDialogOpen}
                    onContinue={() => {
                      setUnsavedChangesDialogOpen(false);
                    }}
                    onDiscard={(e) => {
                      form.reset(buildInitialValues(records?.sanitizedRecords));
                      form.trigger();
                      e.preventDefault();
                      e.stopPropagation();
                      setUnsavedChangesDialogOpen(false);
                      setEditMode(false);
                    }}
                  />
                  <Flex
                    direction={'column'}
                    style={{
                      marginTop: 'auto',
                      height: '57px',
                    }}
                  >
                    <div style={{ height: '15px' }}>
                      <P
                        style={{
                          fontSize: '10px',
                          lineHeight: '10px',
                          textAlign: 'center',
                        }}
                      >
                        {Object.keys(form.formState.errors).length > 0
                          ? 'Invalid fields in ' +
                            Object.keys(form.formState.errors).join(', ')
                          : ''}
                      </P>
                    </div>
                    <Flex
                      direction="row"
                      justify="flex-end"
                      align="flex-end"
                      gap="10px"
                    >
                      <Button
                        variant={'secondary'}
                        onClick={(e: React.MouseEvent) => {
                          // if (
                          //   form.formState.isDirty ||
                          //   tempAvatar ||
                          //   tempBanner
                          // ) {
                          //   setUnsavedChangesDialogOpen(true);
                          //   e.preventDefault();
                          //   e.stopPropagation();
                          // } else {
                          //   e.preventDefault();
                          //   e.stopPropagation();
                          //   if (selectedState) {
                          //     setSelectedState(undefined);
                          //   } else {
                          //     setEditMode(false);
                          //   }
                          // }
                          e.preventDefault();
                          e.stopPropagation();

                          if (selectedState) {
                            setSelectedState(undefined);
                          }

                          if (!selectedState && form.formState.isDirty) {
                            setUnsavedChangesDialogOpen(true);
                          }

                          if (!selectedState && !form.formState.isDirty) {
                            setEditMode(false);
                          }
                        }}
                        size={'md'}
                        style={{
                          display: selectedState ? 'block' : 'hidden',
                          width: '100%',
                        }}
                        disabled={isSubmitting}
                      >
                        {!selectedState && form.formState.isDirty
                          ? 'Cancel'
                          : 'Back'}
                      </Button>
                      {!selectedState && (
                        <Button
                          variant={'primary'}
                          size={'md'}
                          style={{
                            display: selectedState ? 'block' : 'hidden',
                            width: '100%',
                          }}
                          type={'submit'}
                          loading={isSubmitting}
                          disabled={
                            !form.formState.isDirty ||
                            (form.formState.isDirty && !form.formState.isValid)
                          }
                        >
                          Save
                        </Button>
                      )}
                    </Flex>
                  </Flex>
                </form>
              </Form>
            </FormInnerContainer>
          </FormContainer>
          <ContentSectionWrapper
            $editMode={editMode}
            id={'contentSectionScrollId'}
          >
            <ContentSection
              chainId={chainId}
              fullSubname={ens}
              sanitized={
                editMode
                  ? editedRecords?.sanitizedRecords
                  : records?.sanitizedRecords
              }
              records={editMode && editedRecords ? editedRecords : records}
              onEdit={() => setEditMode(!editMode)}
              editMode={editMode}
            />
          </ContentSectionWrapper>
        </Flex>
      )}
    </DefaultDialog>
  );
};
