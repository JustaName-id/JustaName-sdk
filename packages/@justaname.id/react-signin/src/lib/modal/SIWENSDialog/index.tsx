import { Dialog, DialogContent, DialogTitle } from '@justaname.id/react-ui';
import { useAccountSubnames, useJustaName, useEnsAuth } from '@justaname.id/react';
import { Loading, SelectSubname } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { LoadingDialog } from '../LoadingDialog';
import { SelectSubnameDialog } from '../SelectSubnameDialog';

export interface SIWJDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  address?: string;
  allowedSubnames: "all" | "platform" | string[];
}


export const SIWJDialog: React.FC<SIWJDialogProps> = ({ open, handleOpenDialog, address, allowedSubnames }) => {
  const [step, setStep] = useState<"loading" | "select-subname">("loading")
  const { ensDomain } = useJustaName();
  const { connectedEns } = useEnsAuth()

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


  useEffect(() => {
    if(!isAccountSubnamesPending){
      setStep("select-subname")
    }
  }, [isAccountSubnamesPending]);

  useEffect(() => {
    if(connectedEns){
      handleOpenDialog(false)
    }
  }, [connectedEns]);

  if(!address){
    return <LoadingDialog open={true} />
  }

  return (
    <>
      <SelectSubnameDialog open={step==='select-subname'} address={address} subnames={subnames} handleOpenDialog={handleOpenDialog} />
      <LoadingDialog open={isAccountSubnamesPending} />
    </>
    // <Dialog open={open}>
    //   <div style={{
    //     display: 'hidden'
    //   }}>
    //     <DialogTitle>
    //
    //     </DialogTitle>
    //   </div>
    //   <DialogContent style={{
    //     padding: 0,
    //     transition: "all 0.4 ease-in-out"
    //   }}>
    //     <TransitionElement maxheight={"100px"} className={step ==="loading" ? "visible" : ""}>
    //       <Loading />
    //     </TransitionElement>
    //
    //     <TransitionElement maxheight={"fit-content"} className={step ==="select-subname" ? "visible" : ""}>
    //       <SelectSubname address={address || ""} subnames={subnames} handleOpenDialog={handleOpenDialog} />
    //     </TransitionElement>
    //
    //   </DialogContent>
    // </Dialog>
  );
};