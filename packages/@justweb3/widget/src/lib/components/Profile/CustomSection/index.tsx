'use client';

import { AddIcon, Button, Flex, Input, P, WalletIcon, FormField, FormItem, FormControl, FormMessage, TrashIcon } from '@justweb3/ui';
import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import { metadataForm } from '../../../forms';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;

  @media (min-width: 850px) {
    height: calc(100vh - 185px);
  }
`;

interface CustomSectionProps {
  fullSubname: string;
  form: UseFormReturn<metadataForm>;
}

export const CustomSection: React.FC<CustomSectionProps> = ({ fullSubname, form }) => {

  const customRef = React.useRef<HTMLDivElement>(null);
  const [customKey, setCustomKey] = React.useState<string>('');
  const [customValue, setCustomValue] = React.useState<string>('');

  const { append, remove } = useFieldArray({
    control: form.control,
    name: 'otherTexts',
  });

  return (
    <Container>
      <Flex direction="row" gap="10px" align="center">
        <WalletIcon height={24} width={24} />
        <Flex direction="column" gap="0px">
          <P style={{ fontSize: '10px', fontWeight: 700, color: 'black' }}>Edit Profile</P>
          <P style={{ fontSize: '16px', fontWeight: 700, color: 'black' }}>Custom</P>
        </Flex>
      </Flex>

      <Flex direction='column' gap='10px' style={{
        overflowY: 'scroll',
        maxHeight: '100%'
      }} ref={customRef}>
        <Flex direction='column' gap='20px'>
          {
            form.getValues('otherTexts').map((other, index) => {
              return (
                <Flex direction="column" gap="10px" style={{
                  cursor: 'pointer',
                  width: '100%',
                  flexGrow: 1
                }} key={other.key + index}>
                  <Flex direction="row" gap="10px" align="center">
                    <FormField
                      control={form.control}
                      name={`otherTexts.${index}.key`}
                      render={({ field }) =>
                        <FormItem style={{
                          flex: 1
                        }}>
                          <FormControl>
                            <Input
                              placeholder={'Key'}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      }
                    />
                    <FormField
                      control={form.control}
                      name={`otherTexts.${index}.value`}
                      render={({ field }) =>
                        <FormItem style={{
                          flex: 1
                        }}>
                          <FormControl>
                            <Input
                              placeholder={'Value'}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      }
                    />
                    <TrashIcon height={20} width={20} style={{
                      cursor: 'pointer',
                      margin: 'auto 0'
                    }} onClick={() => {
                      remove(index);
                    }} />

                  </Flex>
                </Flex>
              );
            })
          }

          <P style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'black'
          }}>
            Add Another Field
          </P>



          <Flex direction="row" gap="10px" align="center">
            <Input
              placeholder={'Key'}
              onChange={(e) => setCustomKey(e.target.value)}
              value={customKey}
            />

            <Input
              placeholder={'Value'}
              onChange={(e) => setCustomValue(e.target.value)}
              value={customValue}
            />
          </Flex>

          <Button
            variant="secondary"
            leftIcon={<AddIcon height={24} width={24} />}
            onClick={() => {
              append({
                key: customKey,
                value: customValue,
              });
              setCustomKey('');
              setCustomValue('');
            }}
            disabled={customKey === '' || customValue === ''}
            style={{
              width: 'fit-content'
            }}
          >

            Add Field
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};
