import React from 'react';
import Palette from './Palette';

export default {
  title: 'units/Palette',
  component: Palette,
};

const Template = (args) => <Palette {...args} />;

export const Default = Template.bind({});
Default.args = {};
