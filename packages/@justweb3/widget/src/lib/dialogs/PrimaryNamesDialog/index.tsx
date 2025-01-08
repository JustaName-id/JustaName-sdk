import { useAddressSubnames, useMountedAccount, usePrimaryName, useSetPrimaryName } from '@justaname.id/react';
import {
  Avatar,
  BackBtn,
  Badge,
  Button,
  ClickableItem,
  Flex,
  formatText,
  H2,
  LoadingSpinner,
  LogoutIcon,
  P
} from '@justweb3/ui';
import { FC, useContext, useMemo } from 'react';
import { useDisconnect } from 'wagmi';
import { JustWeb3Context, useJustWeb3 } from '../../providers';
import { DefaultDialog } from '../DefaultDialog';
import { ChainId } from '@justaname.id/sdk';

export interface PrimaryNamesDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  logout?: () => void;
}

export const PrimaryNamesDialog: FC<PrimaryNamesDialogProps> = ({
  open,
  handleOpenDialog,
  logout
}) => {
  const {
    config: { disableOverlay },
  } = useContext(JustWeb3Context);
  const { address, isConnected, chainId } = useMountedAccount();
  const { disconnect } = useDisconnect();
  const { connectedEns, isEnsAuthPending } = useJustWeb3();

  const { addressSubnames, isAddressSubnamesLoading } = useAddressSubnames({
    address: address || '',
    chainId: chainId as ChainId,
    enabled: !!address,
  });
  const { primaryName, isPrimaryNameLoading } = usePrimaryName({ address, enabled: !!address })
  const { setPrimaryName, isSetPrimaryNamePending } = useSetPrimaryName({
    address: address || '',
  })

  const primarySubname = useMemo(() => {
    return addressSubnames.find((subname) => subname.ens === primaryName)
  }, [addressSubnames, primaryName])

  const filteredSubnames = useMemo(() => {
    return addressSubnames.filter((subname) => subname.ens !== primaryName)
  }, [addressSubnames, primaryName])

  return (
    <DefaultDialog
      contentStyle={{
        maxWidth: '500px',
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
      {!connectedEns || isEnsAuthPending || isAddressSubnamesLoading ? (
        <div
          style={{
            position: 'relative',
            padding: '24px',
          }}
        >
          <LoadingSpinner color={'var(--justweb3-primary-color)'} />
        </div>
      ) : (
        <Flex justify="space-between" direction="column" gap="20px">
          <Flex direction={'row'} gap={'10px'} align={'center'} style={{ marginTop: 9 }} >
            <BackBtn onClick={() => handleOpenDialog(false)} />
            <H2 style={{
              fontWeight: 700,
            }}>Set Primary</H2>
          </Flex>
          <Flex justify="space-between" direction="column" gap="10px" style={{
            maxHeight: '50vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}>
            {!isPrimaryNameLoading && primarySubname &&
              <ClickableItem
                clickable={false}
                left={
                  <Avatar src={primarySubname.sanitizedRecords.avatar ?? ''} initial={primarySubname.ens[0]} />
                }
                title={primarySubname.ens}
                style={{
                  width: '100%',
                }}
                right={
                  <Flex direction={'row'} gap={"10px"} align={'center'}>
                    <Badge withCopy={false}>
                      <P style={{
                        fontWeight: 900,
                        fontSize: 10,
                        color: 'var(--justweb3-primary-color)',
                      }}>Primary</P>
                    </Badge>
                    <Button disabled={isSetPrimaryNamePending} variant={'secondary'}>{"Configure"}</Button>
                  </Flex>
                }
              />
            }
            {filteredSubnames.length > 0 && filteredSubnames.map((subname) =>
              <ClickableItem
                clickable={false}
                left={
                  <Avatar src={subname.sanitizedRecords.avatar ?? ''} initial={subname.ens[0]} />
                }
                title={subname.ens}
                style={{
                  width: '100%',
                }}
                right={
                  <Button disabled={isSetPrimaryNamePending} onClick={() => setPrimaryName({
                    name: subname.ens,
                  })} variant={'secondary'}>{"Set Primary"}</Button>
                }
              />
            )}
          </Flex>
        </Flex>
      )}
    </DefaultDialog>
  );
};
