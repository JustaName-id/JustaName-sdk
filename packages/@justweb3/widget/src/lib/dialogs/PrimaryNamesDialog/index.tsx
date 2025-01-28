import { Records, useAccountEnsNames, useAccountSubnames, useMountedAccount, useOffchainResolvers, usePrimaryName, useSetPrimaryName } from '@justaname.id/react';
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

const ENS_MAINNET_RESOLVER = '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41';
const ENS_SEPOLIA_RESOLVER = '0x8FADE66B79cC9f707aB26799354482EB93a5B7dD';

export interface PrimaryNamesDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  logout?: () => void;
  onBack: () => void;
}

export const PrimaryNamesDialog: FC<PrimaryNamesDialogProps> = ({
  open,
  handleOpenDialog,
  logout,
  onBack
}) => {
  const {
    config: { disableOverlay },
  } = useContext(JustWeb3Context);
  const { address, isConnected, chainId } = useMountedAccount();
  const { disconnect } = useDisconnect();
  const { connectedEns, isEnsAuthPending } = useJustWeb3();

  const { accountSubnames, isAccountSubnamesPending } = useAccountSubnames();
  const { accountEnsNames, isAccountEnsNamesPending } = useAccountEnsNames();

  const { offchainResolvers } =
    useOffchainResolvers();

  const allNames = useMemo(() => {
    return [...accountEnsNames, ...accountSubnames].reduce(
      (acc, subname) => {
        if (!acc.find((name) => name.ens === subname.ens)) {
          return [...acc, subname];
        }
        return acc;
      },
      [] as Records[]
    ).filter((name) => {
      const resolverAddress =
        chainId === 1 ? ENS_MAINNET_RESOLVER : ENS_SEPOLIA_RESOLVER;
      const offchainResolver = offchainResolvers?.offchainResolvers.find(
        (resolver) => resolver.chainId === chainId
      );

      return !(
        name.records.resolverAddress !== resolverAddress &&
        name.records.resolverAddress !== offchainResolver?.resolverAddress
      );
    })
      .sort((a, b) => {
        return a.ens.localeCompare(b.ens);
      })
  }, [accountEnsNames, accountSubnames]);

  const { primaryName, isPrimaryNameLoading } = usePrimaryName({ address, enabled: !!address, chainId: chainId as ChainId, priority: 'onChain' });
  const { setPrimaryName, isSetPrimaryNamePending } = useSetPrimaryName({
    address: address || '',
  })

  const primarySubname = useMemo(() => {
    return allNames.find((subname) => subname.ens === primaryName)
  }, [allNames, primaryName])

  const filteredSubnames = useMemo(() => {
    return allNames.filter((subname) => subname.ens !== primaryName)
  }, [allNames, primaryName])

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
      {!connectedEns || isEnsAuthPending || isAccountSubnamesPending || isAccountEnsNamesPending ? (
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
            <BackBtn onClick={() => { handleOpenDialog(false); onBack() }} />
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
                  <Badge withCopy={false}>
                    <P style={{
                      fontWeight: 900,
                      fontSize: 10,
                      color: 'var(--justweb3-primary-color)',
                    }}>Primary</P>
                  </Badge>
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
                key={subname.ens}
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
