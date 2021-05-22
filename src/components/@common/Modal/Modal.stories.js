import React from 'react';
import Modal from './Modal';

export default {
  component: Modal,
  title: 'common/Modal',
};

const Template = (args) => (
  <Modal {...args}>
    <div>하이</div>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {};
