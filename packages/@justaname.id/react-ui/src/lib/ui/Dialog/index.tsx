import React from 'react';
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
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes overlayShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const StyledContent = styled(DialogPrimitive.Content)`
    background-color: var(--justaname-background-color);
    border-radius: 16px;
    box-shadow:  2px 4px 20px 0px rgb(0 0 0 / 33%);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 400px;
    max-height: 85vh;
    padding: 40px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes contentShow {
        from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.96);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }

    &:focus {
        outline: none;
    }
`;

const StyledTitle = styled(DialogPrimitive.Title)`
    margin: 0;
    font-weight: 500;
    font-family: var(--justaname-font-family),serif;
    color: black;
    font-size: 17px;
`;

const StyledDescription = styled(DialogPrimitive.Description)`
    margin: 10px 0 20px;
    font-family: var(--justaname-font-family),serif;
    color: #6b7280;
    font-size: 15px;
    line-height: 1.5;
`;

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof StyledContent> {
    disableOverlay?: boolean;
}

// Compound components
export const Dialog: React.FC<DialogPrimitive.DialogProps> = ({ children, ...props }) => (
    <DialogPrimitive.Root

        {...props}>
        {children}
    </DialogPrimitive.Root>
);
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = React.forwardRef<
    React.ElementRef<typeof StyledContent>,
    DialogContentProps
>(({ children, disableOverlay, ...props }, forwardedRef) => (
    <DialogPrimitive.Portal>
        {!disableOverlay &&
            <StyledOverlay />
        }
        <StyledContent {...props} ref={forwardedRef}>
            {children}
        </StyledContent>
    </DialogPrimitive.Portal>
));
DialogContent.displayName = 'DialogContent';

export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;

export const DialogHeader = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;

    > * + * {
        margin-top: 0.375rem; // This is equivalent to space-y-1.5 in Tailwind
    }
`;

export const DialogFooter = styled.div`
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

export const DialogClose = DialogPrimitive.Close;