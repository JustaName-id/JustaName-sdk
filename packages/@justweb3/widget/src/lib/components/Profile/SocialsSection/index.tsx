'use client';

import { ComicIcon, Flex, P } from '@justweb3/ui';
import { SUPPORTED_SOCIALS } from '@justaname.id/sdk';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { metadataForm } from '../../../forms';
import styled from 'styled-components';
import { MetadataField } from '../MetadataField';
import { getTextRecordIcon } from '../../../icons/records-icons';

interface SocialsSectionProps {
  onBack?: () => void;
  form: UseFormReturn<metadataForm>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: calc(100% - 67px);
  height: 100%;
`;

export const SocialsSection: React.FC<SocialsSectionProps> = ({
  onBack,
  form,
}) => {
  return (
    <Container>
      <Flex direction="row" gap="10px" align="center">
        <ComicIcon height={24} width={24} />
        <Flex direction="column" gap="0px">
          <P style={{ fontSize: '10px', fontWeight: 700 }}>Edit Profile</P>
          <P style={{ fontSize: '16px', fontWeight: 700 }}>Socials</P>
        </Flex>
      </Flex>

      <Flex
        direction="column"
        gap="10px"
        className="justweb3scrollbar"
        style={{
          overflowY: 'auto',
          // maxHeight: 'calc(-90px + 85vh - 30px - 20px - 52px - 10px - 16px)',
          maxHeight: 'calc(100% - 50px)',
        }}
      >
        <Flex direction="column" gap="10px">
          <Flex
            direction="column"
            gap="15px"
            style={{
              overflowY: 'auto',
            }}
          >
            {form.getValues('socials').map((social, index) => {
              const supportedSocial = SUPPORTED_SOCIALS.find(
                (s) => s.identifier === social.handle
              );
              if (!supportedSocial) return null;
              return (
                <MetadataField
                  key={`socials-metadata-${social.handle}`}
                  label={supportedSocial?.name}
                  metadataKey={social.handle}
                  form={form}
                  leftIcon={getTextRecordIcon(social.handle)}
                  fieldName={`socials.${index}.value`}
                  onDelete={() => {
                    form.setValue(`socials.${index}.value`, '', {
                      shouldTouch: true,
                      shouldValidate: true,
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
