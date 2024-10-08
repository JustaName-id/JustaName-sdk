import {
  CloseIcon,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Flex
} from '@justaname.id/react-ui';
import { FC, ReactNode } from 'react';
import { JustaNameFooter } from '../../components/JustaNameFooter';


export interface DefaultDialogProps {
  open?: boolean;
  handleClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  header?: ReactNode;
  headerStyle?: React.CSSProperties;
  trigger?: ReactNode;
}

export const DefaultDialog: FC<DefaultDialogProps> = ({
                                                        onOpenChange,
                                                        trigger,
                                                        open, handleClose, children, header, headerStyle = {}
                                                      }) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {
        trigger && (
          <DialogTrigger asChild>
            {trigger}
          </DialogTrigger>
        )
      }

      <DialogContent style={{
        padding: 0,
        transition: 'all 0.4 ease-in-out'
      }}>
        <div style={{
          display: 'hidden'
        }}>
          <DialogTitle>

          </DialogTitle>
        </div>
        <Flex
          style={{
            padding: '0px 0 0 0',
            borderRadius: '16px',
            background: 'var(--justaname-foreground-color-4)'
          }}
          direction={'column'}
        >
          <Flex
            style={{
              padding: '20px',
              borderRadius: '16px',
              background: 'var(--justaname-background-color)',
              gap: '20px',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '400px',
              ...headerStyle
            }}
          >
            <Flex
              justify="space-between"
              direction="row"
            >
              {header}

              {
                handleClose ? (
                    <CloseIcon
                      style={{
                        cursor: 'pointer'
                      }}
                      onClick={handleClose}
                      width={24}
                    />)
                  :
                  <DialogClose style={{
                    border: '0px',
                    background: 'none',
                    padding: 0,
                    height: '24px',
                    display: 'flex',
                    placeContent: 'center'
                  }}>
                    <CloseIcon
                      style={{
                        cursor: 'pointer'
                      }}
                      width={24}
                    />
                  </DialogClose>
              }
            </Flex>
            {children}
          </Flex>
          <JustaNameFooter />
        </Flex>
      </DialogContent>
    </Dialog>
  );
};