import { Meta, StoryObj } from '@storybook/react';
import { Avatar } from "../../lib/ui";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Design System/UI/Avatar',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>


export const Normal: Story = {
  args: {
    src: 'https://metadata.ens.domains/mainnet/avatar/nick.eth'
  },
}