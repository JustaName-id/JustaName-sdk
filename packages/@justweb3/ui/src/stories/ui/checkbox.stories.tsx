import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../lib/ui';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Design System/UI/Checkbox',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Normal: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
