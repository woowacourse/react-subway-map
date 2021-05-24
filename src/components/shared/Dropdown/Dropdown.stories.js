import React from 'react';
import Dropdown from './Dropdown';

export default {
  title: 'components/Dropdown',
  component: Dropdown,
};

const Template = ({ ...args }) => <Dropdown {...args} />;

export const Default = Template.bind({});

Default.args = {
  labelText: '상행 종점',
  defaultOption: '상행 종점',
  options: ['잠실', '잠실새내', '종합운동장', '봉은사'],
  onSelect: () => console.log('selected'),
};
