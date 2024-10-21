import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';

interface StyledDropdownMenuContentProps {
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
}

const StyledDropdownMenuContent = styled(DropdownMenuPrimitive.Content) <StyledDropdownMenuContentProps>`
  z-index: 50;
  min-width: 8rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  background: var(--justweb3-background-color);
  box-shadow: 2px 4px 20px 0px rgba(0, 0, 0, 0.05);
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

const StyledDropdownMenuTrigger = styled(DropdownMenuPrimitive.Trigger)`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const StyledDropdownMenuItem = styled(DropdownMenuPrimitive.Item)`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: inherit;
  cursor: pointer;
  user-select: none;
  outline: none;
  border-radius: 8px;

  &:focus {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &[data-disabled] {
    color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
`;

const StyledDropdownMenuLabel = styled(DropdownMenuPrimitive.Label)`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
`;

const StyledDropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator)`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0.5rem 0;
`;

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> &
    StyledDropdownMenuContentProps;

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = StyledDropdownMenuTrigger;

const DropdownMenuContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    DropdownMenuContentProps
>(({ align = 'center', sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <StyledDropdownMenuContent ref={ref} align={align} sideOffset={sideOffset} {...props} />
    </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ ...props }, ref) => <StyledDropdownMenuItem ref={ref} {...props} />);
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuLabel = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ ...props }, ref) => <StyledDropdownMenuLabel ref={ref} {...props} />);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ ...props }, ref) => <StyledDropdownMenuSeparator ref={ref} {...props} />);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
};
