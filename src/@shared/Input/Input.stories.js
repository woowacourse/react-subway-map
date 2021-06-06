import React from 'react';
import mailImg from 'assets/images/mail.png';
import Input from './Input';

export default {
  title: 'shared/Input',
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: '이메일을 입력해주세요',
  imgUrl: mailImg,
};

export const TitleInput = Template.bind({});
TitleInput.args = {
  title: '노선 이름',
  placeholder: '노선 이름',
};
