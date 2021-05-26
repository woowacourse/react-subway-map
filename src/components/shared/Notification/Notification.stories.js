import React from 'react';
import Notification from './Notification';

export default {
  title: 'components/Notification',
  component: Notification,
};

const Template = ({ ...args }) => <Notification {...args} />;

export const Valid = Template.bind({});

Valid.args = {
  message: '비밀번호가 서로 일치합니다.',
  isValid: true,
  isVisible: true,
};

export const Invalid = Template.bind({});

Invalid.args = {
  message: '올바른 역 이름을 입력해주세요.',
  isValid: false,
  isVisible: true,
};
