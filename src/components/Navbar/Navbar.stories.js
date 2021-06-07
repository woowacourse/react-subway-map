import React from 'react';

import Navbar from './Navbar';

export default {
  title: 'Navbar',
  component: Navbar,
};

const Template = (args) => <Navbar {...args} />;

export const Default = Template.bind({});

Default.args = {};
