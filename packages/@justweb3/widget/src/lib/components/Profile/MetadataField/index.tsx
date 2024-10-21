'use client';
import {
  Flex,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  TrashIcon,
} from '@justweb3/ui';
import React, { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface MetadataFieldProps {
  label: string;
  leftIcon?: React.ReactNode | string | JSX.Element;
  disabled?: boolean;
  onDelete?: () => void;
  metadataKey?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  fieldName:
  | `addresses.${number}.address`
  | `generals.${number}.value`
  | `contentHash.${number}.decoded`
  | `socials.${number}.value`
  | `otherTexts.${number}.value`;
}

export const MetadataField: React.FC<MetadataFieldProps> = ({
  label,
  leftIcon,
  disabled = false,
  onDelete,
  metadataKey,
  form,
  fieldName,
}) => {
  const icon = useMemo(() => {
    if (!leftIcon) return null;
    if (typeof leftIcon === 'string') {
      return <img src={leftIcon} alt={label} width={30} height={30} />;
    } else if (React.isValidElement(leftIcon)) {
      return leftIcon;
    } else {
      return React.cloneElement(leftIcon as React.ReactElement, {
        style: { width: '20px', height: '20px' },
      });
    }
  }, [leftIcon, label]);

  return (
    <Flex
      direction="column"
      gap="5px"
      style={{
        width: '100%',
      }}
    >
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Flex direction="row" gap="5px" align="flex-start">
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem style={{ flex: 1, width: '100%' }}>
              <FormControl>
                <Input
                  placeholder={label}
                  left={
                    leftIcon &&
                    React.cloneElement(icon as React.ReactElement, {
                      style: { width: '20px', height: '20px' },
                    })
                  }
                  style={{
                    borderRadius: '10px',
                    height: "22px"
                  }}
                  {...field}
                  disabled={disabled || field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {onDelete && (
          <TrashIcon
            height={20}
            width={20}
            fill="red"
            style={{
              cursor: 'pointer',
              margin: 'auto 0',
            }}
            onClick={onDelete}
          />
        )}
      </Flex>
    </Flex>
  );
};

MetadataField.displayName = 'MetadataField';
