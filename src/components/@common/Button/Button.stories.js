import React from 'react';
import Button from './Button';

export default {
  title: 'common/Button',
  component: Button,
  argTypes: {},
};

const Template = (args) => <Button {...args}>버튼</Button>;

export const ColoredSquare = Template.bind({});
ColoredSquare.args = {
  buttonShape: 'square',
};

export const ColoredRound = Template.bind({});
ColoredRound.args = {
  buttonShape: 'round',
};

export const TransparentSquare = Template.bind({});
TransparentSquare.args = {
  buttonShape: 'square',
  isColored: false,
};

export const TransparentRound = Template.bind({});
TransparentRound.args = {
  buttonShape: 'round',
  isColored: false,
};

export const DisabledColored = Template.bind({});
DisabledColored.args = {
  disabled: true,
};

export const DisabledTransparent = Template.bind({});
DisabledTransparent.args = {
  disabled: true,
  isColored: false,
};
