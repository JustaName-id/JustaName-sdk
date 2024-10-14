import { FC, ReactNode } from 'react';
import { Flex, PopoverContent, PopoverContentProps } from '@justweb3/ui';
import { JustaNameFooter } from '../JustaNameFooter';

export interface BasePopoverContentProps extends PopoverContentProps {
  children: ReactNode;
}


export const BasePopoverContent: FC<BasePopoverContentProps> = ({ children, style, ...props }) => {

  return (
    <PopoverContent
      style={{
        width: "var(--radix-popover-trigger-width)",
        padding: '0',
      }}

      {...props}

    >
      <Flex
        style={{
          padding: '0px 0 0 0',
          borderRadius: '16px',
          background: 'var(--justweb3-foreground-color-4)'
        }}
        direction={'column'}
      >

        <Flex
          style={{
            padding: '20px',
            borderRadius: '16px',
            background: 'var(--justweb3-background-color)',
            gap: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Flex>
        <JustaNameFooter />
      </Flex>
    </PopoverContent>
  )
}