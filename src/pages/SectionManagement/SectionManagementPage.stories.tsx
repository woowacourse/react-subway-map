import { Meta, Story } from '@storybook/react';
import SectionManagementPage from './SectionManagementPage';

export default {
  title: 'Pages/SectionManagementPage',
  component: SectionManagementPage,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
} as Meta;

const Template: Story = (args) => {
  return <SectionManagementPage {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
