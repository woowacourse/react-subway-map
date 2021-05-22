import React from 'react';
import SelectBox from './SelectBox';

export default {
  component: SelectBox,
  title: 'common/SelectBox',
};

const Template = (args) => (
  <SelectBox {...args}>
    <option value="선택1">선택1</option>
    <option value="선택2">선택2</option>
    <option value="선택3">선택3</option>
    <option value="선택4">선택4</option>
  </SelectBox>
);

export const Default = Template.bind({});
Default.args = {};
