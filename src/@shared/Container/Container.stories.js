import React from 'react';
import Container from './Container';

export default {
  title: 'shared/Container',
  component: Container,
};

const Template = (args) => <Container {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div />,
};
