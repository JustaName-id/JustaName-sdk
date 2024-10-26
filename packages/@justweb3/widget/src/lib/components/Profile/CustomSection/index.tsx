'use client';

import {
  AddCircleIcon,
  Flex,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  P,
  TrashIcon,
  WalletIcon,
} from '@justweb3/ui';
import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { metadataForm } from '../../../forms';

interface CustomSectionProps {
  fullSubname: string;
  form: UseFormReturn<metadataForm>;
}

export const CustomSection: React.FC<CustomSectionProps> = ({
  fullSubname,
  form,
}) => {
  const [customKey, setCustomKey] = React.useState<string>('');
  const [customValue, setCustomValue] = React.useState<string>('');

  const { append, remove } = useFieldArray({
    control: form.control,
    name: 'otherTexts',
  });

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
          <P style={{ fontSize: '16px', fontWeight: 700 }}>Custom</P>
        </Flex>
      </Flex>

      <Flex
        direction="column"
        gap="10px"
        className="justweb3scrollbar"
        style={{
          overflowY: 'auto',
          maxHeight: 'calc(100% - 50px)',
        }}
      >
        <Flex direction="column" gap="20px">
          {form.getValues('otherTexts').map((other, index) => {
            return (
              // <Flex
              //   direction="column"
              //   gap="5px"
              //   style={{
              //     cursor: 'pointer',
              //     width: '100%',
              //     flexGrow: 1,
              //   }}
              //   key={other.key + index}
              // >
              <Flex
                direction="row"
                gap="5px"
                align="center"
                key={other.key + index}
              >
                <FormField
                  control={form.control}
                  name={`otherTexts.${index}.key`}
                  render={({ field }) => (
                    <FormItem
                      style={{
                        width: '100%',
                      }}
                    >
                      <FormControl>
                        <Input
                          placeholder={'Key'}
                          {...field}
                          style={{
                            borderRadius: '10px',
                            height: '22px',
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`otherTexts.${index}.value`}
                  render={({ field }) => (
                    <FormItem
                      style={{
                        width: '100%',
                      }}
                    >
                      <FormControl>
                        <Input
                          placeholder={'Value'}
                          {...field}
                          style={{
                            borderRadius: '10px',
                            height: '22px',
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <TrashIcon
                  height={20}
                  width={20}
                  style={{
                    cursor: 'pointer',
                    margin: 'auto 0',
                    flexShrink: 0,
                  }}
                  onClick={() => {
                    remove(index);
                  }}
                />
              </Flex>
              // </Flex>
            );
          })}

          <P
            style={{
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            Add Another Field
          </P>

          <Flex direction="row" gap="5px" align="center">
            <Input
              placeholder={'Key'}
              onChange={(e) => setCustomKey(e.target.value)}
              value={customKey}
              style={{
                borderRadius: '10px',
                height: '22px',
                width: '100%',
              }}
            />

            <Input
              placeholder={'Value'}
              onChange={(e) => setCustomValue(e.target.value)}
              value={customValue}
              style={{
                borderRadius: '10px',
                height: '22px',
                width: '100%',
              }}
            />

            <AddCircleIcon
              width={20}
              height={20}
              style={{
                cursor: customKey && customValue ? 'pointer' : 'not-allowed',
                opacity: customKey && customValue ? 1 : 0.5,
                flexShrink: 0,
              }}
              onClick={() => {
                if (!customKey || !customValue) return;
                append({
                  key: customKey,
                  value: customValue,
                });
                setCustomKey('');
                setCustomValue('');
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};
