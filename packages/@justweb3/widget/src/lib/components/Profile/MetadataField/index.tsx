'use client';
import { Flex, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, TrashIcon } from '@justweb3/ui';
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
    fieldName: `addresses.${number}.address` | `generals.${number}.value` | `contentHash.${number}.decoded` | `socials.${number}.value` | `otherTexts.${number}.value`;
}

export const MetadataField: React.FC<MetadataFieldProps> = ({
    label,
    leftIcon,
    disabled = false,
    onDelete,
    metadataKey,
    form,
    fieldName
}) => {

    const icon = useMemo(() => {
        if (!leftIcon) return null;
        if (typeof leftIcon === 'string') {
            return <img src={leftIcon} alt={label} width={30} height={30} />;
        } else if (React.isValidElement(leftIcon)) {
            return leftIcon;
        } else {
            return React.cloneElement(leftIcon as React.ReactElement, { style: { width: '20px', height: '20px' } });
        }
    }, [leftIcon, label]);

    return (
        <Flex direction='column' gap="4px" style={{
            cursor: 'pointer',
            width: '100%'
        }}>
            <FormLabel htmlFor={fieldName}
                style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#000000'
                }}
            >{label}</FormLabel>
            <Flex direction='row' gap="10px" align='flex-start'>

                <FormField
                    control={form.control}
                    name={fieldName}
                    render={({ field }) =>
                        <FormItem style={{ flex: 1, width: '100%' }}>
                            <FormControl>
                                <Input
                                    placeholder={label}
                                    left={leftIcon && React.cloneElement(icon as React.ReactElement, { style: { width: '20px', height: '20px' } })}
                                    {...field}
                                    disabled={disabled || field.disabled}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }
                />
                {
                    onDelete &&
                    <TrashIcon height={24} width={24} fill='red' style={{
                        cursor: 'pointer',
                        margin: '10px 0'
                    }} onClick={onDelete} />
                }
            </Flex>

        </Flex>
    );
};

MetadataField.displayName = 'MetadataField';
