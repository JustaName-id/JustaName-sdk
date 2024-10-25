import {
  CloseIcon,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Flex,
} from '@justweb3/ui';
import { FC, ReactNode } from 'react';
import { JustaNameFooter } from '../../components/JustaNameFooter';

export interface DefaultDialogProps {
  open?: boolean;
  handleClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  header?: ReactNode;
  innerStyle?: React.CSSProperties;
  trigger?: ReactNode;
  fullScreen?: boolean;
  disableOverlay?: boolean;
  contentStyle?: React.CSSProperties;
  withoutFooter?: boolean;
}

export const DefaultDialog: FC<DefaultDialogProps> = ({
  onOpenChange,
  trigger,
  disableOverlay,
  open,
  handleClose,
  children,
  header,
  fullScreen,
  innerStyle = {},
  contentStyle = {},
  withoutFooter,
}) => {
  return (
    <Dialog modal={!disableOverlay} open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        fullScreen={fullScreen}
        onInteractOutside={(e) => disableOverlay && e.preventDefault()}
        disableOverlay={disableOverlay}
        style={{
          padding: 0,
          transition: 'all 0.4 ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: fullScreen ? '0' : '24px',
          background: 'var(--justweb3-foreground-color-4)',
          ...contentStyle,
        }}
      >
        <div
          style={{
            display: 'hidden',
          }}
        >
          <DialogTitle></DialogTitle>
        </div>

        <Flex
          style={{
            padding: '20px',
            borderRadius: fullScreen ? '0' : '24px',
            gap: '20px',
            background: 'var(--justweb3-background-color)',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 'calc(100% - 40px - 45px )',
            ...innerStyle,
          }}
        >
          <Flex justify="space-between" direction="row">
            {header}

            {handleClose ? (
              <CloseIcon
                style={{
                  cursor: 'pointer',
                }}
                onClick={handleClose}
                width={24}
              />
            ) : (
              <DialogClose
                style={{
                  border: '0px',
                  background: 'none',
                  padding: 0,
                  height: '24px',
                  display: 'flex',
                  placeContent: 'center',
                }}
              >
                <CloseIcon
                  style={{
                    cursor: 'pointer',
                  }}
                  width={24}
                />
              </DialogClose>
            )}
          </Flex>
          {/*<Flex direction={'column'} style={{ flex: 1 }}>*/}
          {children}
          {/*</Flex>*/}
        </Flex>
        {!withoutFooter && <JustaNameFooter />}
        {/*</Flex>*/}
      </DialogContent>
    </Dialog>
  );
};
