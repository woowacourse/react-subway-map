import React from 'react';
import LinesModal from './LInesModal';

export default {
  title: 'modal/LinesModal',
  component: LinesModal,
  argTypes: {},
};

const Template = (args) => <LinesModal {...args} />;
export const Default = Template.bind({});
Default.args = {
  lineName: '선택한 노선',
};
