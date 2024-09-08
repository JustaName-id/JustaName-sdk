import { Meta, StoryObj } from '@storybook/react';
import { ClickableItem } from "../../lib/components";

const meta: Meta<typeof ClickableItem> = {
  component: ClickableItem,
  title: 'Design System/Components/ClickableItem',
  tags: ['autodocs'],

};
export default meta;
type Story = StoryObj<typeof ClickableItem>

export const Primary: Story = {
  args: {
    name: 'Click me',
    loading: false,
    disabled: false,
    onClick: () => console.log('Clicked'),
  },
};