import { Story } from '@storybook/react';
import Home from './Home';

export default {
  title: 'page/Home',
  component: Home,
  argTypes: { children: { control: 'text' } },
};

const Template: Story = args => <Home {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
