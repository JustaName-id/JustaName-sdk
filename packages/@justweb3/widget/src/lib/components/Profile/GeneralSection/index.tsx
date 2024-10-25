'use client';

import { ContactsIcon, Flex, P } from '@justweb3/ui';
import { useEnsAvatar } from '@justaname.id/react';
import { ChainId, GENERAL_FIELDS } from '@justaname.id/sdk';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { metadataForm } from '../../../forms';
import styled from 'styled-components';
import { MetadataField } from '../MetadataField';
import { AvatarEditorDialog } from '../../../dialogs/AvatarSelectorDialog';
import { BannerEditorDialog } from '../../../dialogs/BannerSelectorDialog';
import { getTextRecordIcon } from '../../../icons/records-icons';

interface GeneralSectionProps {
  form: UseFormReturn<metadataForm>;
  address: string;
  fullSubname: string;
  chainId: ChainId;
  tempBanner: string | null;
  setTempBanner: (newImageUrl: string | null) => void;
  tempAvatar: string | null;
  setTempAvatar: (newImageUrl: string | null) => void;
  disableOverlay?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: calc(100% - 67px);
  height: 100%;
`;

export const GeneralSection: React.FC<GeneralSectionProps> = ({
  form,
  address,
  fullSubname,
  chainId,
  disableOverlay,
}) => {
  const { sanitizeEnsImage } = useEnsAvatar();
  const handleAvatarChange = (newImageUrl: string) => {
    const index = GENERAL_FIELDS.findIndex(
      (field) => field.identifier === 'avatar'
    );
    form.setValue(`generals.${index}.value`, newImageUrl, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const handleBannerChange = (newImageUrl: string) => {
    const index = GENERAL_FIELDS.findIndex(
      (field) => field.identifier === 'header'
    );
    form.setValue(`generals.${index}.value`, newImageUrl, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };
  return (
    <Container>
      <Flex direction="row" gap="10px" align="center">
        <ContactsIcon height={24} width={24} />
        <Flex direction="column" gap="0px">
          <P style={{ fontSize: '10px', fontWeight: 700 }}>Edit Profile</P>
          <P style={{ fontSize: '16px', fontWeight: 700 }}>General</P>
        </Flex>
      </Flex>

      <Flex
        direction="column"
        gap="10px"
        className={'justweb3scrollbar'}
        style={{
          overflowY: 'auto',
          maxHeight: 'calc(100% - 50px)',
        }}
      >
        <Flex direction="column">
          <BannerEditorDialog
            disableOverlay={disableOverlay}
            onImageChange={handleBannerChange}
            banner={
              sanitizeEnsImage({
                image: form
                  .getValues('generals')
                  .find((g) => g.key === 'header')?.value,
                name: fullSubname,
                chainId,
              }) ||
              'https://justaname-bucket.s3.eu-central-1.amazonaws.com/default-banner.png'
            }
            subname={fullSubname}
          />
          <Flex
            direction="column"
            gap="10px"
            style={{
              overflow: 'hidden',
              position: 'relative',
              width: '100%',
              marginTop: '-40px',
              paddingBottom: '10px',
            }}
          >
            <AvatarEditorDialog
              disableOverlay={disableOverlay}
              onImageChange={handleAvatarChange}
              avatar={sanitizeEnsImage({
                name: fullSubname,
                image: form
                  .getValues('generals')
                  .find((g) => g.key === 'avatar')?.value,
                chainId,
              })}
              chainId={chainId}
              subname={fullSubname}
              address={(address ?? '0x00') as `0x${string}`}
            />
          </Flex>
        </Flex>
        <Flex direction="column" gap="20px">
          <Flex
            direction="column"
            gap="15px"
            style={{
              overflowY: 'auto',
            }}
            className={'justweb3scrollbar'}
          >
            {form.getValues('generals').map((general, index) => {
              const supportedGeneral = GENERAL_FIELDS.find(
                (s) => s.identifier === general.key
              );
              if (!supportedGeneral) return null;
              return (
                <MetadataField
                  key={`generals-metadata-${general.key}`}
                  label={supportedGeneral.name}
                  metadataKey={general.key}
                  form={form}
                  leftIcon={getTextRecordIcon(general.key)}
                  fieldName={`generals.${index}.value`}
                  onDelete={() => {
                    form.setValue(`generals.${index}.value`, '', {
                      shouldValidate: true,
                      shouldTouch: true,
                      shouldDirty: true,
                    });
                  }}
                />
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
