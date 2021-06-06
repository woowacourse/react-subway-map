import LoginPage from './LoginPage';
import { Story } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageProps } from '../types';

export default {
  title: 'pages/LoginPage',
  component: LoginPage,
};

const Template: Story<PageProps> = (args) => (
  <Router>
    <LoginPage {...args} />
  </Router>
);

export const Default = Template.bind({});

Default.args = {};
