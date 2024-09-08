import { Meta, StoryObj } from '@storybook/react';
import { Badge } from "../../lib/ui";

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Design System/UI/Badge',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>

export const Normal: Story = {
  args: {
    children: '0x120...435',
  },
}

export const Claimed: Story = {
  args: {
    children: 'chosensubname.justan.id',
  },
}