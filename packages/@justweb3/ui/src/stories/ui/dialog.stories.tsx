import { StoryObj } from '@storybook/react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, Input
} from '../../lib/ui';


export const Example = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
            />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const meta = {
  component: Example,
  title: 'Design System/UI/Dialog',
};

export default meta;

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { },
};