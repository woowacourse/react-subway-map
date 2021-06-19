import React from 'react';
import Signup from './Signup';

export default {
  title: 'pages/Signup',
  component: Signup,
  argTypes: {},
};

const Template = (args) => <Signup {...args} />;

export const Default = Template.bind({});
