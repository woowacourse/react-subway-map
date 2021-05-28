import React from 'react';
import { DUMMY_LINES, DUMMY_STATIONS } from '../../constants/dummies';
import PALETTE from '../../constants/palette';
import SectionAddModal from './SectionAddModal';

export default {
  title: 'modal/SectionAddModal',
  component: SectionAddModal,
  argTypes: {},
};

const Template = (args) => <SectionAddModal {...args} />;
export const Default = Template.bind({});
Default.args = {
  line: {
    id: 1,
    name: '밍키선',
    color: PALETTE.RED[400],
    stations: DUMMY_STATIONS,
    sections: DUMMY_LINES.sections,
  },
};
