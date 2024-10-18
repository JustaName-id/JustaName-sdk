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
  padding: 0px 20px 20px 20px;
  gap: 20px;
  max-height: calc(100vh-255px);

  @media (min-width: 850px) {
    height: calc(100vh - 180px);
  }
`;

export const SocialsSection: React.FC<SocialsSectionProps> = ({ onBack, form }) => {

  return (
    <Container>
      <Flex direction="row" gap="10px" align="center">
        <ComicIcon height={24} width={24} />
        <Flex direction="column" gap="0px">
          <P style={{ fontSize: '10px', fontWeight: 700, color: 'black' }}>Edit Profile</P>
          <P style={{ fontSize: '16px', fontWeight: 700, color: 'black' }}>Socials</P>
        </Flex>
      </Flex>

      <Flex direction="column" gap="10px" style={{
        overflowY: 'scroll',
        maxHeight: '100%'
      }}>
        <Flex direction="column" gap="10px" style={{
          padding: '20px 0px'
        }}>
          <Flex direction="column" gap="20px" style={{
            overflowY: 'auto',
          }}>
            {form.getValues('socials').map((social, index) => {
              const supportedSocial = SUPPORTED_SOCIALS.find((s) => s.identifier === social.identifier);
              if (!supportedSocial) return null;
              return (
                <MetadataField
                  key={`socials-metadata-${social.identifier}`}
                  label={supportedSocial?.name}
                  metadataKey={social.identifier}
                  form={form}
                  leftIcon={getTextRecordIcon(social.identifier)}
                  fieldName={`socials.${index}.value`}
                  onDelete={() => {
                    form.setValue(`socials.${index}.value`, '', {
                      shouldTouch: true,
                      shouldValidate: true
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
