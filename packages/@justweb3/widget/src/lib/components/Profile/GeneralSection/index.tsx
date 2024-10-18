'use client';

import { ContactsIcon, Flex, P } from "@justweb3/ui"
import { useRecords } from '@justaname.id/react';
import { GENERAL_FIELDS } from '@justaname.id/sdk';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { metadataForm } from "../../../forms";
import styled from "styled-components";
import { useJustWeb3 } from "../../../providers";
import { AvatarEditorDialog, BannerEditorDialog } from "../../../dialogs";
import { MetadataField } from "../MetadataField";

interface GeneralSectionProps {
  form: UseFormReturn<metadataForm>;
  fullSubname: string;
  tempBanner: string | null;
  setTempBanner: (newImageUrl: string | null) => void;
  tempAvatar: string | null;
  setTempAvatar: (newImageUrl: string | null) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px 20px 20px;
  gap: 20px;
  max-height: 100%;
  overflow-y: scroll;

  @media (min-width: 850px) {
    height: calc(100vh - 185px);
  }
`;

export const GeneralSection: React.FC<GeneralSectionProps> = ({ form, fullSubname, tempAvatar, setTempAvatar, setTempBanner, tempBanner }) => {

  const { records } = useRecords({
    ens: fullSubname,
  })
  const { avatar, banner } = records?.sanitizedRecords!;
  const { connectedEns } = useJustWeb3()

  const handleAvatarChange = (newImageUrl: string) => {
    setTempAvatar(newImageUrl);
    const index = GENERAL_FIELDS.findIndex((field) => field.identifier === 'avatar');
    form.setValue(`generals.${index}.value`, newImageUrl, {
      shouldValidate: true,
      shouldTouch: true
    });
  };

  const handleBannerChange = (newImageUrl: string) => {
    setTempBanner(newImageUrl);
    const index = GENERAL_FIELDS.findIndex((field) => field.identifier === 'banner');
    form.setValue(`generals.${index}.value`, newImageUrl, {
      shouldValidate: true,
      shouldTouch: true
    });
  };
  return (
    <Container>
      <Flex direction="row" gap="10px" align="center">
        <ContactsIcon height={24} width={24} />
        <Flex direction="column" gap="0px">
          <P style={{ fontSize: '10px', fontWeight: 700, color: 'black' }}>Edit Profile</P>
          <P style={{ fontSize: '16px', fontWeight: 700, color: 'black' }}>General</P>
        </Flex>
      </Flex>

      <Flex direction='column' gap='10px' style={{
        overflowY: 'scroll',
        maxHeight: '100%'
      }}>
        <Flex direction="column">
          <BannerEditorDialog
            onImageChange={handleBannerChange}
            banner={tempBanner || banner || 'https://justaname-bucket.s3.eu-central-1.amazonaws.com/default-banner.png'}
            subname={fullSubname}
          />
          <Flex direction="column" gap="10px" style={{
            overflow: 'hidden',
            position: 'relative',
            width: 'fit-content',
            marginTop: '-60px'
          }}>
            <AvatarEditorDialog
              onImageChange={handleAvatarChange}
              avatar={tempAvatar || avatar || "/sample/justsomeone.webp"}
              subname={fullSubname}
              address={(connectedEns?.address ?? '0x00') as `0x${string}`} />
          </Flex>
        </Flex>
        <Flex direction="column" gap="20px" style={{
          paddingBottom: '20px'
        }}>
          <Flex direction="column" gap="20px" style={{
            overflowY: 'auto',
          }}>
            {form.getValues('generals').filter(general => general.key !== 'avatar' && general.key !== 'banner').map((general, index) => {
              const supportedGeneral = GENERAL_FIELDS.find((s) => s.identifier === general.key);
              if (!supportedGeneral) return null;
              return (
                <MetadataField
                  key={`generals-metadata-${general.key}`}
                  label={supportedGeneral.name}
                  metadataKey={general.key}
                  form={form}
                  fieldName={`generals.${index + 2}.value`}
                  onDelete={() => {
                    form.setValue(`generals.${index + 2}.value`, '');
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
