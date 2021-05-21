import React from 'react';
import { Navbar } from '..';

import Header from './Header';

export default {
  title: 'Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: <Navbar />,
};
