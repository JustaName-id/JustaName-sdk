import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import styled from 'styled-components';
import * as DialogPrimitive from '@radix-ui/react-dialog';

// Styled components
const StyledOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  -webkit-transition: backdrop-filter 100ms ease;
  transition: backdrop-filter 100ms ease;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  animation: overlayShow 400ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledContent = styled(DialogPrimitive.Content)<{
  $fullScreen?: boolean;
}>`
  background-color: var(--justweb3-background-color);
  border-radius: ${(props) => (props.$fullScreen ? '0' : '24px')};
  box-shadow: 2px 4px 20px 0px rgb(0 0 0 / 33%);
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: ${(props) => (props.$fullScreen ? '100vw' : 'fit-content')};
  max-width: ${(props) => (props.$fullScreen ? '100vw' : 'min(1200px, 90vw)')};
  min-width: ${(props) => (props.$fullScreen ? '100vw' : '390px')};

  min-height: ${(props) => (props.$fullScreen ? '100vh' : '200px')};
  max-height: ${(props) => (props.$fullScreen ? '100vh' : '80vh')};

  padding: 40px;
  transition: all 0.4s ease-in-out;
  animation: contentShow 400ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.6);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @media (max-width: 640px) {
    width: 100vw;
    max-width: 100vw;
    min-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }

  &:focus {
    outline: none;
  }
`;

const StyledTitle = styled(DialogPrimitive.Title)`
  margin: 0;
  font-weight: 500;
  font-family: var(--justweb3-font-family), serif;
  color: black;
  font-size: 17px;
`;

const StyledDescription = styled(DialogPrimitive.Description)`
  margin: 10px 0 20px;
  font-family: var(--justweb3-font-family), serif;
  color: #6b7280;
  font-size: 15px;
  line-height: 1.5;
`;

// Define Props Interface for DialogContent
interface DialogContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  fullScreen?: boolean;
  disableOverlay?: boolean;
}

// Compound components
const Dialog: React.FC<DialogPrimitive.DialogProps> = ({
  children,
  ...props
}) => (
  <DialogPrimitive.Root modal={true} {...props}>
    {children}
  </DialogPrimitive.Root>
);

const DialogTrigger = DialogPrimitive.Trigger;

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ children, fullScreen, disableOverlay, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    {!disableOverlay && <StyledOverlay />}
    <StyledContent ref={forwardedRef} $fullScreen={fullScreen} {...props}>
      {children}
    </StyledContent>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = 'DialogContent';

const DialogTitle = StyledTitle;
const DialogDescription = StyledDescription;

const DialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  > * + * {
    margin-top: 0.375rem; // This is equivalent to space-y-1.5 in Tailwind
  }
`;

const DialogFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding-top: 20px;
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;

    > * + * {
      margin-left: 8px; // This mimics space-x-2 in Tailwind
    }
  }
`;

const DialogClose = DialogPrimitive.Close;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
};

export type { DialogContentProps };
