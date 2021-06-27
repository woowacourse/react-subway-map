import { Story } from '@storybook/react';
import LoginForm from './LoginForm';

export default {
  title: 'molecule/LoginForm',
  component: LoginForm,
  argTypes: { children: { control: 'text' } },
};

const Template: Story = args => <LoginForm {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
