import { Dialog, DialogContent, DialogTitle } from '@justaname.id/react-ui';
import { Loading } from '../../components/Loading';
import { FC } from 'react';

export interface LoadingDialogProps {
  open: boolean;
}

export const LoadingDialog: FC<LoadingDialogProps> = ({ open }) => {
  return (
    <Dialog open={open}>
      <div style={{
        display: 'hidden'
      }}>
        <DialogTitle>

        </DialogTitle>
      </div>
      <DialogContent aria-describedby='loading-dialog' style={{
        padding: 0,
        transition: "all 0.4 ease-in-out"
      }}>
        <Loading />
      </DialogContent>
    </Dialog>
  )
}