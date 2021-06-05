import React from 'react';
import Input from './Input';

export default {
  title: 'components/Input',
  component: Input,
};

const Template = ({ ...args }) => <Input {...args} />;

export const Default = Template.bind({});

Default.args = {
  type: 'text',
  labelText: '역 이름',
};
