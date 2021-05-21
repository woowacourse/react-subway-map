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
  buttonType: 'square',
};

export const ColoredRound = Template.bind({});
ColoredRound.args = {
  buttonType: 'round',
};

export const TransparentSquare = Template.bind({});
TransparentSquare.args = {
  buttonType: 'square',
  isColored: false,
};

export const TransparentRound = Template.bind({});
TransparentRound.args = {
  buttonType: 'round',
  isColored: false,
};
