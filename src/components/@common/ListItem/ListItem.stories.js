import React from 'react';
import ListItem from './ListItem';

export default {
  title: 'common/ListItem',
  component: ListItem,
  argTypes: {},
};

const DefaultTemplate = (args) => <ListItem {...args} />;

export const Default = DefaultTemplate.bind({});
Default.args = {
  children: '강남역',
  onDelete: () => console.log('delete!'),
  onModify: () => console.log('modify!'),
};

const ListTemplate = (args) => (
  <ul>
    <ListItem {...args} />
    <ListItem {...args} />
    <ListItem {...args} />
    <ListItem {...args} />
    <ListItem {...args} />
  </ul>
);

export const List = ListTemplate.bind({});
List.args = {
  children: '강남역',
};
