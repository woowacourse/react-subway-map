import React from 'react';
import Sections from './Sections';

export default {
  title: 'pages/Sections',
  component: Sections,
  argTypes: {},
};

const Template = (args) => <Sections {...args} />;

export const Default = Template.bind({});
