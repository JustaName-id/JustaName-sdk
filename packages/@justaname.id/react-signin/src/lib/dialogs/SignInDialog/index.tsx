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
  splitDomain,
} from '@justaname.id/react';
import { FC, Fragment, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from '../../hooks/useDebounce';
import { SelectSubnameItem } from '../../components/SelectSubnameItem';
import { DefaultDialog } from '../DefaultDialog';
import { SubnameGetAllByAddressResponse } from '@justaname.id/sdk';
import { LoadingDialog } from '../LoadingDialog';

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
  const { addSubname, isAddSubnamePending } = useAddSubname();
  const {
    debouncedValue: debouncedUsername,
    isDebouncing
  } = useDebounce(username, 500);

  const { signIn } = useEnsSignIn();

  const subnames = useMemo(() => {
    let accountNames = [];
    if (isAccountSubnamesPending || isAccountEnsNamesPending) {
      return accountNames;
    }

    if (allowedEns === 'all') {
      accountNames = [...accountNames, ...accountSubnames.subnames];
      accountNames = [...accountNames, ...accountEnsNames
        .filter(name => !name.records.isJAN)
        .map<SubnameGetAllByAddressResponse>(name => {
            const [username] = splitDomain(name.name);
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
              ensId: "",
              subname: name.name,
              username: username,
            }

            return recordToName;
          }
        )];
    }

    if (allowedEns === 'platform') {
      accountNames = [...accountNames, ...accountSubnames.filter(subname => subname.subname.endsWith(selectedEnsDomain))];
    }

    if (Array.isArray(allowedEns)) {
      allowedEns.forEach(ens => {
        accountNames = [...accountNames, ...accountSubnames.filter(subname => subname.subname.endsWith(ens))];
      });
    }

    return accountNames;
  }, [accountSubnames, allowedEns, selectedEnsDomain, accountEnsNames, isAccountEnsNamesPending, isAccountSubnamesPending]);

  const shouldBeAbleToSelect = useMemo(() => {
    return subnames.length > 0;
  }, [subnames]);

  const shouldBeAbleToClaimDomain = useMemo(() => {
    const filteredSubnames = subnames.filter(subname => subname.subname.split('.').length === 3);
    return !filteredSubnames.find(subname => subname.subname.endsWith(ensDomain));
  }, [subnames, selectedEnsDomain]);

  const shouldBeAbleToClaimJANDomain = useMemo(() => {
    return !subnames.find(subname => subname.subname.endsWith(chainId === 1 ? 'justan.id' : 'justan.eth'));
  }, [subnames, chainId]);

  const { isSubnameAvailable, isSubnameAvailablePending } = useIsSubnameAvailable({
    username: debouncedUsername,
    ensDomain: shouldBeAbleToClaimDomain ? ensDomain : chainId === 1 ? 'justan.id' : 'justan.eth'
  });

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
                        setSubnameSigningIn(subname.subname);
                        signIn({ ens: subname.subname }).then(() => handleOpenDialog(false)).finally(() => {
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
      <TransitionElement className={(shouldBeAbleToSelect && (shouldBeAbleToClaimDomain || shouldBeAbleToClaimJANDomain)) ? 'visible' : ''} maxheight={'100px'}>
        <OrLine />
      </TransitionElement>

      <TransitionElement className={(shouldBeAbleToClaimDomain || shouldBeAbleToClaimJANDomain) ? 'visible' : ''} maxheight={'100px'}>
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
              right={'.' + (shouldBeAbleToClaimDomain ? ensDomain : chainId === 1 ? 'justan.id' : 'justan.eth')}
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
                  ensDomain: shouldBeAbleToClaimDomain ? ensDomain : chainId === 1 ? 'justan.id' : 'justan.eth',
                  backendUrl: shouldBeAbleToClaimDomain ? undefined : `https://claim.justaname.id`,
                  addSubnameRoute: shouldBeAbleToClaimDomain ? undefined : "/api/subnames/add",
                }).then(() => {
                  setSubnameSigningIn(username + '.' + ensDomain);
                  signIn({ ens: username + '.' + ensDomain }).then(() => handleOpenDialog(false)).finally(() => {
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
    </DefaultDialog>
  );
};