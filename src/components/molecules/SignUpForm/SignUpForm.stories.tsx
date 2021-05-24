import { Story } from '@storybook/react';
import SignUpForm, { SignUpFormProps } from './SignUpForm';

export default {
  title: 'molecule/SignUpForm',
  component: SignUpForm,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<SignUpFormProps> = args => <SignUpForm {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  isValidAge: true,
  isValidEmail: true,
  isValidPassword: true,
  isValidPasswordCheck: true,
};
