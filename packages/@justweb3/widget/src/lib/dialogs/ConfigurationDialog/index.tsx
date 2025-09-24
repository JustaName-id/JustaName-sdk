import { useMountedAccount, useSetNameHashJustaNameResolver } from '@justaname.id/react';
import {
  BackBtn,
  Badge,
  Button,
  Flex,
  formatText,
  H2,
  LoadingSpinner,
  LogoutIcon,
  P
} from '@justweb3/ui';
import { FC, useContext } from 'react';
import { useDisconnect } from 'wagmi';
import { JustWeb3Context } from '../../providers';
import { DefaultDialog } from '../DefaultDialog';

export interface ConfigurationDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  logout?: () => void;
  onBack: () => void
}

export const ConfigurationDialog: FC<ConfigurationDialogProps> = ({
  open,
  handleOpenDialog,
  logout,
  onBack
}) => {
  const {
    config: { disableOverlay },
  } = useContext(JustWeb3Context);
  const { address, isConnected } = useMountedAccount();
  const { disconnect } = useDisconnect();

  const { NameHashJustaNameResolverSet, isSetNameHashJustaNameResolverPending, setNameHashJustaNameResolver } = useSetNameHashJustaNameResolver()

  return (
    <DefaultDialog
      contentStyle={{
        maxWidth: '400px',
      }}
      open={open}
      disableOverlay={disableOverlay}
      handleClose={() => handleOpenDialog(false)}
      header={
        isConnected && address ?
          <Badge
            withCopy={false}
            style={{
              padding: '5px',
              fontSize: '10px',
              fontWeight: 800,
            }}
          >
            {formatText(address, 4)}

            <LogoutIcon
              width={15}
              style={{
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                disconnect();
                logout && logout();
              }}
            />
          </Badge>
          : null
      }
    >
      <Flex justify="space-between" direction="column" gap="20px">
        <Flex direction='row' gap={'10px'} align={'center'} style={{ marginTop: 9 }} >
          <BackBtn onClick={() => { handleOpenDialog(false); onBack() }} />
          <H2 style={{
            fontWeight: 700,
          }}>Configure</H2>
        </Flex>
        <P style={{ fontSize: 12 }}>
          To use your JustaName primary account across the blockchain ecosystem, you need to perform a one time transaction to configure your resolver.
        </P>
        {isSetNameHashJustaNameResolverPending ? <Flex style={{
          position: 'relative'
        }}> <LoadingSpinner color={'var(--justweb3-primary-color)'} /> </Flex> :
          <Button disabled={NameHashJustaNameResolverSet} variant='primary' onClick={setNameHashJustaNameResolver} >
            {NameHashJustaNameResolverSet ? 'Configured' : 'Configure'}
          </Button>
        }
      </Flex>
    </DefaultDialog>
  );
};
