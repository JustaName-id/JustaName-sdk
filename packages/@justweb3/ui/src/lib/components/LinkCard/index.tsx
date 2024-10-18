'use client';
import { SUPPORTED_SOCIALS } from '@justaname.id/sdk';
import React, { useState } from 'react';
import { Flex } from '../../common';
import { CopiedIcon, CopyIcon } from '../../icons';
import { A, P } from '../../ui';

interface LinkCardProps {
    variant: "address" | "other" | "social" | "contentHash"
    icon?: React.ReactNode;
    title: string;
    value: string;
    textExtraStyle?: React.CSSProperties;
}



export const LinkCard: React.FC<LinkCardProps> = ({
    title,
    value,
    variant,
    icon,
    textExtraStyle
}) => {
    const textStyle: React.CSSProperties = {
        color: 'black',
        fontSize: '10px',
        fontWeight: 800,
        maxWidth: '100%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        fontFamily: "var(--justweb3-font-family)",
        ...textExtraStyle
    }

    const [isCopied, setIsCopied] = useState(false);
    if (icon && !React.isValidElement(icon)) {
        throw new Error('Invalid icon prop: icon must be a ReactElement');
    }

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(value)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 3000);
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };

    const formatText = (text: string) => {
        const maxLength = 20;
        if (text.length > maxLength) {
            const start = text.substring(0, maxLength / 2);
            const end = text.slice(-4);
            return `${start}...${end}`;
        }
        return text;
    };

    const linkProps = {
        href: variant === 'social'
            ? SUPPORTED_SOCIALS.find((social) => social.identifier === title)?.link(value) || ''
            : value,
        target: '_blank',
        rel: 'noopener noreferrer',
        style: {
            color: 'black',
            fontSize: '10px',
            fontWeight: 800,
            maxWidth: '100%',
            width: 'fit-content',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
        },
    };


    return (
        <Flex
            padding='5px'
            direction='row'
            justify="space-between"
            gap='10px'
            align='center'
            borderRadius='100px'
            style={{
                background: "#F5F5F5",
                fontFamily: "var(--justweb3-font-family)"
            }}
        >
            <Flex
                direction='row'
                justify="flex-start"
                gap='5px'
                align='center'
            >
                {(variant === "address" || variant === "social" || variant === "contentHash") &&
                    React.cloneElement(icon as React.ReactElement, {
                        style: {
                            width: '15px',
                            height: '15px',
                            minWidth: '15px',
                            minHeight: '15px',
                        },
                    })
                }
                <Flex direction='column'
                    justify="center"
                    gap='5px'
                    align='flex-start'
                    style={{
                        maxWidth: variant === 'other' ? 'calc(100%-24px-5px)' : 'calc(100%-2*24px-2*5px)'
                    }}
                >
                    {
                        (variant === 'address' || variant === 'other') &&

                        <P
                            style={textStyle}
                        >{
                                variant === "address" && value ? formatText(value) : title
                            }</P>
                    }

                    {
                        variant === 'social' &&
                        <A {...linkProps}>
                            <P
                                style={textStyle}
                            >{
                                    formatText(value)
                                }</P>
                        </A>
                    }

                    {variant === 'other' && value && <p
                        style={textStyle}
                    >{formatText(value)}</p>}

                    {variant === 'contentHash' &&
                        <A {...linkProps}>
                            <P
                                style={textStyle}
                            >{formatText(value)}</P>
                        </A>
                    }
                </Flex>
            </Flex>
            {isCopied ? <CopiedIcon height={12} width={12} style={{
                minWidth: '12px',
            }} /> :
                <CopyIcon height={12} width={12} style={{
                    minWidth: '12px',
                    cursor: 'pointer'
                }} onClick={copyToClipboard} />}
        </Flex>
    );
};

LinkCard.displayName = 'LinkCard';

export default LinkCard;
