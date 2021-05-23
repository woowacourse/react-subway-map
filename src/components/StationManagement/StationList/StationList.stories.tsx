import { Meta, Story } from '@storybook/react';
import StationList from './StationList';

export default {
  title: 'Components/StationManageMent/StationList',
  component: StationList,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
} as Meta;

const Template: Story = (args) => {
  return <StationList {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
