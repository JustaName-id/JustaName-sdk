import { Meta, StoryObj } from '@storybook/react';
import { ClickableItem } from '../../lib/components';
import { ArrowIcon } from '../../lib/icons';
import { Avatar, LoadingSpinner } from '../../lib/ui';
import { useState } from 'react';

export const Example = ({
                          loading,
  disabled,
                        }: { loading: boolean, disabled: boolean }) => {
  const [hover, setHover] = useState(false);
  const avatarSrc = 'https://avatars.githubusercontent.com/u/1234567';
  const avatarInitial = 'A';
  return <ClickableItem
    name={'Click me'}
    loading={loading}
    disabled={disabled}
    onClick={() => console.log('Clicked')}
    onHover={(hover) => setHover(hover)}
    left={<Avatar
        src={avatarSrc}
        initial={avatarInitial}
        size="28px"
        bgColor={avatarSrc ? 'var(--justweb3-foreground-color-4)' : 'var(--justweb3-primary-color)'}
        borderColor={avatarSrc ? 'var(--justweb3-foreground-color-4)' : 'var(--justweb3-primary-color)'}
        color="#ffffff"
      />}
    right={
      <>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: (hover && !loading) ? 1 : 0
        }}>
          <ArrowIcon />
        </div>

        <div style={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: loading ? 1 : 0,
          height: '30px',
          width: loading ? '30px' : '0'
        }}>
          <LoadingSpinner color={'var(--justweb3-primary-color)'} />
        </div>
      </>
    }
  />;
};


const meta: Meta<typeof Example> = {
  component: Example,
  title: 'Design System/Components/ClickableItem',
  tags: ['autodocs'],

  argTypes: {
    loading: {
      control: {
        type: 'boolean'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Example>