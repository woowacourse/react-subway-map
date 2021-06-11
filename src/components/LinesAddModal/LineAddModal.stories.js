import React from 'react';
import LineAddModal from './LineAddModal';

export default {
  title: 'modal/LinesAddModal',
  component: LineAddModal,
  argTypes: {},
};

const Template = (args) => <LineAddModal {...args} />;
export const Default = Template.bind({});
Default.args = {
  lineName: '선택한 노선',
};
