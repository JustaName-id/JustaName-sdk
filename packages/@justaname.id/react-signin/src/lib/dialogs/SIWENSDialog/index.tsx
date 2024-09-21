import {
  SubnamesType,
  useAccountEnsNames,
  useAccountSubnames,
  useJustaName,
  useMountedAccount
} from '@justaname.id/react';
import { useMemo } from 'react';
import { LoadingDialog } from '../LoadingDialog';
import { SelectSubnameDialog } from '../SelectSubnameDialog';
import { SubnameGetAllByAddressResponse } from '@justaname.id/sdk';

export interface SIWENSDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  address?: string;
  allowedEns: "all" | "platform" | string[];
}

const splitDomain = (domain: string): [string, string]=>{
  const parts = domain.split('.');

  if (parts.length === 2) {
    return ['', domain];
  }

  if (parts.length > 2) {
    return [parts.slice(0, -2).join('.'), parts.slice(-2).join('.')];
  }

  return ['', ''];
}

export const SIWENSDialog: React.FC<SIWENSDialogProps> = ({ open, handleOpenDialog, allowedEns }) => {
  const { ensDomain } = useJustaName();
  const { isConnected} = useMountedAccount()
  const { accountSubnames, isAccountSubnamesPending} = useAccountSubnames()
  const { accountEnsNames, isAccountEnsNamesPending } = useAccountEnsNames()

  const subnames = useMemo(() => {
    let accountNames = [] as SubnamesType
    if (isAccountSubnamesPending || isAccountEnsNamesPending) {
      return accountNames
    }

    if (allowedEns === 'all') {
      accountNames = [...accountNames, ...accountSubnames]
      accountNames = [...accountNames, ...accountEnsNames
          .filter(name => !name.records.isJAN)
          .map<SubnameGetAllByAddressResponse>(name => {
            const [username ] = splitDomain(name.name)
            const recordToName: SubnameGetAllByAddressResponse = {
              data: {
                textRecords: name.records.texts.map(text => ({ key: text.key, value: text.value, id: '', dataId: '' })),
                addresses: name.sanitizedRecords.allAddresses.map(address => ({ address: address.value, coinType: address.id, id: '', dataId: '' })),
                contentHash: name?.records?.contentHash?.decoded || "",
                id: '',
                subdomainId: '',
              },
              isClaimed: false,
              id: '',
              ensId:"",
              subname: name.name,
              username: username,
            }

            return recordToName
          }
      )]

    }

    if (allowedEns === 'platform') {
      accountNames= [...accountNames, ...accountSubnames.filter(subname => subname.subname.endsWith(ensDomain))]
    }

    if (Array.isArray(allowedEns)) {
      allowedEns.forEach(ens => {
        accountNames= [...accountNames, ...accountSubnames.filter(subname => subname.subname.endsWith(ens))]
      })
    }

    return accountNames
  }, [accountSubnames, allowedEns, ensDomain,accountEnsNames, isAccountEnsNamesPending, isAccountSubnamesPending]);

  if(isConnected && (isAccountSubnamesPending || isAccountEnsNamesPending) && open){
    return <LoadingDialog open={true} />
  }

  return (
      <SelectSubnameDialog open={open && !isAccountSubnamesPending && isConnected} subnames={subnames} handleOpenDialog={handleOpenDialog} />
  );
};