import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import styles from './Dialog.module.css';
import clsx from 'clsx';

const Dialog: React.FC<DialogPrimitive.DialogProps> = ({
  children,
  ...props
}) => (
  <DialogPrimitive.Root modal={true} {...props}>
    {children}
  </DialogPrimitive.Root>
);

const DialogTrigger = DialogPrimitive.Trigger;

interface DialogContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  fullScreen?: boolean;
  disableOverlay?: boolean;
}

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ children, fullScreen, disableOverlay, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    {!disableOverlay && <DialogPrimitive.Overlay className={styles.overlay} />}
    <DialogPrimitive.Content
      ref={forwardedRef}
      className={clsx(styles.content, fullScreen ? styles.fullScreen : '')}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = 'DialogContent';

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ children, ...props }, forwardedRef) => (
  <DialogPrimitive.Title ref={forwardedRef} className={styles.title} {...props}>
    {children}
  </DialogPrimitive.Title>
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ children, ...props }, forwardedRef) => (
  <DialogPrimitive.Description
    ref={forwardedRef}
    className={styles.description}
    {...props}
  >
    {children}
  </DialogPrimitive.Description>
));
DialogDescription.displayName = 'DialogDescription';

const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div className={styles.dialogHeader} {...props}>
    {children}
  </div>
);

const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div className={styles.dialogFooter} {...props}>
    {children}
  </div>
);

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
