import React from 'react';
import Button from './Button';

export default {
  title: 'shared/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Button Test',
};

export const BigButton = Template.bind({});
BigButton.args = {
  text: 'Button Test',
  size: 'w-1/2 h-1/12',
};

export const colorButton = Template.bind({});
colorButton.args = {
  size: 'w-10 h-10',
  bgColor: 'bg-gray-300',
  hoverBgColor: 'bg-gray-400',
  className: 'rounded-full',
};
