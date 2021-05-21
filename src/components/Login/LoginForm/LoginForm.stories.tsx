import { Meta, Story } from '@storybook/react';
import LoginForm, { LoginFormProps } from './LoginForm';

export default {
  title: 'Components/Login/LoginForm',
  component: LoginForm,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
} as Meta;

const Template: Story<LoginFormProps> = (args) => {
  return <LoginForm {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  title: 'test',
};
