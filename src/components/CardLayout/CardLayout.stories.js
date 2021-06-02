import React from 'react';
import CardLayout from './CardLayout';

export default {
  title: 'components/CardLayout',
  component: CardLayout,
};

const Template = ({ ...args }) => <CardLayout {...args} />;

export const Default = Template.bind({});

Default.args = { title: '타이틀입니다.' };
