import { FC, ReactNode } from 'react';
import { Flex, PopoverContent, PopoverContentProps } from '@justweb3/ui';
import { JustaNameFooter } from '../JustaNameFooter';

export interface BasePopoverContentProps extends PopoverContentProps {
  children: ReactNode;
}

export const BasePopoverContent: FC<BasePopoverContentProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <PopoverContent
      style={{
        // width: "var(--radix-popover-trigger-width)",
        transformOrigin: 'var(--radix-popover-content-transform-origin)',
        width: 'min(90vw, 350px)',
        padding: '0',
        ...style,
      }}
      {...props}
    >
      <Flex
        style={{
          padding: '0px 0 0 0',
          borderRadius: '24px',
          background: 'var(--justweb3-foreground-color-4)',
        }}
        direction={'column'}
      >
        <Flex
          style={{
            padding: '20px',
            borderRadius: '24px',
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
  );
};
