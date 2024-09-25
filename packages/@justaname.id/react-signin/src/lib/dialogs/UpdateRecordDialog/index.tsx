import { FC } from 'react';
import { SubnameUpdate } from '@justaname.id/react';
import { Dialog } from '@justaname.id/react-ui';

export interface UpdateRecordDialogProps extends Omit<SubnameUpdate, 'fullEnsDomain'> {
  fullEnsDomain?: string;
}
export const UpdateRecordDialog: FC<UpdateRecordDialogProps> = ({
 fullEnsDomain,
  text,
  addresses,
  contentHash,
  chainId,
} ) => {

  return (
    <Dialog>

    </Dialog>
  );
}