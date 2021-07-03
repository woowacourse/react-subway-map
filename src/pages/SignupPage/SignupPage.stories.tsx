import SignupPage from './SignupPage';
import { Story } from '@storybook/react';

export default {
  title: 'pages/SignupPage',
  component: SignupPage,
};

const Template: Story = (args) => <SignupPage {...args} />;

export const Default = Template.bind({});

Default.args = {};
