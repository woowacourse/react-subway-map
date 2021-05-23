import { Meta, Story } from '@storybook/react';
import LineAddModal from './LineAddModal';

export default {
  title: 'Components/LineManagement/LineAddModal',
  component: LineAddModal,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story = (args) => <LineAddModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
