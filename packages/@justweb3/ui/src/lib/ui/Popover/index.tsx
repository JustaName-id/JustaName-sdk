import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import styled from 'styled-components';

const StyledPopoverContent = styled(PopoverPrimitive.Content)`
  z-index: 50;
  width: 18rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: var(--justweb3-background-color);
  box-shadow: 2px 4px 20px 0 rgba(0, 0, 0, 0.05);
  padding: 1rem;
  outline: none;

  &[data-state='open'] {
    animation: fadeInZoom 0.2s ease-in-out;
  }

  &[data-state='closed'] {
    animation: fadeOutZoom 0.2s ease-in-out;
  }

  &[data-side='top'] {
    animation: slideInFromBottom 0.2s ease-in-out;
  }

  &[data-side='bottom'] {
    animation: slideInFromTop 0.2s ease-in-out;
  }

  &[data-side='left'] {
    animation: slideInFromRight 0.2s ease-in-out;
  }

  &[data-side='right'] {
    animation: slideInFromLeft 0.2s ease-in-out;
  }

  @keyframes fadeInZoom {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeOutZoom {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(-8px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideInFromBottom {
    from {
      transform: translateY(8px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      transform: translateX(-8px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(8px);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const StyledPopoverTrigger = styled(PopoverPrimitive.Trigger)`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

type PopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
>;

const Popover = PopoverPrimitive.Root;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <StyledPopoverContent ref={ref} {...props} />
  </PopoverPrimitive.Portal>
));

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export {
  Popover,
  StyledPopoverTrigger as PopoverTrigger,
  PopoverContent,
  PopoverContentProps,
};
