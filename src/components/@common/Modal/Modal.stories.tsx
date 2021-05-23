import { Meta, Story } from '@storybook/react';
import Modal, { ModalProps } from './Modal';

export default {
  title: 'Components/common/Modal',
  component: Modal,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args}>모달</Modal>;

export const Small = Template.bind({});

Small.args = { size: 'small' };

export const Medium = Template.bind({});

Medium.args = { size: 'medium' };

export const Large = Template.bind({});

Large.args = { size: 'large' };
