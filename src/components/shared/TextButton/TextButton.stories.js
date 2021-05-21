import React from 'react';
import TextButton from './TextButton';
import { ButtonType } from 'types';

export default {
  title: 'components/TextButton',
  component: TextButton,
};

const Template = ({ ...args }) => <TextButton {...args} />;

export const Filled = Template.bind({});
export const Blank = Template.bind({});

Filled.args = {
  styleType: ButtonType.FILLED,
  text: '추가',
};

Blank.args = {
  styleType: ButtonType.BLANK,
  text: '취소',
};
