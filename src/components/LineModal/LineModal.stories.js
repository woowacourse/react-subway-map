import React from 'react';
import Modal from 'components/shared/Modal/Modal';
import LineModal from './LineModal';

export default {
  title: 'components/LineModal',
  component: LineModal,
};

const Template = ({ ...args }) => (
  <Modal isOpen={true} title="노선 모달" onClose={() => console.log('close modal')}>
    <LineModal {...args} />
  </Modal>
);

export const CreateLine = Template.bind({});

CreateLine.args = {
  stations: ['사당', '방배', '서초'],
};

export const EditLine = Template.bind({});

EditLine.args = {
  stations: ['사당', '방배', '서초'],
  selectedLine: { name: '2호선', color: '#f87171' },
};
