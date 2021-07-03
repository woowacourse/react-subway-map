import { Story } from '@storybook/react';
import Login from './Login';

export default {
  title: 'page/Login',
  component: Login,
  argTypes: { children: { control: 'text' } },
};

const Template: Story = args => <Login {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
