import { Story } from '@storybook/react';
import PathFind from './PathFind';

export default {
  title: 'page/PathFind',
  component: PathFind,
  argTypes: { children: { control: 'text' } },
};

const Template: Story = args => <PathFind {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
