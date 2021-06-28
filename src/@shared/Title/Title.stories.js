import React from 'react';
import Title from './Title';

export default {
  title: 'shared/Title',
  component: Title,
};

const Template = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: '테스트 타이틀 123',
};
