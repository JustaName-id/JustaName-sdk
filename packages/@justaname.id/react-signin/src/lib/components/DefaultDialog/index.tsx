import {
  CloseIcon,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  Flex,
} from '@justaname.id/react-ui';
import { FC, ReactNode } from 'react';
import { Footer } from '../Footer';


export interface DefaultDialogProps {
  open?: boolean;
  handleClose?: () => void;
  children: ReactNode;
  leftHeader?: ReactNode;
  headerStyle?: React.CSSProperties;
}

export const DefaultDialog: FC<DefaultDialogProps> = ({ open, handleClose,  children , leftHeader, headerStyle={}}) => {

  return (
    <Dialog open={open === undefined ? true : open}>
      <div style={{
        display: 'hidden'
      }}>
        <DialogTitle>

        </DialogTitle>
      </div>
      <DialogContent style={{
        padding: 0,
        transition: "all 0.4 ease-in-out"
      }}>
        <Flex
          style={{
            padding: '0px 0 0 0',
            borderRadius: '16px',
            background: 'var(--justaname-foreground-color-4)',
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
              gap="10px"
            >
              {leftHeader}

              {
                handleClose ?(
                  <CloseIcon
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={handleClose}
                  />)
                  :
              <DialogClose style={{
                border: "0px",
                background: "none",
                padding: 0,
                height: "24px",
                display: "flex",
                placeContent: "center",
              }}>
                <CloseIcon
                  style={{
                    cursor: 'pointer'
                  }}
                />
              </DialogClose>
              }
            </Flex>
            {children}
          </Flex>
          <Footer />
        </Flex>
      </DialogContent>
    </Dialog>
  );
}