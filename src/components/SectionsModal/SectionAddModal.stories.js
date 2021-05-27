import React from 'react';
import SectionAddModal from './SectionAddModal';

export default {
  title: 'modal/SectionsModal',
  component: SectionAddModal,
  argTypes: {},
};

const Template = (args) => <SectionAddModal {...args} />;
export const Default = Template.bind({});
Default.args = {
  lineName: '선택한 노선',
};
