'use client';

import { AddIcon, Button, Flex, Input, P, WalletIcon } from '@justweb3/ui';
import React, { useMemo } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import {
  ContentHashProvider,
  ContentHashProviders,
  validateContentHash,
} from '../../../forms/contenthash.schema';
import { MetadataField } from '../MetadataField';
import { useDebounce } from '../../../hooks';
import { metadataForm } from '../../../forms';
import { getContentHashIcon } from '../../../icons/contentHash-icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: calc(100% - 62px);
  height: 100%;
`;

const ContentHashCard = styled.div<{ isSelected: boolean }>`
  min-width: 87px;
  max-width: 87px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected ? '[bg-shadow color]' : 'white'};
`;

interface ContentHashSectionProps {
  form: UseFormReturn<metadataForm>;
}

export const ContentHashSection: React.FC<ContentHashSectionProps> = ({
  form,
}) => {
  const contentHashesRef = React.useRef<HTMLDivElement>(null);
  const [contentHash, setContentHash] = React.useState<string>('');
  const [selectedContentHashProtocol, setSelectedContentHashProtocol] =
    React.useState<string>('');
  const { debouncedValue: debouncedContentHash, isDebouncing } = useDebounce(
    contentHash,
    500
  );
  const { append, remove } = useFieldArray({
    control: form.control,
    name: 'contentHash',
  });

  const suggestedContentHashProtocols = useMemo(() => {
    if (isDebouncing) return [];
    if (!debouncedContentHash) return [];

    setTimeout(() => {
      contentHashesRef.current?.scrollTo({
        behavior: 'smooth',
        top: contentHashesRef.current.scrollHeight,
      });
    }, 200);

    return ContentHashProviders.reduce(
      (acc: string[], provider: ContentHashProvider) => {
        if (validateContentHash(provider)(debouncedContentHash) === true) {
          acc.push(provider);
        }
        return acc;
      },
      []
    );
  }, [debouncedContentHash]);

  return (
    <Container>
      <Flex direction="row" gap="10px" align="center">
        <WalletIcon height={24} width={24} />
        <Flex direction="column" gap="0px">
          <P style={{ fontSize: '10px', fontWeight: 700, color: 'black' }}>
            Edit Profile
          </P>
          <P style={{ fontSize: '16px', fontWeight: 700, color: 'black' }}>
            ContentHash
          </P>
        </Flex>
      </Flex>

      {form.getValues('contentHash').length > 0 ? (
        <MetadataField
          label={form.getValues('contentHash')[0].protocolType}
          form={form}
          leftIcon={getContentHashIcon(
            form.getValues('contentHash')[0].protocolType
          )}
          fieldName={'contentHash.0.decoded'}
          onDelete={() => {
            remove(0);
          }}
        />
      ) : (
        <Flex
          direction="column"
          gap="10px"
          className="justweb3scrollbar"
          style={{
            overflowY: 'scroll',
            maxHeight: 'calc(100% - 62px)',
          }}
          ref={contentHashesRef}
        >
          <Flex direction="column" gap="20px">
            <P style={{ fontSize: '16px', fontWeight: 700, color: 'black' }}>
              Add ContentHash
            </P>

            <Input
              placeholder={'0x...'}
              onChange={(e) => setContentHash(e.target.value)}
              value={contentHash}
            />

            <Flex
              direction="row"
              gap="10px"
              align="center"
              style={{ flexWrap: 'wrap' }}
            >
              {suggestedContentHashProtocols?.map((contentHashProcotol) => {
                return (
                  <ContentHashCard
                    isSelected={
                      selectedContentHashProtocol === contentHashProcotol
                    }
                    onClick={() => {
                      if (selectedContentHashProtocol === contentHashProcotol) {
                        setSelectedContentHashProtocol('');
                      } else {
                        setSelectedContentHashProtocol(contentHashProcotol);
                      }
                    }}
                    key={contentHashProcotol}
                  >
                    <Flex
                      direction="column"
                      gap="10px"
                      align="center"
                      style={{ maxWidth: '100px' }}
                    >
                      {getContentHashIcon(contentHashProcotol)}

                      <P
                        style={{
                          color: 'var(--justweb3-primary-color)',
                          fontSize: '12px',
                          textAlign: 'center',
                          textTransform: 'capitalize',
                          fontWeight: 500,
                        }}
                      >
                        {contentHashProcotol}
                      </P>
                    </Flex>
                  </ContentHashCard>
                );
              })}
            </Flex>

            {!isDebouncing &&
              debouncedContentHash &&
              suggestedContentHashProtocols.length === 0 && (
                <P
                  style={{
                    color: 'var(--justweb3-primary-color)',
                    fontSize: '12px',
                    fontWeight: 500,
                    textTransform: 'capitalize',
                    textAlign: 'center',
                  }}
                >
                  No Protocol Found
                </P>
              )}
            <Button
              variant="secondary"
              leftIcon={<AddIcon height={24} width={24} />}
              onClick={() => {
                append({
                  protocolType: selectedContentHashProtocol,
                  decoded:
                    debouncedContentHash.split('://').length > 1
                      ? debouncedContentHash.split('://')[1]
                      : debouncedContentHash,
                });
                setSelectedContentHashProtocol('');
                setContentHash('');
              }}
              disabled={!selectedContentHashProtocol || !debouncedContentHash}
              style={{
                width: 'fit-content',
              }}
            >
              Add ContentHash
            </Button>
          </Flex>
        </Flex>
      )}
    </Container>
  );
};
