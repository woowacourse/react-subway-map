import React from 'react';
import { DUMMY_STATIONS } from '../../../constants/dummies';
import SectionSelectBox from './SectionSelectBox';

export default {
  title: 'shared/SectionSelectBox',
  component: SectionSelectBox,
  argTypes: {},
};

const Template = (args) => <SectionSelectBox {...args} />;
export const Default = Template.bind({});
Default.args = {
  upStations: DUMMY_STATIONS,
  downStations: DUMMY_STATIONS,
};
