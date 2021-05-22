import React from 'react';
import Stations from './Stations';

export default {
  title: 'pages/Stations',
  component: Stations,
  argTypes: {},
};

const Template = (args) => <Stations {...args} />;

export const Default = Template.bind({});
