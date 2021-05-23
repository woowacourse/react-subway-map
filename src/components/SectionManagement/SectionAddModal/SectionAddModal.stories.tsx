import { Meta, Story } from '@storybook/react';
import SectionAddModal from './SectionAddModal';

export default {
  title: 'Components/SectionManagement/SectionAddModal',
  component: SectionAddModal,
} as Meta;

const Template: Story = (args) => {
  return <SectionAddModal {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
