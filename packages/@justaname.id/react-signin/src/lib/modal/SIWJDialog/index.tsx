import { Dialog, DialogContent, DialogTitle } from '@justaname.id/react-ui';
import { useAccountSubnames, useJustaName, useSubnameSession } from '@justaname.id/react';
import { Loading, SelectSubname } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

export interface SIWJDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  address?: string;
  allowedSubnames: "all" | "platform" | string[];
}

const TransitionElement = styled.div<{ maxheight: string }>`
  max-height: 0;
  overflow: hidden;
  display: none;
  padding: 0;
  transition: max-height 0.3s ease-out, padding 0.3s ease-out;

  &.visible {
    display: block;
    max-height: ${(props) => props.maxheight};
  }
`;

export const SIWJDialog: React.FC<SIWJDialogProps> = ({ open, handleOpenDialog, address, allowedSubnames }) => {
  const [step, setStep] = useState<"loading" | "select-subname">("loading")
  const { ensDomain } = useJustaName();
  const { subnameSession } = useSubnameSession()

  const { subnames: allSubnames, isPending} = useAccountSubnames()
  const subnames = useMemo(() => {
    if (allowedSubnames === 'all') {
      return allSubnames;
    }

    if (allowedSubnames === 'platform') {
      return allSubnames.filter(subname => subname.subname.endsWith(ensDomain));
    }

    return allSubnames.filter(subname => allowedSubnames.includes(subname.subname));
  }, [allSubnames, allowedSubnames, ensDomain]);


  useEffect(() => {
    if(!isPending){
      setStep("select-subname")
    }
  }, [isPending]);

  useEffect(() => {
    if(subnameSession){
      handleOpenDialog(false)
    }
  }, [subnameSession]);

  return (
    <Dialog open={open}>
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
        <TransitionElement maxheight={"100px"} className={step ==="loading" ? "visible" : ""}>
          <Loading />
        </TransitionElement>

        <TransitionElement maxheight={"fit-content"} className={step ==="select-subname" ? "visible" : ""}>
          <SelectSubname address={address || ""} subnames={subnames} />
        </TransitionElement>

      </DialogContent>
    </Dialog>
  );
};