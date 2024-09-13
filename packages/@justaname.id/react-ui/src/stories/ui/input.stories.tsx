import { Meta, StoryObj } from '@storybook/react';
import { Input } from "../../lib/ui";

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Design System/UI/Input',
  tags: ['autodocs'],

};
export default meta;
type Story = StoryObj<typeof Input>

export const Normal: Story = {
  args: {
    placeholder: 'Enter name here...',
    disabled: false,
  },
}

export const ClaimSubname: Story = {
  args: {
    placeholder: 'Enter name here...',
    right: '.justan.id',
    disabled: false,
  },
}