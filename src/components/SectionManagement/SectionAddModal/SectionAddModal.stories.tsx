import { Meta, Story } from '@storybook/react';
import SectionAddModal, { SectionAddModalProps } from './SectionAddModal';

export default {
  title: 'Components/SectionManagement/SectionAddModal',
  component: SectionAddModal,
} as Meta;

const Template: Story<SectionAddModalProps> = (args) => {
  return <SectionAddModal {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  closeModal: () => {},
};
