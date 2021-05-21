import React from 'react';
import NavBar from './NavBar';

export default {
  title: 'components/NavBar',
  component: NavBar,
};

const Template = ({ ...args }) => <NavBar {...args} />;

export const Default = Template.bind({});

Default.args = {};
