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
