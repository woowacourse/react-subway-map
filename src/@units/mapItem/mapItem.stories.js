import React from 'react';
import MapItem from './mapItem';

export default {
  title: 'units/MapItem',
  component: MapItem,
};

const Template = (args) => <MapItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  items: [
    { id: 0, name: '강남' },
    { id: 1, name: '역삼' },
    { id: 2, name: '선릉' },
  ],
  color: 'bg-lime-300',
};
