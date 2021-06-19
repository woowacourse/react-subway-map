import React from 'react';
import Input from './Input';

export default {
  title: 'common/Input',
  component: Input,
  argTypes: {},
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  labelText: '하이하이',
  labelIcon: <span>🍀</span>,
};

export const LabelText = Template.bind({});
LabelText.args = {
  labelText: '하이하이',
};

export const LabelIcon = Template.bind({});
LabelIcon.args = {
  labelIcon: <span>🍀</span>,
};
