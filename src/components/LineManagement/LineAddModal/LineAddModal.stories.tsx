import { Meta, Story } from '@storybook/react';
import LineAddModal, { LineAddModalProps } from './LineAddModal';

export default {
  title: 'Components/LineManagement/LineAddModal',
  component: LineAddModal,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<LineAddModalProps> = (args) => <LineAddModal {...args} />;

export const Default = Template.bind({});

Default.args = {
  closeModal: () => {},
};
