import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import styles from './Dialog.module.css';
import clsx from 'clsx';

interface DialogProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  dialogId?: string; // Unique identifier for each dialog
}

const Dialog: FC<DialogProps> = ({
  // dialogId: explicitDialogId,
  open: propOpen,
  children,
  ...props
}) => {
  // const dialogId =
  //   explicitDialogId || (Math.random() + 1).toString(36).substring(7);
  //
  // const { dialogs, openDialog, closeDialog } = useDialogContext();
  // const isOpenFromContext = dialogs[dialogId] || false; // Context state
  // const [isOpen, setIsOpen] = useState(isOpenFromContext);
  //
  // // Use the prop 'open' if provided, otherwise use the context state
  // const open = propOpen !== undefined ? propOpen : isOpenFromContext;
  //
  // useEffect(() => {
  //   if (open) {
  //     openDialog(dialogId); // Inform the context when the dialog is opened
  //   } else {
  //     closeDialog(dialogId); // Inform the context when the dialog is closed
  //   }
  // }, [open, dialogId, openDialog, closeDialog]);
  //
  // useEffect(() => {
  //   // Sync the internal state with the context if the prop isn't controlling the state
  //   if (propOpen === undefined) {
  //     setIsOpen(isOpenFromContext);
  //   }
  // }, [propOpen, isOpenFromContext]);

  return (
    <DialogPrimitive.Root modal={true} open={propOpen} {...props}>
      {children}
    </DialogPrimitive.Root>
  );
};

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
