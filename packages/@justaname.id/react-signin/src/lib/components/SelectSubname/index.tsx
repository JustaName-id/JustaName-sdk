import {
  A,
  Badge,
  Button,
  ClickableItem,
  Flex,
  formatText,
  H2,
  Input,
  JustaNameLogoIcon,
  OrLine,
  ProfileIcon,
  SPAN
} from '@justaname.id/react-ui';
import {
  SubnamesType,
  useAddSubname,
  useIsSubnameAvailable,
  useJustaName,
  useSubnameSignIn
} from '@justaname.id/react';
import React, { useMemo } from 'react';
import styled from 'styled-components';
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

export interface SelectSubnameProps {
  address: string;
  subnames: SubnamesType;
}

export const SelectSubname: React.FC<SelectSubnameProps> = ({ address, subnames }) => {
  const [username, setUsername] = React.useState('');
  const [subnameSigningIn, setSubnameSigningIn] = React.useState('');
  const { ensDomain } = useJustaName();
  const { addSubname, addSubnamePending } = useAddSubname();
  const {
    debouncedValue: debouncedUsername,
    isDebouncing
  } = useDebounce(username, 500);

  const { signIn } = useSubnameSignIn();
  const { isAvailable, isPending: isSubnameAvailablePending } = useIsSubnameAvailable({
    username: debouncedUsername
  });

  const shouldBeAbleToSelect = useMemo(() => {
    return subnames.length > 0;
  }, [subnames, ensDomain]);

  const shouldBeAbleToClaim = useMemo(() => {
    return !subnames.find(subname => subname.subname.endsWith(ensDomain));
  }, [subnames, ensDomain]);

  return (
    <Flex
      style={{
        padding: '40px 20px 0 20px',
        // border: "1px solid var(--justaname-input-border-color)",
        borderRadius: '10px',
        gap: '20px',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px'
      }}
    >
      <Flex
        justify="space-between"
        direction="column"
        gap="10px"
      >
        <Badge>
          {formatText(address, 4)}
        </Badge>
      </Flex>

      <TransitionElement className={(shouldBeAbleToSelect) ? 'visible' : ''} maxheight={'fit-content'}>
        <Flex
          justify="space-between"
          direction="column"
          gap="10px"
        >
          <H2>
            Select a subname
          </H2>
          <Flex
            direction={'column'}
            gap={'15px'}
          >
            {
              subnames.map((subname, index) => {

                console.log(subname);
                return (
                  <React.Fragment key={'subname-' + index}>
                    <ClickableItem
                      key={index} name={subname.subname}
                      onClick={() => {
                        setSubnameSigningIn(subname.subname);
                        signIn({ subname: subname.subname }).finally(() => {
                          setSubnameSigningIn('');
                        });
                      }}
                      avatarSrc={subname.data.textRecords?.find((record) => record.key === 'avatar')?.value}
                      loading={subnameSigningIn === subname.subname}
                      disabled={subnameSigningIn !== subname.subname && subnameSigningIn.length > 0}
                    />
                  </React.Fragment>
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
                  color={isAvailable === undefined ? undefined : isAvailable ? 'var(--justaname-primary-color)' : 'var(--justaname-error-color)'} />
              </Flex>}
              fullWidth
              error={isAvailable !== undefined && !isAvailable}
              style={{
                borderRadius: '16px 0 0 16px',
                textTransform: 'lowercase'
              }}
            />
            <Button
              size={'lg'}
              loading={(username.length !== 0 && isSubnameAvailablePending) || isDebouncing || addSubnamePending}
              disabled={username.length === 0 || isDebouncing || isAvailable === undefined || !isAvailable}
              style={{
                borderRadius: '0 16px 16px 0',
                fontWeight: '900'
              }}
              onClick={() => {
                addSubname({ username: username }).then(() => {
                  setSubnameSigningIn(username + '.' + ensDomain);
                  signIn({ subname: username + '.' + ensDomain })
                });
              }}
            >
              Claim
            </Button>
          </Flex>
        </Flex>
      </TransitionElement>

      <Flex
        align={'center'}
        justify={'space-between'}
        style={{
          padding: '10px',
          background: 'var(--justaname-foreground-color-4)',
          borderRadius: '16px 16px 0 0'
        }}
      >
        <Flex
          justify={'center'}
          align={'center'}
          style={{
            height: '19px'
          }}
        >
          <SPAN
            style={{
              fontWeight: '700',
              fontSize: '12px'
            }}
          >
            Powered by <A
            style={{
              color: 'var(--justaname-primary-color)',
              fontWeight: '700',
              fontSize: '12px'

            }}
            href="https://justaname.id" target="_blank" rel="noreferrer">justaname.id</A>
          </SPAN>

        </Flex>
        <JustaNameLogoIcon />
      </Flex>
    </Flex>
  );
};