import { Meta, StoryObj } from '@storybook/react';
import { Button} from "../../lib/ui";

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Design System/UI/Button',
  tags: ['autodocs'],

  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary'],
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Claim Subname',
    size: 'md',
    disabled: false,
    loading: false,
    variant: 'primary'
  },
};

export const Secondary: Story = {
  args: {
    children: 'Back',
    size: 'md',
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Claim Subname',
    size: 'md',
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    children: 'Claim Subname',
    size: 'md',
    loading: true,
  },
}