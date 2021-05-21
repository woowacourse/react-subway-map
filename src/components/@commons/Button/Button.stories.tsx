import React from 'react';
import Button, { Props } from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {},
};

const Template = (args: Props) => <Button {...args} />;
export const Default = Template.bind({});
