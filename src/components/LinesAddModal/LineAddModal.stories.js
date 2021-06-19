import React from 'react';
import ModalProvider from '../@common/ModalProvider/ModalProvider';
import LineAddModal from './LineAddModal';

export default {
  title: 'modal/LineAddModalContent',
  component: LineAddModal,
  argTypes: {},
};

const Template = (args) => (
  <ModalProvider>
    <LineAddModal {...args} />
  </ModalProvider>
);
export const Default = Template.bind({});
Default.args = {
  lineName: '선택한 노선',
};
