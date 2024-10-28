import React, { FC, Fragment, useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Flex,
  formatText,
  H2,
  Input,
  JustaNameLogoIcon,
  LoadingSpinner,
  OrLine,
  ProfileIcon,
  SPAN,
} from '@justweb3/ui';
import {
  Records,
  useAccountEnsNames,
  useAccountSubnames,
  useAddSubname,
  useEnsSignIn,
  useIsSubnameAvailable,
  useJustaName,
  useMountedAccount,
} from '@justaname.id/react';
import { useDebounce } from '../../hooks/useDebounce';
import { DefaultDialog } from '../DefaultDialog';
import { SelectSubnameItem } from '../../components/SelectSubnameItem';
import styles from './SignInDialog.module.css';
import clsx from 'clsx';

interface TransitionElementProps extends React.HTMLAttributes<HTMLDivElement> {
  maxheight: string;
  visible: boolean;
}

const TransitionElement: FC<TransitionElementProps> = ({
  maxheight,
  visible,
  children,
  ...props
}) => {
  const classNames = clsx(styles.transitionElement, {
    [styles.visible]: visible,
  });

  const inlineStyle = visible ? { maxHeight: maxheight } : undefined;

  return (
    <div className={classNames} style={inlineStyle} {...props}>
      {children}
    </div>
  );
};

export interface SignInDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  address?: string;
  allowedEns: 'all' | 'claimable' | string[];
  logo?: string;
  disableOverlay?: boolean;
  dev?: boolean;
}

