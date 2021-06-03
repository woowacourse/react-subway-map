import { Meta, Story } from '@storybook/react';
import LineAddModal, { LineAddModalProps } from './LineAddModal';
import { lineHandlers } from '../../../mocks/handler';

export default {
  title: 'Components/LineManagement/LineAddModal',
  component: LineAddModal,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<LineAddModalProps> = (args) => <LineAddModal {...args} />;

Template.parameters = {
  parameters: {
    msw: lineHandlers,
  },
};
export const Default = Template.bind({});

Default.args = {
  closeModal: () => {},
};
