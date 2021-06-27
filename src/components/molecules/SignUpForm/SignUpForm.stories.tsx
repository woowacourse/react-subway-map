import { Story } from '@storybook/react';
import SignUpForm from './SignUpForm';

export default {
  title: 'molecule/SignUpForm',
  component: SignUpForm,
  argTypes: { children: { control: 'text' } },
};

const Template: Story = args => <SignUpForm {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
