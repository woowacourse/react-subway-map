import React from 'react';

import Input from './Input';
import { ReactComponent as EmailIcon } from '../../assets/icons/envelope-solid.svg';

export default {
  title: 'Input',
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
export const Icon = Template.bind({});
export const Label = Template.bind({});
export const Error = Template.bind({});

Default.args = {
  placeholder: '이메일을 입력해주세요',
};

Icon.args = {
  placeholder: '이메일을 입력해주세요',
  icon: <EmailIcon />,
};

Label.args = {
  labelText: '이메일',
  placeholder: '이메일을 입력해주세요',
  icon: <EmailIcon />,
};

Error.args = {
  placeholder: '이메일을 입력해주세요',
  icon: <EmailIcon />,
  value: 'puterism',
  errorMessage: '올바른 형식의 이메일이 아닙니다',
};
