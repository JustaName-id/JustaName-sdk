import {
  Badge,
  Button,
  Flex,
  formatText,
  H2,
  Input, JustaNameLogoIcon,
  OrLine,
  ProfileIcon, SPAN
} from '@justaname.id/react-ui';
import {
  useAddSubname,
  useEnsSignIn,
  useIsSubnameAvailable,
  useJustaName,
  useMountedAccount,
  useAccountEnsNames,
  useAccountSubnames,
  Records,
} from '@justaname.id/react';
import { FC, Fragment, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from '../../hooks/useDebounce';
import { DefaultDialog } from '../DefaultDialog';
import { LoadingDialog } from '../LoadingDialog';
import { SelectSubnameItem } from '../../components/SelectSubnameItem';

export interface SignInDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  address?: string;
  allowedEns: "all" | "platform" | string[];
  logo?: string;
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

export const SignInDialog: FC<SignInDialogProps> = ({ open, handleOpenDialog, allowedEns, logo }) => {
  const { chainId, selectedEnsDomain} = useJustaName();
  const { isConnected, address } = useMountedAccount();
  const { accountSubnames, isAccountSubnamesPending } = useAccountSubnames();
  const { accountEnsNames, isAccountEnsNamesPending } = useAccountEnsNames();

  const [username, setUsername] = useState('');
  const [subnameSigningIn, setSubnameSigningIn] = useState('');
  const { addSubname: addEnsSubname, isAddSubnamePending: isAddEnsSubnamePending } = useAddSubname();
  const { addSubname: addDefaultSubname, isAddSubnamePending: isAddDefaultSubnamePending } = useAddSubname({
    backendUrl: `https://claim.justaname.id`,
    addSubnameRoute: "/api/subnames/add"
  });

  const {
    debouncedValue: debouncedUsername,
    isDebouncing
  } = useDebounce(username, 500);

  const addSubname = useMemo(() => {
    return selectedEnsDomain ? addEnsSubname : addDefaultSubname;
  }, [selectedEnsDomain, addEnsSubname, addDefaultSubname]);

  const isAddSubnamePending = useMemo(() => {
    return selectedEnsDomain ? isAddEnsSubnamePending : isAddDefaultSubnamePending;
  }, [selectedEnsDomain, isAddEnsSubnamePending, isAddDefaultSubnamePending]);

  const claimableEns = useMemo(() => {
    return selectedEnsDomain ? selectedEnsDomain : chainId === 1 ? 'justan.id' : 'justan.eth';
  }, [selectedEnsDomain, chainId]);

  const { signIn } = useEnsSignIn();

  const subnames = useMemo(() => {
    let accountNames: Records[] = [];
    if (isAccountSubnamesPending || isAccountEnsNamesPending) {
      return accountNames;
    }

    if (allowedEns === 'all') {
      accountNames = [...accountEnsNames, ...accountSubnames];
    }

    if (allowedEns === 'platform') {
      accountNames = [...accountEnsNames, ...accountSubnames].filter(subname => subname.ens.endsWith(selectedEnsDomain || ''));
    }

    if (Array.isArray(allowedEns)) {
      allowedEns.forEach(ens => {
        accountNames = [...accountEnsNames, ...accountSubnames].filter(subname => subname.ens.endsWith(ens))
      });
    }

    return accountNames;
  }, [accountSubnames, allowedEns, selectedEnsDomain, accountEnsNames, isAccountEnsNamesPending, isAccountSubnamesPending]);

  const shouldBeAbleToSelect = useMemo(() => {
    return subnames.length > 0;
  }, [subnames]);

  const shouldBeAbleToClaimDomain = useMemo(() => {
    return selectedEnsDomain ? !subnames.find(subname => subname.ens.endsWith(selectedEnsDomain)) : false;
  }, [subnames, selectedEnsDomain]);

  const shouldBeAbleToClaimJANDomain = useMemo(() => {
    return !subnames.find(subname => subname.ens.endsWith(chainId === 1 ? 'justan.id' : 'justan.eth'));
  }, [subnames, chainId]);

  const shouldBeAbleToClaim = useMemo(() => {
    return selectedEnsDomain ? shouldBeAbleToClaimDomain : shouldBeAbleToClaimJANDomain;
  }, [shouldBeAbleToClaimDomain, shouldBeAbleToClaimJANDomain, selectedEnsDomain]);

  const { isSubnameAvailable: isSelectedEnsDomainAvailable, isSubnameAvailablePending: isSelectedEnsDomainAvailablePending } = useIsSubnameAvailable({
    username: debouncedUsername,
    ensDomain: selectedEnsDomain,
  });

  const { isSubnameAvailable: isDefaultSubnameAvailable, isSubnameAvailablePending: isDefaultSubnameAvailablePending } = useIsSubnameAvailable({
    username: debouncedUsername,
    ensDomain: chainId === 1 ? 'justan.id' : 'justan.eth',
  });

  const isSubnameAvailable = useMemo(() => {
    return selectedEnsDomain ? isSelectedEnsDomainAvailable : isDefaultSubnameAvailable;
  }, [selectedEnsDomain, isSelectedEnsDomainAvailable, isDefaultSubnameAvailable]);

  const isSubnameAvailablePending = useMemo(() => {
    return selectedEnsDomain ? isSelectedEnsDomainAvailablePending : isDefaultSubnameAvailablePending;
  }, [selectedEnsDomain, isSelectedEnsDomainAvailablePending, isDefaultSubnameAvailablePending]);

  if (isConnected && (isAccountSubnamesPending || isAccountEnsNamesPending) && open) {
    return <LoadingDialog open={true} />
  }

  return (
    <DefaultDialog open={open && !isAccountSubnamesPending && isConnected} handleClose={() => handleOpenDialog(false)} header={
      <div style={{
        paddingLeft:'24px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        flexGrow:1
      }}>
        {
          logo
            ? <img src={logo} alt="logo" style={{ height: '62px' , width: 'auto' }} />
            :
        <JustaNameLogoIcon height={62} />
        }
      </div>
    }>
      <Badge>
        <SPAN
          style={{
            fontSize: '10px',
            lineHeight: '10px',
            fontWeight: 900,
          }}>
            {address && formatText(address, 4)}
        </SPAN>
      </Badge>
      <TransitionElement className={(shouldBeAbleToSelect) ? 'visible' : ''} maxheight={'fit-content'}>
        <Flex
          justify="space-between"
          direction="column"
          gap="10px"
        >
          <H2>
            Select an ENS
          </H2>
          <Flex
            direction={'column'}
            gap={'15px'}
            style={{
              maxHeight: '200px',
              overflowY: 'scroll',
              overflowX: 'hidden',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {
              subnames.map((subname, index) => {
                return (
                  <Fragment key={'subname-' + index}>
                    <SelectSubnameItem
                      selectedSubname={subnameSigningIn}
                      subname={subname}
                      onClick={() => {
                        setSubnameSigningIn(subname.ens);
                        signIn({ ens: subname.ens }).then(() => handleOpenDialog(false)).finally(() => {
                          setSubnameSigningIn('');
                        });
                      }}
                    />
                  </Fragment>
                );
              })
            }
          </Flex>
        </Flex>
      </TransitionElement>
      <TransitionElement className={(shouldBeAbleToSelect && shouldBeAbleToClaim) ? 'visible' : ''} maxheight={'100px'}>
        <OrLine />
      </TransitionElement>

      <TransitionElement className={shouldBeAbleToClaim ? 'visible' : ''} maxheight={'100px'}>
        <Flex
          justify="space-between"
          direction="column"
          gap="10px"
        >
          <H2>
            Claim a Subname
          </H2>
          <Flex
            align={'center'}
          >
            <Input
              id="name"
              placeholder={`Enter your username...`}
              right={'.' + claimableEns}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              left={<Flex justify={'center'} align={'center'}>
                <ProfileIcon
                  width={'24px'}
                />
              </Flex>}
              fullWidth
              error={isSubnameAvailable !== undefined && !isSubnameAvailable}
              style={{
                borderRadius: '16px 0 0 16px',
                textTransform: 'lowercase'
              }}
            />
            <Button
              size={'lg'}
              loading={(username.length !== 0 && isSubnameAvailablePending) || isDebouncing || isAddSubnamePending}
              disabled={username.length === 0 || isDebouncing || isSubnameAvailable === undefined || !isSubnameAvailable}
              style={{
                borderRadius: '0 16px 16px 0',
                fontWeight: '900'
              }}
              onClick={() => {

                addSubname({
                  username: username,
                  ensDomain: claimableEns,
                }).then(() => {
                  setSubnameSigningIn(username + '.' + claimableEns);
                  signIn({ ens: username + '.' + claimableEns   }).then(() => handleOpenDialog(false)).finally(() => {
                    setSubnameSigningIn('');
                  });
                })
              }}
            >
              Claim
            </Button>
          </Flex>
        </Flex>
      </TransitionElement>
    </DefaultDialog>
  );
};