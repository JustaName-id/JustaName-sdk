import {
  Badge,
  Button,
  Flex,
  formatText,
  H2,
  Input,
  OrLine,
  ProfileIcon,
} from '@justaname.id/react-ui';
import {
  SubnamesType,
  useAddSubname,
  useEnsSignIn,
  useIsSubnameAvailable,
  useJustaName,
  useMountedAccount,
  useAccountEnsNames,
  useAccountSubnames,
} from '@justaname.id/react';
import { FC, Fragment, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from '../../hooks';
import { SelectSubnameItem } from '../../components';
import { DefaultDialog } from '../../components/DefaultDialog';
import { SubnameGetAllByAddressResponse } from '@justaname.id/sdk';
import { LoadingDialog } from '../LoadingDialog';

export interface SignInDialogProps {
  open: boolean;
  handleOpenDialog: (open: boolean) => void;
  address?: string;
  allowedEns: "all" | "platform" | string[];
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

const splitDomain = (domain: string): [string, string] => {
  const parts = domain.split('.');

  if (parts.length === 2) {
    return ['', domain];
  }

  if (parts.length > 2) {
    return [parts.slice(0, -2).join('.'), parts.slice(-2).join('.')];
  }

  return ['', ''];
}

export const SignInDialog: FC<SignInDialogProps> = ({ open, handleOpenDialog, allowedEns }) => {
  const { ensDomain } = useJustaName();
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
  const { isSubnameAvailable, isSubnameAvailablePending } = useIsSubnameAvailable({
    username: debouncedUsername
  });

  const subnames = useMemo(() => {
    let accountNames = [] as SubnamesType;
    if (isAccountSubnamesPending || isAccountEnsNamesPending) {
      return accountNames;
    }

    if (allowedEns === 'all') {
      accountNames = [...accountNames, ...accountSubnames];
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
      accountNames = [...accountNames, ...accountSubnames.filter(subname => subname.subname.endsWith(ensDomain))];
    }

    if (Array.isArray(allowedEns)) {
      allowedEns.forEach(ens => {
        accountNames = [...accountNames, ...accountSubnames.filter(subname => subname.subname.endsWith(ens))];
      });
    }

    return accountNames;
  }, [accountSubnames, allowedEns, ensDomain, accountEnsNames, isAccountEnsNamesPending, isAccountSubnamesPending]);

  const shouldBeAbleToSelect = useMemo(() => {
    return subnames.length > 0;
  }, [subnames, ensDomain]);

  const shouldBeAbleToClaim = useMemo(() => {
    return !subnames.find(subname => subname.subname.endsWith(ensDomain));
  }, [subnames, ensDomain]);

  if (isConnected && (isAccountSubnamesPending || isAccountEnsNamesPending) && open) {
    return <LoadingDialog open={true} />
  }

  return (
    <DefaultDialog open={open && !isAccountSubnamesPending && isConnected} handleClose={() => handleOpenDialog(false)} leftHeader={<Badge style={{
      fontSize: '10px',
      lineHeight: '10px',
      fontWeight: 900,
    }}>
      {address && formatText(address, 4)}
    </Badge>}>
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
              maxHeight: '20vh',
              overflowY: 'scroll',
              overflowX: 'hidden'
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
      <TransitionElement className={(shouldBeAbleToSelect && shouldBeAbleToClaim) ? 'visible' : ''} maxheight={'100px'}>
        <OrLine />
      </TransitionElement>

      <TransitionElement className={(shouldBeAbleToClaim) ? 'visible' : ''} maxheight={'100px'}>
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
              right={'.' + ensDomain}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              left={<Flex justify={'center'} align={'center'}>
                <ProfileIcon
                  color={isSubnameAvailable === undefined ? undefined : isSubnameAvailable ? 'var(--justaname-primary-color)' : 'var(--justaname-error-color)'} />
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
                addSubname({ username: username }).then(() => {
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