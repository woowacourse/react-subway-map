import React from 'react';

import Select from './Select';

export default {
  title: 'Select',
  component: Select,
};

const Template = (args) => <Select {...args} />;

export const Default = Template.bind({});
export const NoOption = Template.bind({});

Default.args = {
  labelText: '크루 이름',
  placeholder: '크루 이름',
  children: (
    <>
      <option value="cheffe">체프</option>
      <option value="ditto">디토</option>
    </>
  ),
};

NoOption.args = {
  labelText: '크루 이름',
  placeholder: '크루 이름',
  children: <></>,
};
