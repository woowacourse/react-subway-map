import React from 'react';
import CloseButton from '../CloseButton/CloseButton';
import Modal from './Modal';

export default {
  title: 'components/Modal',
  component: Modal,
};

const Template = ({ ...args }) => <Modal {...args} />;

export const Default = Template.bind({});
export const NoTitle = Template.bind({});
export const NoClosebutton = Template.bind({});

Default.args = {
  isOpen: true,
  title: '노선 생성',
  closeButton: <CloseButton closeModal={() => console.log('close modal')} />,
  onClose: () => console.log('close modal'),
};

NoTitle.args = {
  isOpen: true,
  closeButton: <CloseButton closeModal={() => console.log('close modal')} />,
  onClose: () => console.log('close modal'),
};

NoClosebutton.args = {
  isOpen: true,
  title: '노선 생성',
  onClose: () => console.log('close modal'),
};
