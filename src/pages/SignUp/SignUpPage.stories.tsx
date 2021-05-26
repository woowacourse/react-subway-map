import { Meta, Story } from '@storybook/react';
import SignUpPage from './SignUpPage';

export default {
  title: 'pages/SignUp',
  component: SignUpPage,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
} as Meta;

const Template: Story = (args) => {
  return <SignUpPage {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
