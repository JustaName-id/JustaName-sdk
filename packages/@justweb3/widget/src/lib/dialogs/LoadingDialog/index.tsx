import { Dialog, DialogContent, DialogTitle } from '@justweb3/ui';
import { Loading } from '../../components/Loading';
import { FC } from 'react';

export interface LoadingDialogProps {
  open: boolean;
  disableOverlay?: boolean;
}

export const LoadingDialog: FC<LoadingDialogProps> = ({
  open,
  disableOverlay,
}) => {
  return (
    <Dialog open={open} modal={!disableOverlay}>
      <div
        style={{
          display: 'hidden',
        }}
      >
        <DialogTitle></DialogTitle>
      </div>
      <DialogContent
        onInteractOutside={(e) => disableOverlay && e.preventDefault()}
        aria-describedby="loading-dialog"
        style={{
          padding: 0,
          transition: 'all 0.4 ease-in-out',
        }}
      >
        <Loading />
      </DialogContent>
    </Dialog>
  );
};
