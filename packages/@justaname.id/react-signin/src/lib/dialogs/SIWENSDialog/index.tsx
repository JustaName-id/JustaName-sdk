import { useAccountSubnames, useJustaName, useMountedAccount } from '@justaname.id/react';
import { useMemo } from 'react';
import { LoadingDialog } from '../LoadingDialog';
import { SelectSubnameDialog } from '../SelectSubnameDialog';

export interface SIWENSDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  address?: string;
  allowedSubnames: "all" | "platform" | string[];
}


export const SIWENSDialog: React.FC<SIWENSDialogProps> = ({ open, handleOpenDialog, allowedSubnames }) => {
  const { ensDomain } = useJustaName();
  const { isConnected} = useMountedAccount()
  const { accountSubnames, isAccountSubnamesPending} = useAccountSubnames()
  const subnames = useMemo(() => {
    if (allowedSubnames === 'all') {
      return accountSubnames;
    }

    if (allowedSubnames === 'platform') {
      return accountSubnames.filter(subname => subname.subname.endsWith(ensDomain));
    }

    return accountSubnames.filter(subname => allowedSubnames.includes(subname.subname));
  }, [accountSubnames, allowedSubnames, ensDomain]);


  if(isConnected && isAccountSubnamesPending && open){
    return <LoadingDialog open={true} />
  }

  return (
      <SelectSubnameDialog open={open && !isAccountSubnamesPending && isConnected} subnames={subnames} handleOpenDialog={handleOpenDialog} />
  );
};