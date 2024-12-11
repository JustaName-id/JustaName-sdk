import { StoryObj } from '@storybook/react';
import { Checkbox, Label } from '../../lib/ui';

export const Example = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          placeItems: 'center',
          gap: '8px',
        }}
      >
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  );
};

const meta = {
  component: Example,
  title: 'Design System/UI/Label',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
