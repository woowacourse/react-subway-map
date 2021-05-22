import React from 'react';
import { Color } from '../../types';
import ColorDot from './ColorDot';

export default {
  title: 'ColorDot',
  component: ColorDot,
};

const Template = (args) => <ColorDot {...args} />;

export const Default = Template.bind({});

Default.args = {
  color: Color.RED_500,
};
