import React from 'react';
import Header from './Header';
import Navigation from '../Navigation/Navigation';
import { PAGE_INFO } from '../../../constants/appInfo';

export default {
  title: 'shared/Header',
  component: Header,
  argTypes: {},
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  logo: <div>😍</div>,
  title: 'RUNNINGMAP',
  children: (
    <Navigation
      navigatingPageInfoList={[PAGE_INFO.STATIONS, PAGE_INFO.LINES, PAGE_INFO.SECTIONS]}
    />
  ),
};
