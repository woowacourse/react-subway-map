import React from 'react';
import Modal from './Modal';

export default {
  title: 'components/Modal',
  component: Modal,
};

const Template = ({ ...args }) => <Modal {...args} />;

export const Default = Template.bind({});

Default.args = {
  isOpen: true,
  title: '노선 생성',
  onClose: () => console.log('close modal'),
};
