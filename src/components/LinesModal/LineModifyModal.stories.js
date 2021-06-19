import React from 'react';
import PALETTE from '../../constants/palette';
import LineModifyModal from './LineModifyModal';

export default {
  title: 'modal/LineModifyModal',
  component: LineModifyModal,
  argTypes: {},
};

const Template = (args) => <LineModifyModal {...args} />;
export const Default = Template.bind({});
Default.args = {
  line: { id: 1, name: '밍키선', color: PALETTE.RED[400] },
};
