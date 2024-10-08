import { Meta, StoryObj } from '@storybook/react';
import { Divider} from "../../lib/ui";

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: 'Design System/UI/Divider',
  tags: ['autodocs'],

};
export default meta;
type Story = StoryObj<typeof Divider>

export const Primary: Story = {
  args: {},
};