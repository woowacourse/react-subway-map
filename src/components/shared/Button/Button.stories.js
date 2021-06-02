import React from 'react';
import Button from './Button';
import { ButtonType } from 'types';
import editIcon from 'assets/edit.png';

export default {
  title: 'components/Button',
  component: Button,
};

const Template = ({ ...args }) => <Button {...args} />;

export const Filled = Template.bind({});
export const Blank = Template.bind({});
export const Icon = Template.bind({});

Filled.args = {
  styleType: ButtonType.YELLOW,
  children: '추가',
};

Blank.args = {
  styleType: ButtonType.BLANK,
  children: '취소',
};

Icon.args = {
  styleType: ButtonType.TRANSPARENT,
  children: <img src={editIcon} alt="edit" style={{ width: '20px' }} />,
};
