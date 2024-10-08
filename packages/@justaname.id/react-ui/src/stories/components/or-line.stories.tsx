import { Meta, StoryObj } from '@storybook/react';
import { OrLine } from "../../lib/components";

const meta: Meta<typeof OrLine> = {
  component: OrLine,
  title: 'Design System/Components/Or Line',
  tags: ['autodocs'],

};
export default meta;
type Story = StoryObj<typeof OrLine>

export const Primary: Story = {
  args: {},
};