'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import styles from './Sheet.module.css';
import { CloseIcon } from '../../icons';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

export interface SheetOverlayProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> {
  overlay?: boolean;
}

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  SheetOverlayProps
>(({ className, overlay = true, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={`${styles.sheetOverlay} ${className}`}
    style={{
      display: overlay ? 'block' : 'none',
    }}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(styles.sheetContent, {
  variants: {
    side: {
      top: styles.top,
      right: styles.right,
      bottom: styles.bottom,
      left: styles.left,
    },
  },
  defaultVariants: {
    side: 'right',
  },
});

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  overlay?: boolean;
  hideClose?: boolean;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', overlay = true, className, children, hideClose = false, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay overlay={overlay} />
    <SheetPrimitive.Content
      ref={ref}
      className={`${sheetVariants({ side })} ${className || ''}`}
      {...props}
    >
      {children}
      {!hideClose && (
        <SheetPrimitive.Close className={styles.sheetClose}>
          <CloseIcon style={{ width: '24px', height: '24px' }} />
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles.sheetHeader} ${className}`} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles.sheetFooter} ${className}`} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={`${styles.sheetTitle} ${className || ''}`}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={`${styles.sheetDescription} ${className}`}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
