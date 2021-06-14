import React from 'react';
import { Palette } from '../../constants/palette';
import LineMap from './LineMap';

export default {
  title: 'LineMap',
  component: LineMap,
  argTypes: {},
};

const Template = (args) => <LineMap {...args} />;
export const Default = Template.bind({});
Default.args = {
  line: {
    id: 1,
    name: '밍키선',
    color: Palette.RED_400,
    stations: [
      {
        key: '1',
        name: '강남역1',
      },
      {
        key: '2',
        name: '강남역2',
      },
    ],
  },
};
