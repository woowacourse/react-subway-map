import { Meta, Story } from '@storybook/react';
import StationManagementPage from './StationManagementPage';

export default {
  title: 'pages/StationManagement',
  component: StationManagementPage,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
} as Meta;

const Template: Story = (args) => {
  return <StationManagementPage {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
