import { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../lib/ui';

export const Example = () => {
  return (
    <Tabs defaultValue={'1'} tabValues={['1', '2', '3']}>
      <TabsList>
        <TabsTrigger value={'1'}>Tab 1</TabsTrigger>
        <TabsTrigger value={'2'}>Tab 2</TabsTrigger>
        <TabsTrigger value={'3'}>Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value={'1'}>Content 1</TabsContent>
      <TabsContent value={'2'}>Content 2</TabsContent>
      <TabsContent value={'3'}>Content 3</TabsContent>
    </Tabs>
  );
};

const meta: Meta<typeof Example> = {
  component: Example,
  title: 'Design System/UI/Tabs',
};

export default meta;
type Story = StoryObj<typeof Example>;
