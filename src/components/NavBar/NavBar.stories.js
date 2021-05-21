import React from 'react';
import NavBar from './NavBar';

export default {
  title: 'Components/NavBar',
  component: NavBar,
  argTypes: { children: { control: 'text' } },
};

const Template = ({ ...args }) => <NavBar {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
