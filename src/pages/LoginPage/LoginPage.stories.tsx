import LoginPage from './LoginPage';
import { Story } from '@storybook/react';
import { PageProps } from '../types';

export default {
  title: 'pages/LoginPage',
  component: LoginPage,
};

const Template: Story<PageProps> = (args) => <LoginPage {...args} />;

export const Default = Template.bind({});

Default.args = {};
