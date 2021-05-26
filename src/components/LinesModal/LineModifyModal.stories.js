import React from 'react';
import LineModifyModal from './LineModifyModal';

export default {
  title: 'modal/LineModifyModal',
  component: LineModifyModal,
  argTypes: {},
};

const Template = (args) => <LineModifyModal {...args} />;
export const Default = Template.bind({});
Default.args = {
  lineId: 1,
};
