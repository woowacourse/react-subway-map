import LoginPage from './LoginPage';
import { Story } from '@storybook/react';

export default {
  title: 'pages/LoginPage',
  component: LoginPage,
};

const Template: Story = (args) => <LoginPage {...args} />;

export const Default = Template.bind({});

Default.args = {};
