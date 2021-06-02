import { Story } from '@storybook/react';
import Line from './Line';

export default {
  title: 'page/Line',
  component: Line,
  argTypes: { children: { control: 'text' } },
};

const Template: Story = args => <Line {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
