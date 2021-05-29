import { Story } from '@storybook/react';
import { createPortal } from 'react-dom';
import Modal, { ModalProps } from './Modal';

export default {
  title: 'molecule/Modal',
  component: Modal,
  argTypes: { children: { control: 'text' } },
};

const Portal = document.createElement('div');
Portal.setAttribute('id', 'modal');

document.querySelector('body')?.append(Portal);

const ModalPortal = ({ children }: ModalProps) => {
  const $modal = document.getElementById('modal');
  if ($modal) {
    return createPortal(children, $modal);
  }

  return <></>;
};

const Template: Story<ModalProps> = args => (
  <ModalPortal
    onClickClose={() => {
      console.log('닫기 버튼 클릭');
    }}
  >
    <Modal {...args} />
  </ModalPortal>
);

export const DefaultModal = Template.bind({});

DefaultModal.args = {
  children: '모달 컨텐츠',
};
