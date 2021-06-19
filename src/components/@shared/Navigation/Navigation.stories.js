import React from 'react';
import Navigation from './Navigation';
import { PAGE_INFO } from '../../../constants/appInfo';

export default {
  title: 'shared/Navigation',
  component: Navigation,
  argTypes: {},
};

const Template = (args) => <Navigation {...args} />;

export const Default = Template.bind({});
Default.args = {
  navInfoList: [PAGE_INFO.STATIONS, PAGE_INFO.LINES, PAGE_INFO.SECTIONS],
};
