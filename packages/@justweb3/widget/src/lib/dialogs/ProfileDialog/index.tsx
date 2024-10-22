import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Records, useRecords, useUpdateSubname } from '@justaname.id/react';
import {
  Address,
  getCoinTypeDetails,
  sanitizeRecords,
  SubnameRecordsRoute,
  SupportedCoins,
  TextRecord,
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
import {
  buildInitialValues,
  filterUpdatedAddresses,
  filterUpdatedContentHash,
  filterUpdatedMetadata,
} from '../../utils';
import { DefaultDialog } from '../DefaultDialog';
import { UnsavedChangesDialog } from '../UnsavedChangesDialog';
import useMatchSize from '../../hooks/useMatchSize';

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
  padding-right: 0px;
  ${(props) => {
    return props.$editMode
      ? `
    flex: 1 1 0%;
    min-width: 100%;
    padding-right: 20px;
    
    @media (min-width: 850px) {
      min-width: 250px;
      max-width: 250px;
    }
  `
      : '';
  }};
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
  height: fit-content;
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
  chainId,
  handleOnClose,
  disableOverlay,
}) => {
  const { records, isRecordsPending, refetchRecords } = useRecords({
    ens: ens,
    chainId,
  });
  const [sourceElement, setSourceElementState] = useState<HTMLElement | null>(
    null
  );
  const [targetElement, setTargetElementState] = useState<HTMLElement | null>(
    null
  );
  const setSourceElement = useCallback((node: HTMLElement | null) => {
    setSourceElementState(node);
  }, []);

  const setTargetElement = useCallback((node: HTMLElement | null) => {
    setTargetElementState(node);
  }, []);
  useMatchSize(sourceElement, targetElement, {
    matchWidth: true,
    matchHeight: true,
  });

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
  });

  useEffect(() => {
    if (records) {
      form.reset(buildInitialValues(records?.sanitizedRecords));
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
        contentHash:
          newRecord.contentHash.length === 1 ? newRecord.contentHash[0] : null,
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
          color: 'black',
          fontWeight: 700,
        }}
      >
        Edit Profile
      </P>
      <Flex direction="column" gap="10px">
        {menuTabs.map((item, index) => (
          <ClickableItem
            key={'menu-tab-' + index}
            name={item.title}
            style={{
              borderRadius: '100px',
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
    const avatar = data.otherTexts.find((text) => text.key === 'avatar')?.value;
    const banner = data.otherTexts.find((text) => text.key === 'banner')?.value;

    const addresses = data.addresses.reduce((acc: Address[], address) => {
      if (address.address !== '' && address.coin !== '') {
        acc.push({
          address: address.address as string,
          coinType: parseInt(address.coin) as number,
        });
      }
      return acc;
    }, []);

    const texts = [
      ...data.otherTexts.filter(
        (text) => text.key !== 'avatar' && text.key !== 'banner'
      ),
      ...data.generals,
      ...data.socials.map((social) => ({
        key: social.handle,
        value: social.value,
      })),
    ].reduce((acc: TextRecord[], text) => {
      if (text.value !== '' && text.key !== '') {
        acc.push({
          key: text.key as string,
          value: text.value as string,
        });
      }
      return acc;
    }, []);

    if (avatar) {
      texts.push({
        key: 'avatar',
        value: avatar,
      });
    }

    if (banner) {
      texts.push({
        key: 'banner',
        value: banner,
      });
    }

    updateSubname({
      ens: ens,
      addresses: Object.fromEntries(
        filterUpdatedAddresses(records?.records.coins || [], addresses).map(
          (address) => [address.coinType.toString(), address.address]
        )
      ),
      text: Object.fromEntries(
        filterUpdatedMetadata(records?.records.texts || [], texts).map(
          (text) => [text.key, text.value]
        )
      ),
      contentHash: filterUpdatedContentHash(
        records?.records.contentHash,
        data.contentHash.length > 0
          ? [
              {
                ...data.contentHash[0],
                decoded: data.contentHash[0].decoded ?? '',
              },
            ]
          : []
      ),
    })
      .then(() => {
        refetchRecords().then((data) => {
          setEditMode(false);
          setIsSubmitting(false);
          setTempAvatar(null);
          setTempBanner(null);
          if (data?.data?.sanitizedRecords)
            form.reset(buildInitialValues(data.data.sanitizedRecords));
          setSelectedState(undefined);
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
      }}
      header={
        ens && (
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
        )
      }
    >
      {isRecordsPending || !records || !editedRecords ? (
        <div
          style={{
            position: 'relative',
            padding: '24px',
          }}
        >
          <LoadingSpinner color={'var(--justweb3-primary-color)'} />
        </div>
      ) : (
        <Flex>
          <FormContainer $editMode={editMode} ref={setTargetElement}>
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
                    setTempAvatar(null);
                    setTempBanner(null);
                    e.preventDefault();
                    e.stopPropagation();
                    if (selectedState) {
                      setSelectedState(undefined);
                    } else {
                      setEditMode(false);
                    }
                    setUnsavedChangesDialogOpen(false);
                  }}
                />
                <Flex
                  direction="row"
                  justify="flex-end"
                  align="flex-end"
                  gap="10px"
                  style={{
                    marginTop: 'auto',
                  }}
                >
                  <Button
                    variant={'secondary'}
                    onClick={(e: React.MouseEvent) => {
                      if (form.formState.isDirty || tempAvatar || tempBanner) {
                        setUnsavedChangesDialogOpen(true);
                        e.preventDefault();
                        e.stopPropagation();
                      } else {
                        e.preventDefault();
                        e.stopPropagation();
                        if (selectedState) {
                          setSelectedState(undefined);
                        } else {
                          setEditMode(false);
                        }
                      }
                    }}
                    size={'md'}
                    style={{
                      display: selectedState ? 'block' : 'hidden',
                      width: '100%',
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={'primary'}
                    size={'md'}
                    style={{
                      display: selectedState ? 'block' : 'hidden',
                      width: '100%',
                    }}
                    type={'submit'}
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </Flex>
              </form>
            </Form>
          </FormContainer>
          <ContentSectionWrapper
            ref={setSourceElement}
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
