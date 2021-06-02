import { Story } from '@storybook/react';
import LoginForm, { LoginFormProps } from './LoginForm';

export default {
  title: 'molecule/LoginForm',
  component: LoginForm,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<LoginFormProps> = args => <LoginForm {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
