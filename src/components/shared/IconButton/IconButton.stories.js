import React from 'react';
import IconButton from './IconButton';
import trashbin from 'assets/trashbin.png';

export default {
  title: 'components/IconButton',
  component: IconButton,
};

const Template = ({ ...args }) => (
  <IconButton {...args}>
    <img src={trashbin} style={{ width: '20px' }} />
  </IconButton>
);

export const Delete = Template.bind({});

Delete.args = {};
