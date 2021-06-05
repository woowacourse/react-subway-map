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
  selectedColors: ['#fbbf24', '#818cf8'],
  closeModal: () => console.log('close Modal'),
  getLines: () => console.log('getLines'),
};

export const EditLine = Template.bind({});

EditLine.args = {
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
  selectedLine: {
    id: 1,
    name: '신분당선',
    color: '#f87171',
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
    sections: [
      {
        upStation: {
          id: 1,
          name: '잠실',
        },
        downStation: {
          id: 2,
          name: '경찰병원',
        },
        distance: 10,
      },
    ],
  },
  selectedColors: ['#fbbf24', '#818cf8'],
  closeModal: () => console.log('close Modal'),
  getLines: () => console.log('get Lines'),
};
