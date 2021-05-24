import React from 'react';
import IconButton from './IconButton';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';

export default {
  title: 'components/IconButton',
  component: IconButton,
};

const Template = ({ ...args }) => <IconButton {...args}></IconButton>;

export const Delete = Template.bind({});

Delete.args = {
  children: <img src={deleteIcon} style={{ width: '20px' }} />,
};

export const Edit = Template.bind({});

Edit.args = {
  children: <img src={editIcon} style={{ width: '20px' }} />,
};
