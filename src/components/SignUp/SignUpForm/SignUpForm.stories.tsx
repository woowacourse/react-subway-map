import { Meta, Story } from '@storybook/react';
import SignUpForm from './SignUpForm';

export default {
  title: 'Components/SignUp/SignUpForm',
  component: SignUpForm,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
} as Meta;

const Template: Story = (args) => {
  return <SignUpForm {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
