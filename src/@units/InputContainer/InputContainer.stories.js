import Input from '@shared/Input/Input';
import React from 'react';
import InputContainer from './InputContainer';

export default {
  title: 'units/InputContainer',
  component: InputContainer,
};

const Template = (args) => <InputContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Input placeholder="이메일을 입력해주세요" type="email" />
    </>
  ),
};