export const SignInDialog: FC<SignInDialogProps> = ({
  open,
  handleOpenDialog,
  allowedEns,
  logo,
  disableOverlay,
  dev = false,
}) => {
  const { chainId, ensDomains } = useJustaName();
  const { isConnected, address } = useMountedAccount();
  const { accountSubnames, isAccountSubnamesPending } = useAccountSubnames();
  const { accountEnsNames, isAccountEnsNamesPending } = useAccountEnsNames();
  const [username, setUsername] = useState('');
  const { debouncedValue: debouncedUsername, isDebouncing } = useDebounce(
    username,
    500
  );

  const [subnameSigningIn, setSubnameSigningIn] = useState('');

  const mainnetFreeEns = useMemo(() => {
    return dev ? 'justanexample.eth' : 'justan.id';
  }, [dev]);

  const testnetFreeEns = useMemo(() => {
    return dev ? 'jaw.eth' : 'justan.eth';
  }, [dev]);

  const configuredMainnetEns = useMemo(() => {
    return ensDomains.find((ens) => ens.chainId === 1)?.ensDomain;
  }, [ensDomains]);

  const configuredTestnetEns = useMemo(() => {
    return ensDomains.find((ens) => ens.chainId === 11155111)?.ensDomain;
  }, [ensDomains]);

  const claimableMainnetEns = useMemo(() => {
    return configuredMainnetEns || mainnetFreeEns;
  }, [configuredMainnetEns, mainnetFreeEns]);

  const claimableTestnetEns = useMemo(() => {
    return configuredTestnetEns || testnetFreeEns;
  }, [configuredTestnetEns, testnetFreeEns]);

  const claimableEns = useMemo(() => {
    return chainId === 1 ? claimableMainnetEns : claimableTestnetEns;
  }, [chainId, claimableMainnetEns, claimableTestnetEns]);

  const {
    addSubname: addSubnameTestnet,
    isAddSubnamePending: isAddSubnamePendingTestnet,
  } = useAddSubname({
    ensDomain: claimableTestnetEns,
    backendUrl:
      claimableTestnetEns === testnetFreeEns
        ? dev
          ? 'https://claim-staging.justaname.id'
          : 'https://claim.justaname.id'
        : undefined,
    chainId: 11155111,
  });

  const {
    addSubname: addSubnameMainnet,
    isAddSubnamePending: isAddSubnamePendingMainnet,
  } = useAddSubname({
    ensDomain: claimableMainnetEns,
    backendUrl:
      claimableMainnetEns === mainnetFreeEns
        ? dev
          ? 'https://claim-staging.justaname.id'
          : 'https://claim.justaname.id'
        : undefined,
    chainId: 1,
  });

  const addSubname = useMemo(() => {
    return chainId === 1 ? addSubnameMainnet : addSubnameTestnet;
  }, [chainId, addSubnameMainnet, addSubnameTestnet]);

  const isAddSubnamePending = useMemo(() => {
    return chainId === 1
      ? isAddSubnamePendingMainnet
      : isAddSubnamePendingTestnet;
  }, [chainId, isAddSubnamePendingMainnet, isAddSubnamePendingTestnet]);

  const { signIn } = useEnsSignIn();

  const subnames = useMemo(() => {
    const allNames = [...accountEnsNames, ...accountSubnames].reduce(
      (acc, subname) => {
        if (!acc.find((name) => name.ens === subname.ens)) {
          return [...acc, subname];
        }
        return acc;
      },
      [] as Records[]
    );
    let accountNames: Records[] = [];
    if (isAccountSubnamesPending || isAccountEnsNamesPending) {
      return accountNames;
    }

    if (allowedEns === 'all') {
      accountNames = allNames;
    }

    if (allowedEns === 'claimable') {
      accountNames = allNames.filter(
        (subname) =>
          subname.ens.endsWith('.' + claimableEns) ||
          subname.ens === claimableEns
      );
    }

    if (Array.isArray(allowedEns)) {
      accountNames = allNames.filter((subname) =>
        [...allowedEns, claimableEns].find(
          (ens) => subname.ens.endsWith('.' + ens) || subname.ens === ens
        )
      );
    }

    return accountNames;
  }, [
    accountSubnames,
    allowedEns,
    claimableEns,
    accountEnsNames,
    isAccountEnsNamesPending,
    isAccountSubnamesPending,
  ]);

  const shouldBeAbleToSelect = useMemo(() => {
    return subnames.length > 0;
  }, [subnames]);

  const shouldBeAbleToClaim = useMemo(() => {
    return !subnames.find((subname) => subname.ens.endsWith(claimableEns));
  }, [subnames, claimableEns]);

  const { isSubnameAvailable, isSubnameAvailablePending } =
    useIsSubnameAvailable({
      username: debouncedUsername,
      ensDomain: claimableEns,
      chainId: chainId,
    });

  return (
    <DefaultDialog
      disableOverlay={disableOverlay}
      open={open && !isAccountSubnamesPending && isConnected}
      handleClose={() => handleOpenDialog(false)}
      header={
        <Flex
          align="center"
          justify="center"
          gap="20px"
          style={{
            flex: 1,
            paddingLeft: '24px',
          }}
        >
          {logo ? (
            <img src={logo} alt="logo" className={styles.logoImg} />
          ) : (
            <JustaNameLogoIcon height={62} />
          )}
        </Flex>
      }
    >
      <Flex direction="column" gap="10px">
        <Badge value={address}>
          <SPAN className={styles.badgeText}>
            {address && formatText(address, 4)}
          </SPAN>
        </Badge>
        {isAccountSubnamesPending || isAccountEnsNamesPending ? (
          <div className={styles.loadingContainer}>
            <LoadingSpinner color={'var(--justweb3-primary-color)'} />
          </div>
        ) : (
          <Flex direction="column" gap="20px">
            <TransitionElement
              visible={shouldBeAbleToSelect}
              maxheight="fit-content"
            >
              <Flex direction="column" gap="20px" justify={'space-between'}>
                <H2>Select an ENS</H2>
                <Flex
                  direction="column"
                  gap="15px"
                  className={clsx(styles.contentWrapper)}
                >
                  {subnames.map((subname, index) => (
                    <Fragment key={'subname-' + index}>
                      <SelectSubnameItem
                        selectedSubname={subnameSigningIn}
                        subname={subname}
                        onClick={() => {
                          setSubnameSigningIn(subname.ens);
                          signIn({ ens: subname.ens })
                            .then(() => handleOpenDialog(false))
                            .finally(() => {
                              setSubnameSigningIn('');
                            });
                        }}
                      />
                    </Fragment>
                  ))}
                </Flex>
              </Flex>
            </TransitionElement>
            <TransitionElement
              visible={shouldBeAbleToSelect && shouldBeAbleToClaim}
              maxheight="100px"
            >
              <OrLine />
            </TransitionElement>
            <TransitionElement visible={shouldBeAbleToClaim} maxheight="102px">
              <Flex direction="column" gap="20px" justify={'space-between'}>
                <H2>Claim a Subname</H2>
                <Flex align="center">
                  <Input
                    id="name"
                    placeholder={`Enter your username...`}
                    right={'.' + claimableEns}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    left={
                      <Flex justify="center" align="center">
                        <ProfileIcon width={'24px'} />
                      </Flex>
                    }
                    fullWidth
                    error={
                      isSubnameAvailable !== undefined && !isSubnameAvailable
                    }
                    className={styles.inputFullWidth}
                    style={{
                      borderRadius: '100px 0 0 100px',
                      textTransform: 'lowercase',
                    }}
                  />
                  <Button
                    size={'lg'}
                    loading={
                      (username.length !== 0 && isSubnameAvailablePending) ||
                      isDebouncing ||
                      isAddSubnamePending
                    }
                    disabled={
                      username.length === 0 ||
                      isDebouncing ||
                      isSubnameAvailable === undefined ||
                      !isSubnameAvailable.isAvailable
                    }
                    className={styles.buttonStyle}
                    onClick={() => {
                      addSubname({
                        username: username,
                        ensDomain: claimableEns,
                      }).then(() => {
                        setSubnameSigningIn(username + '.' + claimableEns);
                        signIn({ ens: username + '.' + claimableEns })
                          .then(() => handleOpenDialog(false))
                          .finally(() => {
                            setSubnameSigningIn('');
                          });
                      });
                    }}
                  >
                    Claim
                  </Button>
                </Flex>
              </Flex>
            </TransitionElement>
          </Flex>
        )}
      </Flex>
    </DefaultDialog>
  );
};
