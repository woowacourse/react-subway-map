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
  lines: [
    {
      id: 1,
      name: '신분당선',
      color: '#f87171',
      stations: [
        {
          id: 1,
          name: '강남역',
        },
        {
          id: 2,
          name: '광교역',
        },
      ],
      sections: [
        {
          upStation: {
            id: 1,
            name: '강남역',
          },
          downStation: {
            id: 2,
            name: '광교역',
          },
          distance: 10,
        },
      ],
    },
  ],
  stations: [
    {
      id: 1,
      name: '잠실',
    },
    {
      id: 2,
      name: '경찰병원',
    },
  ],
  selectTargetLine: () => console.log('select Line'),
  closeModal: () => console.log('close Modal'),
  getLine: () => console.log('get Line'),
};
