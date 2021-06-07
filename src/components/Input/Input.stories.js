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

Default.args = {
  placeholder: '이메일을 입력해주세요',
};

Icon.args = {
  placeholder: '이메일을 입력해주세요',
  icon: <EmailIcon />,
};
