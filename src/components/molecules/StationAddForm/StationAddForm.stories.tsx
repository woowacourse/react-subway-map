import { Story } from '@storybook/react';
import StationAddForm from './StationAddForm';

export default {
  title: 'molecule/StationAddForm',
  component: StationAddForm,
  argTypes: { children: { control: 'text' } },
};

const Template: Story = args => <StationAddForm {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
