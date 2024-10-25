import { StoryObj } from '@storybook/react';
import { OrLine } from '../../lib/components';
import { A, Badge, Button, H2, Input, SPAN } from '../../lib/ui';
import Chrome from '@uiw/react-color-chrome';
import { GithubPlacement } from '@uiw/react-color-github';
import { Popover } from 'react-tiny-popover';
import React from 'react';
import { formatText } from '../../lib/utils';
import ClickableItem from '../../lib/components/ClickableItem';
import { JustaNameLogoIcon, ProfileIcon } from '../../lib/icons';
import { Flex } from '../../lib/common';
import { useJustWeb3Theme } from '../../lib/providers';

const ThemeChange = () => {
  const { changeTheme } = useJustWeb3Theme();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [hsva, setHsva] = React.useState({ h: 0, s: 0, v: 0, a: 1 });
  const [isPopoverBackground, setIsPopoverBackground] = React.useState(false);
  const [backgroundHsva, setBackgroundHsva] = React.useState({
    h: 0,
    s: 0,
    v: 0,
    a: 1,
  });
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Background</p>
        <button
          style={{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            cursor: 'pointer',
            border: '1px solid hsl(0,0%,92%)',
          }}
          onClick={() => changeTheme('background', '#ffffff')}
        ></button>

        <button
          style={{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            backgroundColor: 'black',
            cursor: 'pointer',
            border: '1px solid hsl(0,0%,92%)',
          }}
          onClick={() => changeTheme('background', '#000000')}
        ></button>

        <Popover
          isOpen={isPopoverBackground}
          positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
          onClickOutside={() => setIsPopoverBackground(false)}
          content={
            <div
              style={{
                position: 'relative',
              }}
            >
              <Chrome
                color={backgroundHsva}
                showAlpha={false}
                style={{ float: 'left' }}
                placement={GithubPlacement.Top}
                onChange={(color) => {
                  changeTheme('background', color.hex);
                  setBackgroundHsva(color.hsva);
                }}
              />
            </div>
          }
        >
          <button
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '50%',
              background:
                'radial-gradient(\n' +
                '    circle at center,\n' +
                '    rgb(255, 255, 255) 0%,    /* White */\n' +
                '    rgb(255, 0, 0) 7%,        /* Red */\n' +
                '    rgb(255, 127, 0) 14%,     /* Orange */\n' +
                '    rgb(255, 255, 0) 21%,     /* Yellow */\n' +
                '    rgb(127, 255, 0) 28%,     /* Spring Green */\n' +
                '    rgb(0, 255, 0) 35%,       /* Green */\n' +
                '    rgb(0, 255, 127) 42%,     /* Turquoise */\n' +
                '    rgb(0, 255, 255) 49%,     /* Cyan */\n' +
                '    rgb(0, 127, 255) 56%,     /* Ocean */\n' +
                '    rgb(0, 0, 255) 63%,       /* Blue */\n' +
                '    rgb(127, 0, 255) 70%,     /* Violet */\n' +
                '    rgb(255, 0, 255) 77%,     /* Magenta */\n' +
                '    rgb(255, 0, 127) 84%,     /* Raspberry */\n' +
                '    rgb(0, 0, 0) 100%         /* Black */\n' +
                '  )',
              cursor: 'pointer',
              border: '1px solid hsl(0,0%,92%)',
            }}
            onClick={() => setIsPopoverBackground(!isPopoverBackground)}
          ></button>
        </Popover>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Primary</p>
        <button
          style={{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--justweb3-primary-color)',
            cursor: 'pointer',
            border: '1px solid hsl(0,0%,92%)',
          }}
          onClick={() =>
            changeTheme('primary', 'var(--justweb3-primary-color)')
          }
        ></button>

        <button
          style={{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            backgroundColor: 'black',
            cursor: 'pointer',
            border: '1px solid hsl(0,0%,92%)',
          }}
          onClick={() => changeTheme('primary', '#000000')}
        ></button>

        <Popover
          isOpen={isPopoverOpen}
          positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
          onClickOutside={() => setIsPopoverOpen(false)}
          content={
            <div
              style={{
                position: 'relative',
              }}
            >
              <Chrome
                color={hsva}
                showAlpha={false}
                style={{ float: 'left' }}
                placement={GithubPlacement.Top}
                onChange={(color) => {
                  changeTheme('primary', color.hex);
                  setHsva(color.hsva);
                }}
              />
            </div>
          }
        >
          <button
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '50%',
              background:
                'radial-gradient(\n' +
                '    circle at center,\n' +
                '    rgb(255, 255, 255) 0%,    /* White */\n' +
                '    rgb(255, 0, 0) 7%,        /* Red */\n' +
                '    rgb(255, 127, 0) 14%,     /* Orange */\n' +
                '    rgb(255, 255, 0) 21%,     /* Yellow */\n' +
                '    rgb(127, 255, 0) 28%,     /* Spring Green */\n' +
                '    rgb(0, 255, 0) 35%,       /* Green */\n' +
                '    rgb(0, 255, 127) 42%,     /* Turquoise */\n' +
                '    rgb(0, 255, 255) 49%,     /* Cyan */\n' +
                '    rgb(0, 127, 255) 56%,     /* Ocean */\n' +
                '    rgb(0, 0, 255) 63%,       /* Blue */\n' +
                '    rgb(127, 0, 255) 70%,     /* Violet */\n' +
                '    rgb(255, 0, 255) 77%,     /* Magenta */\n' +
                '    rgb(255, 0, 127) 84%,     /* Raspberry */\n' +
                '    rgb(0, 0, 0) 100%         /* Black */\n' +
                '  )',
              cursor: 'pointer',
              border: '1px solid hsl(0,0%,92%)',
            }}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          ></button>
        </Popover>
      </div>
    </div>
  );
};

