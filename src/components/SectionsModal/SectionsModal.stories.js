import React from 'react';
import SectionsModal from './SectionsModal';

export default {
  title: 'modal/SectionsModal',
  component: SectionsModal,
  argTypes: {},
};

const Template = (args) => <SectionsModal {...args} />;
export const Default = Template.bind({});
Default.args = {
  lineName: '선택한 노선',
};
