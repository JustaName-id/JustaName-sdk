import React, { FC, useEffect, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
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
import styles from './ProfileDialog.module.css';
import clsx from 'clsx';
import { JustaPlugin } from '../../plugins';

export interface ProfileDialogProps {
  ens: string;
  chainId?: 1 | 11155111;
  handleOnClose: () => void;
  disableOverlay?: boolean;
  plugins:JustaPlugin[];
}

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
  plugins,
}) => {
  const { records, isRecordsPending, refetchRecords } = useRecords({
    ens: ens,
    chainId,
  });

  const [minimized, setMinimized] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [unsavedChangesDialogOpen, setUnsavedChangesDialogOpen] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { updateSubname } = useUpdateSubname();
  const [tempAvatar, setTempAvatar] = useState<string | null>(null);
  const [tempBanner, setTempBanner] = useState<string | null>(null);

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

    const contentHash = newRecord.contentHash[0]

    const subnameRecord: SubnameRecordsRoute['response'] = {
      ens: ens || '',
      records: {
        resolverAddress: records?.records.resolverAddress || '',
        coins: coins,
        texts: texts,
        contentHash: contentHash,
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
        )
        .reduce((acc, text) => {
          acc[text.key] = '';
          return acc;
        }, {} as Record<string, string>),
    };

    try {
      await updateSubname({
        ens: ens,
        addresses,
        text: texts,
        contentHash: data.contentHash[0]
          ? data.contentHash[0].protocolType +
            '://' +
            data.contentHash[0].decoded
          : '',
      });
      await refetchRecords();
      setIsSubmitting(false);
      setTempAvatar(null);
      setTempBanner(null);
      if (records?.sanitizedRecords) {
        form.reset(buildInitialValues(records.sanitizedRecords));
      }
      setEditMode(false);
    } catch (error) {
      console.error('Error updating subname:', error);
      setIsSubmitting(false);
    }
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
          <Flex gap={'5px'} className={styles.header}>
            {minimized ? (
              <MinimizeIcon
                height={25}
                width={25}
                className={styles.iconButton}
                onClick={() => {
                  setMinimized(false);
                }}
              />
            ) : (
              <MaximizeIcon
                height={25}
                width={25}
                className={styles.iconButton}
                onClick={() => {
                  setMinimized(true);
                }}
              />
            )}
            <Badge>
              <SPAN className={styles.badgeText}>{ens}</SPAN>
            </Badge>
          </Flex>
        )
      }
    >
      {isRecordsPending || !records || !editedRecords ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinner color={'var(--justweb3-primary-color)'} />
        </div>
      ) : (
        <Flex
          style={{
            flex: 1,
            maxHeight: 'calc(100% - 20px - 25px)',
          }}
        >
          <div
            className={clsx(
              styles.formContainer,
              editMode && styles.formContainerEditMode
            )}
            style={{
              position: 'relative',
            }}
          >
            <div className={styles.formInnerContainer}>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSaveMetadata)}
                  className={styles.form}
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
                  <Flex direction={'column'} className={styles.buttonContainer}>
                    <div className={styles.errorMessage}>
                      <P>
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
            </div>
          </div>
          <div
            className={styles.contentSectionWrapper}
            id={'contentSectionScrollId'}
          >
            <ContentSection
              chainId={chainId}
              fullSubname={ens}
              plugins={plugins}
              sanitized={
                editMode
                  ? editedRecords?.sanitizedRecords
                  : records?.sanitizedRecords
              }
              records={editMode && editedRecords ? editedRecords : records}
              onEdit={() => setEditMode(!editMode)}
              editMode={editMode}
            />
          </div>
        </Flex>
      )}
    </DefaultDialog>
  );
};