const Example: React.FC = () => {
  return (
    <>
      <ThemeChange />
      <Flex
        style={{
          padding: '40px 20px 0 20px',
          gap: '20px',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--justweb3-background-color)',
          maxWidth: '400px',
        }}
      >
        <Flex justify="space-between" direction="column" gap="10px">
          <Badge>{formatText('0x42453243', 4)}</Badge>

          <H2>Select a subname</H2>
        </Flex>

        <Flex direction={'column'} gap={'10px'}>
          <ClickableItem title={'mysubname.justan.id'} subtitle={'Verified'} />
          <ClickableItem title={'mysubname.justan.id'} />
        </Flex>
        <OrLine />

        <Flex justify="space-between" direction="column" gap="10px">
          <H2>Claim a Subname</H2>
          <Flex align={'center'}>
            <Input
              id="name"
              placeholder={`Enter your username...`}
              right={'.justan.id'}
              left={
                <Flex justify={'center'} align={'center'}>
                  <ProfileIcon />
                </Flex>
              }
              fullWidth
              style={{
                borderRadius: '16px 0 0 16px',
              }}
            />
            <Button
              size={'lg'}
              style={{
                borderRadius: '0 16px 16px 0',
                fontWeight: '900',
              }}
            >
              Claim
            </Button>
          </Flex>
        </Flex>
        <Flex
          style={{
            padding: '10px',
            background: 'var(--justweb3-foreground-color-4)',
            borderRadius: '5px 5px 0 0',
            justifyContent: 'space-between',
          }}
        >
          <Flex
            justify={'center'}
            align={'center'}
            style={{
              height: '19px',
            }}
          >
            <SPAN
              style={{
                fontWeight: '700',
                fontSize: '12px',
              }}
            >
              Powered by{' '}
              <A
                style={{
                  color: 'var(--justweb3-primary-color)',
                  fontWeight: '700',
                  fontSize: '12px',
                }}
                href="https://justaname.id"
                target="_blank"
                rel="noreferrer"
              >
                justaname.id
              </A>
            </SPAN>
          </Flex>
          <JustaNameLogoIcon />
        </Flex>
      </Flex>
    </>
  );
};

const meta = {
  component: Example,
  title: 'Design System/Theme/ThemeProvider',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Normal: Story = {
  args: {},
};
