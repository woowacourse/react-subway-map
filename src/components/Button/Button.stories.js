import React from 'react';

import Button from './Button';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus-solid.svg';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'text', 'link'],
    },
    shape: {
      options: ['default', 'circle'],
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
export const Circle = Template.bind({});

Default.args = {
  children: '확인',
  variant: 'primary',
  shape: 'default',
};

Circle.args = {
  children: <PlusIcon />,
  variant: 'primary',
  shape: 'circle',
};
