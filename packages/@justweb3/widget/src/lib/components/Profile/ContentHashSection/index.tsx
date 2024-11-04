'use client';

import { AddCircleIcon, Flex, Input, P, WalletIcon } from '@justweb3/ui';
import React, { useMemo } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { MetadataField } from '../MetadataField';
import { metadataForm } from '../../../forms';
import { getContentHashIcon } from '../../../icons/contentHash-icons';
import {
  ContentHashProviderOrAll,
  contentHashToProtocols,
  validateContentHash,
} from '../../../forms/contenthash-schema';

interface ContentHashSectionProps {
  form: UseFormReturn<metadataForm>;
}

export const ContentHashSection: React.FC<ContentHashSectionProps> = ({
  form,
}) => {
  const contentHashesRef = React.useRef<HTMLDivElement>(null);
  const [contentHash, setContentHash] = React.useState<string>('');
  // const [selectedContentHashProtocol, setSelectedContentHashProtocol] =
  React.useState<string>('');
  // const { debouncedValue: debouncedContentHash, isDebouncing } = useDebounce(
  //   contentHash,
  //   500
  // );
  const { remove, append } = useFieldArray({
    control: form.control,
    name: 'contentHash',
  });

  const contentHashValid = useMemo(() => {
    const protocol = contentHash.split('://')[0];
    if (!protocol) return false;
    const decoded = contentHash.split('://')[1];

    if (!decoded) return false;

    const provider = Object.keys(contentHashToProtocols).find((key) =>
      contentHashToProtocols[
        key as keyof typeof contentHashToProtocols
      ].includes(protocol)
    ) as ContentHashProviderOrAll;

    return validateContentHash(provider)(decoded) === true;
  }, [contentHash]);

  // const suggestedContentHashProtocols = useMemo(() => {
  //   if (isDebouncing) return [];
  //   if (!debouncedContentHash) return [];
  //
  //   return ContentHashProviders.reduce(
  //     (acc: string[], provider: ContentHashProvider) => {
  //       if (validateContentHash(provider)(debouncedContentHash) === true) {
  //         acc.push(provider);
  //       }
  //       return acc;
  //     },
  //     []
  //   );
  // }, [debouncedContentHash]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxHeight: 'calc(100% - 59px)',
        height: '100%',
      }}
    >
      <Flex direction="row" gap="10px" align="center">
        <WalletIcon height={24} width={24} />
        <Flex direction="column" gap="0px">
          <P style={{ fontSize: '10px', fontWeight: 700 }}>Edit Profile</P>
          <P style={{ fontSize: '16px', fontWeight: 700 }}>ContentHash</P>
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
            overflowY: 'auto',
            maxHeight: 'calc(100% - 59px)',
          }}
          ref={contentHashesRef}
        >
          <Flex direction="column" gap="5px">
            <P style={{ fontSize: '16px', fontWeight: 700 }}>
              Add ContentHash
            </P>

            <Flex
              gap={'5px'}
              style={{
                alignItems: 'center',
              }}
            >
              <Input
                placeholder={'ipfs://'}
                style={{
                  height: '22px',
                  borderRadius: '10px',
                  width: '100%',
                }}
                left={
                  contentHash
                    ? contentHash.split('://')[0]
                      ? getContentHashIcon(contentHash.split('://')[0])
                      : null
                    : null
                }
                onChange={(e) => setContentHash(e.target.value)}
                value={contentHash}
              />
              <AddCircleIcon
                width={20}
                height={20}
                style={{
                  cursor: contentHashValid ? 'pointer' : 'not-allowed',
                  opacity: contentHashValid ? 1 : 0.5,
                  flexShrink: 0,
                }}
                onClick={() => {
                  if (!contentHashValid) return;
                  append(
                    {
                      protocolType: contentHash.split('://')[0],
                      decoded: contentHash.split('://')[1],
                    },
                    {
                      shouldFocus: true,
                    }
                  );
                  form.trigger();
                  setContentHash('');
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
    </div>
  );
};
