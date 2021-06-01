import React from 'react';
import ColorPalette from './ColorPalette';

export default {
  title: 'ColorPalette',
  component: ColorPalette,
};

const Template = (args) => <ColorPalette {...args} />;

export const Default = Template.bind({});

Default.args = {};
