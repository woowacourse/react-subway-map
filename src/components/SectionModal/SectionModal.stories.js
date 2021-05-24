import React from 'react';
import Modal from 'components/shared/Modal/Modal';
import SectionModal from './SectionModal';

export default {
  title: 'components/SectionModal',
  component: SectionModal,
};

const Template = ({ ...args }) => (
  <Modal isOpen={true} title="구간 모달" onClose={() => console.log('close modal')}>
    <SectionModal {...args} />
  </Modal>
);

export const Default = Template.bind({});

Default.args = {
  lineNames: ['1호선', '2호선', '3호선'],
  stations: ['사당', '방배', '서초'],
};
