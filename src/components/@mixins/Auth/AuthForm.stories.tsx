import { Meta, Story } from '@storybook/react';
import AuthForm, { AuthFormProps } from './AuthForm';

export default {
  title: 'Components/Auth/AuthForm',
  component: AuthForm,
} as Meta;

const Template: Story<AuthFormProps> = (args) => {
  return <AuthForm {...args}>hi</AuthForm>;
};

export const Default = Template.bind({});

Default.args = {
  title: 'test',
};
