import React from 'react';
import SelectInput from './SelectInput';

export default {
  title: 'shared/SelectInput',
  component: SelectInput,
};

const Template = (args) => <SelectInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: '이메일을 입력해주세요',
  children: (
    <>
      <option>1</option>
      <option selected>2</option>
      <option>3</option>
    </>
  ),
};

export const TitleSelectInput = Template.bind({});
TitleSelectInput.args = {
  title: '노선 선택',
  children: (
    <>
      <option>1</option>
      <option selected>2</option>
      <option>3</option>
    </>
  ),
};
