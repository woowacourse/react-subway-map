import { Meta, Story } from '@storybook/react';
import LineManagementPage from './LineManagementPage';

export default {
  title: 'pages/LineManagementPage',
  component: LineManagementPage,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
} as Meta;

const Template: Story = (args) => {
  return <LineManagementPage {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
