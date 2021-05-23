import React from 'react';
import ListItem from './ListItem';

export default {
  title: 'units/ListItem',
  component: ListItem,
};

const Template = (args) => <ListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '강남역',
};
