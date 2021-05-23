import { Meta, Story } from '@storybook/react';
import StationAddForm from './StationAddForm';

export default {
  title: 'Components/StationManageMent/StationAddForm',
  component: StationAddForm,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
} as Meta;

const Template: Story = (args) => {
  return <StationAddForm {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
