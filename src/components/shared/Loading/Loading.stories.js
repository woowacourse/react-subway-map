import React from 'react';
import Loading from './Loading';

export default {
  title: 'components/Loading',
  component: Loading,
};

const Template = ({ ...args }) => <Loading {...args} />;

export const Default = Template.bind({});

Default.args = {
  isLoading: true,
};
