import React from 'react';
import Login from './Login';

export default {
  title: 'pages/Login',
  component: Login,
  argTypes: {},
};

const Template = (args) => <Login {...args} />;

export const Default = Template.bind({});
