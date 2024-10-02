import {
  SubnamesType,
  useAddSubname,
  useEnsSignIn,
  useIsSubnameAvailable,
  useJustaName,
  useMountedAccount
} from '@justaname.id/react';
import {
  Badge,
  Button,
  CloseIcon,
  Dialog,
  DialogContent,
  DialogTitle,
  Flex,
  formatText,
  H2,
  Input,
  OrLine,
  ProfileIcon
} from '@justaname.id/react-ui';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  Footer,
  SelectSubnameItem
} from '../../components';
import { useDebounce } from '../../hooks';

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

export interface SelectSubnameDialogProps {
  subnames: SubnamesType;
  handleOpenDialog: (open: boolean) => void;
  open: boolean;
}

export const SelectSubnameDialog: React.FC<SelectSubnameDialogProps> = ({ subnames, handleOpenDialog, open }) => {
  const { address } = useMountedAccount();
  const [username, setUsername] = React.useState('');
  const [subnameSigningIn, setSubnameSigningIn] = React.useState('');
  const { ensDomain, chainId } = useJustaName();
  const { addSubname, isAddSubnamePending } = useAddSubname();

  const {
    debouncedValue: debouncedUsername,
    isDebouncing
  } = useDebounce(username, 500);

  const { signIn } = useEnsSignIn();

  const shouldBeAbleToSelect = useMemo(() => {
    return subnames.length > 0;
  }, [subnames, ensDomain]);

  const shouldBeAbleToClaimDomain = useMemo(() => {
    const filteredSubnames = subnames.filter(subname => subname.subname.split('.').length === 3);
    return !filteredSubnames.find(subname => subname.subname.endsWith(ensDomain));
  }, [subnames, ensDomain]);

  const shouldBeAbleToClaimJANDomain = useMemo(() => {
    return !subnames.find(subname => subname.subname.endsWith(chainId === 1 ? 'justan.id' : 'justan.eth'));
  }, [subnames, chainId]);

  const { isSubnameAvailable, isSubnameAvailablePending } = useIsSubnameAvailable({
    username: debouncedUsername,
    ensDomain: shouldBeAbleToClaimDomain ? ensDomain : chainId === 1 ? 'justan.id' : 'justan.eth'
  });

  return (
    <Dialog open={open}
    >
      <div style={{
        display: 'hidden'
      }}>
        <DialogTitle>

        </DialogTitle>
      </div>
      <DialogContent aria-describedby='select-subname-dialog' style={{
        padding: 0,
        transition: "all 0.4 ease-in-out"
      }}>
        <Flex
          style={{
            padding: '0px 0 0 0',
            borderRadius: '16px',
            background: 'var(--justaname-foreground-color-4)',
          }}
          direction={'column'}
        >
          <Flex
            style={{
              padding: '40px 20px 20px 20px',
              // border: "1px solid var(--justaname-input-border-color)",
              borderRadius: '16px',
              background: 'var(--justaname-background-color)',
              gap: '10px',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '400px'
            }}
          >
            <Flex
              justify="space-between"
              direction="row"
              gap="10px"
            >
              <Badge style={{
                fontSize: '10px',
                lineHeight: '10px',
                fontWeight: 900,
              }}>
                {address && formatText(address, 4)}
              </Badge>

              <CloseIcon
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => handleOpenDialog(false)}
              />
            </Flex>

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
                    maxHeight: '30vh',
                    overflowY: 'scroll',
                    overflowX: 'hidden'
                  }}
                >
                  {
                    subnames.map((subname, index) => {
                      return (
                        <React.Fragment key={'subname-' + index}>
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
                        </React.Fragment>
                      );
                    })
                  }
                </Flex>
              </Flex>
            </TransitionElement>
            <TransitionElement className={(shouldBeAbleToSelect && (shouldBeAbleToClaimJANDomain || shouldBeAbleToClaimDomain)) ? 'visible' : ''} maxheight={'100px'}>
              <OrLine />
            </TransitionElement>

            <TransitionElement maxheight={'100px'} className={(shouldBeAbleToClaimJANDomain || shouldBeAbleToClaimDomain) ? 'visible' : ''}>
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
                      addSubname({
                        username: username,
                        ensDomain: shouldBeAbleToClaimDomain ? ensDomain : chainId === 1 ? 'justan.id' : 'justan.eth',
                        backendUrl: shouldBeAbleToClaimDomain ? undefined : `https://claim.justaname.id`,
                        addSubnameRoute: shouldBeAbleToClaimDomain ? undefined : "/api/subnames/add",
                      }).then(() => {
                        setSubnameSigningIn(username + '.' + shouldBeAbleToClaimDomain ? ensDomain : chainId === 1 ? 'justan.id' : 'justan.eth');
                        signIn({
                          ens: username + '.' + shouldBeAbleToClaimDomain ? ensDomain : chainId === 1 ? 'justan.id' : 'justan.eth'
                        }).then(() => handleOpenDialog(false)).finally(() => {
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
          <Footer />
        </Flex>
      </DialogContent>
    </Dialog>
  );
};